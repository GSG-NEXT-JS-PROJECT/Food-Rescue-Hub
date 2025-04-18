import { FC } from "react";
import VerifyEmail from "./VerifyEmail";
import { getServerOrigin } from "@/lib/getServerOrigin";
import {
  SearchParamsType,
  VerifyEmailRes,
} from "./VerifyEmail/verifyEmailTypes";

async function verifyEmail(
  verifyToken: string,
  id: string
): Promise<VerifyEmailRes> {
  try {
    const serverOrigin = getServerOrigin();
    const url = `${serverOrigin}/api/auth/verify-email?verifyToken=${verifyToken}&id=${id}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { success: res.ok, error: res.ok ? null : "Verification failed" };
  } catch {
    return { success: false, error: "Verification failed" };
  }
}

interface VerifyEmailPageProps {
  searchParams: Promise<SearchParamsType>;
}

const VerifyEmailPage: FC<VerifyEmailPageProps> = async ({ searchParams }) => {
  const params = await searchParams;
  const verifyToken = params.verifyToken;
  const id = params.id;
  if (!verifyToken || !id) {
    return (
      <VerifyEmail initialState={{ success: false, error: "Invalid URL" }} />
    );
  }

  const result = await verifyEmail(verifyToken, id);
  return <VerifyEmail initialState={result} />;
};

export default VerifyEmailPage;
