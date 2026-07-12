import { useState, type ChangeEventHandler } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

type PasswordFieldProps = Readonly<{
  value: string;
  label: string;
  hiddenPlaceholder: string;
  visiblePlaceholder: string;
  hint: string;
  error?: string;
  autoComplete: "current-password" | "new-password";
  onChange: ChangeEventHandler<HTMLInputElement>;
}>;

export default function PasswordField({
  value,
  label,
  hiddenPlaceholder,
  visiblePlaceholder,
  hint,
  error,
  autoComplete,
  onChange,
}: PasswordFieldProps) {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className="mb-5 space-y-2">
      <label htmlFor="password" className="inline-block text-sm font-medium">
        {label}
      </label>

      <div className="input-field flex items-center justify-between gap-2">
        <input
          id="password"
          name="password"
          type={isHidden ? "password" : "text"}
          value={value}
          minLength={8}
          maxLength={255}
          required
          placeholder={isHidden ? hiddenPlaceholder : visiblePlaceholder}
          className="w-full bg-transparent outline-none"
          autoComplete={autoComplete}
          onChange={onChange}
        />

        <button
          type="button"
          onClick={() => setIsHidden((current) => !current)}
          className="text-muted-foreground hover:text-foreground"
        >
          {isHidden ? <FaRegEye /> : <FaRegEyeSlash />}
        </button>
      </div>

      {error && (
        <p id="password-error" className="text-danger text-sm">
          {error}
        </p>
      )}

      <p id="password-hint" className="text-muted-foreground text-sm">
        {hint}
      </p>
    </div>
  );
}
