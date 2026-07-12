"use client";

import { useTranslations } from "next-intl";
import { type SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";

import { useRouter } from "@/i18n/navigation";
import {
  getApiErrorMessage,
  getValidationFieldErrors,
} from "@/shared/api/errors";
import { type FieldErrors, getFirstFieldError } from "@/shared/api/validation";
import { formatValidationError } from "@/shared/api/validationI18n";

import { requestPasswordReset } from "../../reset-password/api";
import { useSession } from "../../session/model/SessionProvider";
import EmailField from "../../shared/components/EmailField";
import PasswordField from "../../shared/components/PasswordField";
import { type LogInPayload, logInUser } from "../api";

type LogInField = keyof LogInPayload;

export default function LogInForm() {
  const t = useTranslations("Auth.LogIn");
  const tValidation = useTranslations("Validation");

  const { refreshUser } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<LogInField>>({});

  const emailError = getFirstFieldError(fieldErrors, "email");
  const passwordError = getFirstFieldError(fieldErrors, "password");

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setFieldErrors({});

    try {
      await toast.promise(
        logInUser({
          email,
          password,
        }),
        {
          loading: t("submitting"),
          success: t("success"),
          error: (error) => getApiErrorMessage(error, t("fallbackMessage")),
        },
      );

      await refreshUser();

      router.replace("/");
    } catch (error) {
      const nextFieldErrors = getValidationFieldErrors<LogInField>(
        error,
        (validationError) =>
          formatValidationError(validationError, tValidation),
      );

      if (nextFieldErrors) {
        setFieldErrors(nextFieldErrors);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleForgotPassword() {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setFieldErrors((current) => ({
        ...current,
        email: [t("emailRequiredForPasswordReset")],
      }));

      return;
    }

    setEmail(trimmedEmail);
    setIsResettingPassword(true);
    setFieldErrors((current) => ({
      ...current,
      email: undefined,
    }));

    try {
      await toast.promise(
        requestPasswordReset({
          email: trimmedEmail,
        }),
        {
          loading: t("resetPasswordRequestSubmitting"),
          success: t("resetPasswordRequestSuccess"),
          error: (error) =>
            getApiErrorMessage(error, t("resetPasswordRequestFallbackMessage")),
        },
      );
    } catch (error) {
      const nextFieldErrors = getValidationFieldErrors<LogInField>(
        error,
        (validationError) =>
          formatValidationError(validationError, tValidation),
      );

      if (nextFieldErrors) {
        setFieldErrors((current) => ({
          ...current,
          ...nextFieldErrors,
        }));
      }
    } finally {
      setIsResettingPassword(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <EmailField
        value={email}
        label={t("emailLabel")}
        placeholder={t("emailPlaceholder")}
        error={emailError}
        onChange={(event) => {
          setEmail(event.target.value);
          setFieldErrors((current) => ({
            ...current,
            email: undefined,
          }));
        }}
      />

      <PasswordField
        value={password}
        label={t("passwordLabel")}
        hiddenPlaceholder={t("passwordPlaceholderHidden")}
        visiblePlaceholder={t("passwordPlaceholderVisible")}
        hint={t("passwordHint")}
        error={passwordError}
        autoComplete="current-password"
        onChange={(event) => {
          setPassword(event.target.value);
          setFieldErrors((current) => ({
            ...current,
            password: undefined,
          }));
        }}
      />

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleForgotPassword}
          disabled={isLoading || isResettingPassword}
          className="text-primary hover:text-primary-muted ml-2 text-center text-sm font-medium"
        >
          {isResettingPassword
            ? t("resetPasswordRequestSubmitting")
            : t("forgotPassword")}
        </button>
        <button
          type="submit"
          disabled={isLoading || isResettingPassword}
          className="primary-btn w-1/2 py-2"
        >
          {isLoading ? t("submitting") : t("submit")}
        </button>
      </div>
    </form>
  );
}
