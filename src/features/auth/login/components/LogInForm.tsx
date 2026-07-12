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

      <button
        type="submit"
        disabled={isLoading}
        className="primary-btn w-full px-3 py-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
