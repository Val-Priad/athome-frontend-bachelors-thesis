"use client";

import { ChangeEvent, SyntheticEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useTranslations } from "next-intl";

import ApiError from "@/shared/api/apiError";
import {
  FieldErrors,
  getFirstFieldError,
  validationErrorsToFieldErrors,
} from "@/shared/api/validation";

import { RegisterPayload, registerUser } from "../api";
import { formatValidationError } from "@/shared/api/validationI18n";

type RegisterField = keyof RegisterPayload;

export default function RegisterForm() {
  const t = useTranslations("Auth.Register");
  const tValidation = useTranslations("Validation");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<RegisterField>>(
    {},
  );
  const [isHidden, setIsHidden] = useState(true);

  const emailError = getFirstFieldError(fieldErrors, "email");
  const passwordError = getFirstFieldError(fieldErrors, "password");

  function togglePasswordVisibility() {
    setIsHidden((prev) => !prev);
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setFieldErrors({});

    try {
      await toast.promise(
        registerUser({
          email,
          password,
        }),
        {
          loading: t("submitting"),
          success: t("success"),
          error: (error) => {
            if (error instanceof ApiError) {
              return error.message;
            }

            return t("fallbackError");
          },
        },
      );
    } catch (error) {
      if (error instanceof ApiError && error.isValidationError) {
        setFieldErrors(
          validationErrorsToFieldErrors<RegisterField>(
            error.validationErrors,
            (validationError) =>
              formatValidationError(validationError, tValidation),
          ),
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-2">
          <label htmlFor="email" className="inline-block text-sm font-medium">
            {t("emailLabel")}
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={email}
            minLength={1}
            maxLength={255}
            required
            className="input-field"
            placeholder={t("emailPlaceholder")}
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? "email-error" : undefined}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              setFieldErrors((current) => ({
                ...current,
                email: undefined,
              }));
            }}
            onBlur={(e) => setEmail(e.target.value.trim())}
          />

          {emailError && (
            <p id="email-error" className="text-danger text-sm">
              {emailError}
            </p>
          )}
        </div>

        <div className="mb-5 space-y-2">
          <label
            htmlFor="password"
            className="inline-block text-sm font-medium"
          >
            {t("passwordLabel")}
          </label>

          <div className="input-field flex items-center justify-between gap-2">
            <input
              id="password"
              name="password"
              type={isHidden ? "password" : "text"}
              value={password}
              minLength={8}
              maxLength={255}
              required
              placeholder={
                isHidden
                  ? t("passwordPlaceholderHidden")
                  : t("passwordPlaceholderVisible")
              }
              className="w-full bg-transparent outline-none"
              autoComplete="new-password"
              aria-invalid={Boolean(passwordError)}
              aria-describedby={
                passwordError ? "password-error" : "password-hint"
              }
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                setFieldErrors((current) => ({
                  ...current,
                  password: undefined,
                }));
              }}
              onBlur={(e) => setPassword(e.target.value.trim())}
            />

            <button
              type="button"
              onClick={togglePasswordVisibility}
              aria-label={isHidden ? t("showPassword") : t("hidePassword")}
              className="text-muted-foreground hover:text-foreground"
            >
              {isHidden ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>

          {passwordError && (
            <p id="password-error" className="text-danger text-sm">
              {passwordError}
            </p>
          )}

          <p id="password-hint" className="text-muted-foreground text-sm">
            {t("passwordHint")}
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="primary-btn w-full px-3 py-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? t("submitting") : t("submit")}
        </button>
      </form>
    </>
  );
}
