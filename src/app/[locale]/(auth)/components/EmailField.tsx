import type { ChangeEventHandler } from "react";

type EmailFieldProps = Readonly<{
  value: string;
  label: string;
  placeholder: string;
  error?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}>;

export default function EmailField({
  value,
  label,
  placeholder,
  error,
  onChange,
}: EmailFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="email" className="inline-block text-sm font-medium">
        {label}
      </label>

      <input
        id="email"
        name="email"
        type="email"
        value={value}
        minLength={1}
        maxLength={255}
        required
        className="input-field"
        placeholder={placeholder}
        autoComplete="email"
        onChange={onChange}
      />

      {error && (
        <p id="email-error" className="text-danger text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
