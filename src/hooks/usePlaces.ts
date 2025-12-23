"use client";

import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { CategoryCode } from "@/types/candidate";

export function usePlaces(currentCategory: CategoryCode) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCategoryChange = useCallback(
    (newCategory: CategoryCode) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("category", newCategory);
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  return {
    category: currentCategory,
    setCategory: handleCategoryChange,
  };
}
