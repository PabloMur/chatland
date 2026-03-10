"use client";
import dynamic from "next/dynamic";

const CustomLayout = dynamic(() => import("./CustomLayout"), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <CustomLayout>{children}</CustomLayout>;
}
