# Frontend TODO

## 1. Current Priority

What’s working well:

- Thin route files in src/app delegate to feature components.
- Authentication is grouped coherently under src/features/auth.
- Shared API error handling, validation, and proxy logic are centralized.
- The backend URL and cookies are kept behind Next.js API routes, which is a good security and deployment boundary.
- Localization is isolated cleanly under src/i18n.
- TypeScript and ESLint currently pass.

The main things I would improve:

1. Auth and user responsibilities are slightly mixed. AuthProvider imports features/users/me/api. Conceptually, authentication/session state should own the “current user” query, or you could create something like entities/session /
   shared/auth.

2. The global AuthProvider performs /api/users/me on every page load. That is acceptable now, but later you may want server-side session initialization or a query/cache library to avoid duplicated requests and loading flicker.
3. Successful API responses are mostly type-cast rather than runtime-validated in src/shared/api/response.ts. Error responses are guarded, but success payloads are trusted. As the backend grows, add response guards or schemas.
4. The proxy in src/shared/api/proxy.ts assumes JSON responses and only forwards cookies. It may eventually need to preserve relevant headers, handle non-JSON responses, and log upstream failures instead of silently converting every
   proxy exception into the same 500 response.

5. The login and registration forms contain duplicated form UI and logic. A reusable password field and shared auth form primitives would reduce maintenance.
6. There are no tests or test script yet. The architecture is good, but API proxy tests, validation tests, and auth-flow tests would protect it as it expands.

Overall: keep this structure. I would not introduce a heavier architecture yet. The next valuable steps are clarifying the auth/session boundary, adding runtime API schemas, extracting duplicated auth form pieces, and adding tests.

7. main page
8. me section

## 2. Global App Structure

- Create a basic global layout with:

  - Header
  - Footer
  - Main content wrapper

- Add role-based navigation for:

  - Guest
  - User
  - Agent
  - Admin

- Add breadcrumbs for:

  - Estate details pages
  - Admin pages

- Add production error boundary.
- Add proper `not-found` handling.

## 3. Shared UI Components

Create reusable UI components:

- `Button`
- `Input`
- `Select`
- `Textarea`
- `Card`
- `Badge`
- `Spinner`
- `ConfirmDialog`
- Pagination component
- Skeleton loaders for:

  - Estate cards
  - Estate details page

## 4. Shared API Layer

- Create a shared API client with:

  - Base URL support
  - Credentials support
  - Typed request helper

- Add environment variables for frontend API URL.
- Create shared error handler for backend error response format.
- Add API response wrappers for:

  - `{ message, data }`
  - `{ error }`

- Add TypeScript types for:

  - Backend DTOs
  - Frontend view models

- Add unauthorized and forbidden handling with:

  - Redirect
  - Or friendly message

## 5. Forms and Validation

- Add form schemas with Zod for:

  - Auth forms
  - Estate filters
  - Profile forms
  - Contact form
  - Admin forms

- Implement validation for:

  - Login form
  - Register form
  - Profile edit form
  - Change password form
  - Contact agent form
  - Admin estate create form
  - Admin estate edit form

- Add toast notifications for:

  - Success cases
  - Error cases

- Add form dirty-state protection before leaving create/edit pages.

## 6. Static Pages

### Home Page

- Create static home page.
- Add hero section.
- Add basic estate search entry point.

## 7. Estate List

### Routes

- Create estates list page route:

```txt
/estates
```

### API

- Fetch public estate list from:

```txt
GET /api/estate
```

### UI

- Create estate card component displaying:

  - Image
  - Title
  - Price
  - City
  - Rooms
  - Area

- Render states:

  - Loading
  - Empty
  - Error

- Add image fallback for estates without images.
- Add responsive mobile-first layout.

### Filters

- Add basic estate filters:

  - City
  - Category
  - Price min
  - Price max

- Sync estate filters with URL search params.
- Add sorting if backend supports it:

  - Price
  - Date
  - Area

- Add mobile filter drawer.
- Add desktop filter sidebar.

## 8. Estate Details

### Routes

- Create estate details route:

```txt
/estates/[id]
```

### API

- Fetch estate details from:

```txt
GET /api/estate/:id
```

### UI

- Create estate details page layout with:

  - Gallery
  - Price
  - Address
  - Description
  - Properties
  - Agent block

- Add image gallery carousel.
- Add responsive mobile-first layout.
- Add proper 404 page for missing estate.

## 9. Map Features

- Add Leaflet interactive map for estate location display.
- Add map view for estate search results.
- Add marker popup with estate preview card.

## 10. Authentication

### Routes

- Create login page route:

```txt
/login
```

- Create register page route:

```txt
/register
```

### Login

- Implement login form with email and password validation.
- Send login request to:

```txt
POST /api/auth/login
```

### Registration

- Implement register form with email and password validation.
- Send register request to:

```txt
POST /api/auth/register
```

- Show neutral success message after registration because backend hides whether the user already exists.

### Logout

- Create logout button.
- Send logout request to:

```txt
POST /api/auth/logout
```

### Auth State

- Create auth state check using:

```txt
GET /api/users/me
```

- Add protected route behavior for pages that require authentication.
- Add middleware or server-side auth guard strategy for protected pages.

## 11. User Profile

### Routes

- Create user profile page route:

```txt
/profile
```

### API

- Display current user data from:

```txt
GET /api/users/me
```

- Add edit profile form using:

```txt
PATCH /api/users/me/profile
```

- Add change password form using:

```txt
PATCH /api/users/me/password
```

## 12. Saved Estates

- Add saved estate toggle button using:

```txt
POST /api/estate/saved/:estateId
```

- Show saved state on:

  - Estate cards
  - Estate details page

- Add optimistic UI for saved estate toggle.

## 13. Contact Agent Flow

- Create contact agent form on estate details page.
- Send contact request to:

```txt
POST /api/estate/:estateId/contact
```

- Add client-side rate-limit friendly UX for contact form submit button.

## 14. Agent Pages

### Agent Public Profile

- Create agent profile route:

```txt
/agents/[id]
```

- Fetch agent public description from:

```txt
GET /api/agents/:id
```

- Display:

  - Agent info
  - Related contact section

### Agent Dashboard

- Create agent dashboard route:

```txt
/agent/estates
```

- Fetch agent own estates from:

```txt
GET /api/agents/me/estate
```

- Add agent estate filters.
- Add pagination if backend response supports it.

## 15. Admin Area

### Admin Layout

- Create admin layout route group for `/admin` pages.

### Admin Estates

- Create admin estates page route:

```txt
/admin/estates
```

- Fetch admin estate list from:

```txt
GET /api/admin/estate
```

- Create admin estate create form using:

```txt
POST /api/admin/estate
```

- Create admin estate edit form using:

```txt
PUT /api/admin/estate/:estateId
```

- Add admin estate delete action using:

```txt
DELETE /api/admin/estate/:estateId
```

### Admin Users

- Create admin users page route:

```txt
/admin/users
```

- Fetch admin users list from:

```txt
GET /api/admin/users
```

- Create admin user details page using:

```txt
GET /api/admin/users/:userId
```

- Add admin user role change action using:

```txt
PATCH /api/admin/users/:userId/role
```

- Add admin user delete action using:

```txt
DELETE /api/admin/users/:userId
```

### Admin Agents

- Create admin agents page route:

```txt
/admin/agents
```

- Fetch admin agents list from:

```txt
GET /api/admin/agents
```

## 16. SEO and Metadata

- Add SEO metadata for estate list page.
- Add SEO metadata for estate details pages.
- Add OpenGraph metadata for estate details pages.

## 17. Performance and Rendering Strategy

- Add performance optimization for images using Next Image.
- Add caching and revalidation strategy for public estate pages.
- Use server components where data can be fetched safely without client interactivity.
- Use client components only where state, forms, events, or browser APIs are needed.

## 18. Testing

### End-to-End Tests

Add Playwright smoke tests for:

- Home page
- Estates list page
- Estate details page
- Login page
- Register page

### Component Tests

Add component tests for:

- `Button`
- `Input`
- `EstateCard`
- Filters
- Forms

### API Mocking

- Add API mocking strategy for frontend tests.

### Accessibility

Add accessibility checks for:

- Forms
- Buttons
- Dialogs
- Navigation

## 19. Final QA

- Add final responsive QA for:

  - 320px
  - 375px
  - 425px
  - 768px
  - 1024px
  - 1280px
  - 1536px

- Add final MVP checklist.
- Verify every backend endpoint has a corresponding frontend flow.
