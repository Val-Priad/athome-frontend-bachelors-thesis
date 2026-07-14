"use client";

import { useTranslations } from "next-intl";
import { type SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";

import {
  getApiErrorMessage,
  getValidationFieldErrors,
} from "@/shared/api/errors";
import { type FieldErrors, getFirstFieldError } from "@/shared/api/validation";
import { useValidationErrorFormatter } from "@/shared/api/validationI18n";

import EmailField from "../../components/EmailField";
import PasswordField from "../../components/PasswordField";
import {
  type RegisterPayload,
  registerUser,
  resendVerificationEmail,
} from "../api";

type RegisterField = keyof RegisterPayload;

export default function RegisterForm() {
  const t = useTranslations("Auth.Register");
  const formatValidationError = useValidationErrorFormatter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<RegisterField>>(
    {},
  );

  const emailError = getFirstFieldError(fieldErrors, "email");
  const passwordError = getFirstFieldError(fieldErrors, "password");

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
          error: (error) => getApiErrorMessage(error, t("fallbackMessage")),
        },
      );
    } catch (error) {
      const nextFieldErrors = getValidationFieldErrors<RegisterField>(
        error,
        formatValidationError,
      );

      if (nextFieldErrors) {
        setFieldErrors(nextFieldErrors);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendVerificationEmail() {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error(t("emailRequiredForResend"));
      return;
    }

    setEmail(trimmedEmail);
    setIsResending(true);
    setFieldErrors((current) => ({
      ...current,
      email: undefined,
    }));

    try {
      await toast.promise(
        resendVerificationEmail({
          email: trimmedEmail,
        }),
        {
          loading: t("resending"),
          success: t("resendSuccess"),
          error: (error) =>
            getApiErrorMessage(error, t("resendFallbackMessage")),
        },
      );
    } catch (error) {
      const nextFieldErrors = getValidationFieldErrors<RegisterField>(
        error,
        formatValidationError,
      );

      if (nextFieldErrors) {
        setFieldErrors((current) => ({
          ...current,
          ...nextFieldErrors,
        }));
      }
    } finally {
      setIsResending(false);
    }
  }

  return (
    <>
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
          hidePasswordLabel={t("hidePassword")}
          showPasswordLabel={t("showPassword")}
          error={passwordError}
          autoComplete="new-password"
          onChange={(event) => {
            setPassword(event.target.value);
            setFieldErrors((current) => ({
              ...current,
              password: undefined,
            }));
          }}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="primary-btn w-full px-3 py-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? t("submitting") : t("submit")}
        </button>
      </form>

      <div className="border-border mt-4 border-t pt-4 text-center">
        <p className="text-muted-foreground mb-3 text-sm">
          {t("resendDescription")}
        </p>

        <button
          type="button"
          onClick={handleResendVerificationEmail}
          disabled={isLoading || isResending}
          className="text-primary hover:text-primary-muted text-sm font-medium disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isResending ? t("resending") : t("resendButton")}
        </button>
      </div>
    </>
  );
}
