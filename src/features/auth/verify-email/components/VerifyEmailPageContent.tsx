"use client";

import { Link } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import ApiError from "@/shared/api/apiError";
import { verifyEmail } from "../api";

type VerificationStatus = "loading" | "success" | "error";

export default function VerifyEmailPageContent() {
  const searchParams = useSearchParams();
  const hasSentRequest = useRef(false);

  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    if (hasSentRequest.current) {
      return;
    }

    hasSentRequest.current = true;

    async function handleVerifyEmail() {
      const token = searchParams.get("token");

      if (!token) {
        const errorMessage = "Verification token is missing.";

        setStatus("error");
        setMessage(errorMessage);
        toast.error(errorMessage);
        return;
      }

      const toastId = toast.loading("Verifying your email...");

      try {
        await verifyEmail(token);

        setStatus("success");
        setMessage("Email was verified successfully.");

        toast.success("Email was verified successfully.", {
          id: toastId,
        });
      } catch (error) {
        const errorMessage =
          error instanceof ApiError
            ? error.message
            : "Email verification failed.";

        setStatus("error");
        setMessage(errorMessage);

        toast.error(errorMessage, {
          id: toastId,
        });
      }
    }

    handleVerifyEmail();
  }, [searchParams]);

  const buttonHref = status === "success" ? "/login" : "/register";
  const buttonText = status === "success" ? "Go to log in" : "Go to register";

  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4">
      <section className="border-border bg-card w-full max-w-md rounded-xl border p-6 text-center shadow-lg">
        <h1 className="mb-3 text-2xl font-semibold">Email verification</h1>

        <p className="text-muted-foreground mb-6 text-sm">{message}</p>

        <Link
          href={buttonHref}
          className="primary-btn inline-flex w-full justify-center px-3 py-2"
        >
          {buttonText}
        </Link>
      </section>
    </main>
  );
}
