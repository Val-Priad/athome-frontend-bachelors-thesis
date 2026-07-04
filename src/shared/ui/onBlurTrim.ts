import { FocusEvent } from "react";

export default function onBlurTrim(e: FocusEvent<HTMLInputElement>) {
  e.currentTarget.value = e.currentTarget.value.trim();
}
