"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ContactAlertProps = {
  type: "success" | "error";
  message: string;
};

export default function ContactAlert({ type, message }: ContactAlertProps) {
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      router.replace("/#contact", { scroll: false });
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  if (!visible) {
    return null;
  }

  const styles =
    type === "success"
      ? "border-green-800 bg-green-950/50 text-green-300"
      : "border-red-800 bg-red-950/50 text-red-300";

  return (
    <div className={`mb-6 rounded-xl border p-4 ${styles}`}>{message}</div>
  );
}
