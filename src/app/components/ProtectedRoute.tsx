"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login"); // redirect if not logged in
    }
  }, [token, router]);

  if (!token) return null; // prevent flashing

  return <>{children}</>;
}
