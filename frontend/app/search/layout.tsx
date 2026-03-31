"use client";

import Container from "@/components/layout/Container";
import TopBar from "@/components/layout/TopBar";
import { usePathname } from "next/navigation";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Container>
      {children}
    </Container>
  );
}
