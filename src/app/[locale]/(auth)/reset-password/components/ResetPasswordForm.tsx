"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { type SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";

import { Link, useRouter } from "@/i18n/navigation";
import {
  getApiErrorMessage,
  getValidationFieldErrors,
} from "@/shared/api/errors";
import { type FieldErrors, getFirstFieldError } from "@/shared/api/validation";
import { formatValidationError } from "@/shared/api/validationI18n";

import { resetPassword, type ResetPasswordPayload } from "../api";
import PasswordField from "../../components/PasswordField";

type ResetPasswordField = keyof ResetPasswordPayload;

export default function ResetPasswordForm() {
  const t = useTranslations("Auth.ResetPassword");
  const tValidation = useTranslations("Validation");

  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<ResetPasswordField>
  >({});

  const passwordError = getFirstFieldError(fieldErrors, "password");

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!token) {
      toast.error(t("missingToken"));
      return;
    }

    setIsLoading(true);
    setFieldErrors({});

    try {
      await toast.promise(
        resetPassword({
          token,
          password,
        }),
        {
          loading: t("submitting"),
          success: t("success"),
          error: (error) => getApiErrorMessage(error, t("fallbackMessage")),
        },
      );

      router.replace("/login");
    } catch (error) {
      const nextFieldErrors = getValidationFieldErrors<ResetPasswordField>(
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

  if (!token) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-danger text-sm">{t("missingToken")}</p>

        <Link
          href="/login"
          className="primary-btn inline-flex w-full justify-center px-3 py-2"
        >
          {t("requestNewLink")}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <PasswordField
        value={password}
        label={t("passwordLabel")}
        hiddenPlaceholder={t("passwordPlaceholderHidden")}
        visiblePlaceholder={t("passwordPlaceholderVisible")}
        hint={t("passwordHint")}
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
  );
}
