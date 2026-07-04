export type ApiSuccessResponse<T> = {
  message: string;
  data?: T;
};

export type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
    errors?: ValidationFieldError[];
  };
};

export type ValidationFieldError = {
  field: string;
  code: string;
  message: string;
  params?: Record<string, unknown>;
};
