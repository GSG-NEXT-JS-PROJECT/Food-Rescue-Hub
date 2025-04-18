export interface VerifyEmailRes {
  success: boolean;
  error: string | null;
}

export interface SearchParamsType {
  verifyToken?: string;
  id?: string;
}
