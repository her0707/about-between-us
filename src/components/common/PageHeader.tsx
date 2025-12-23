"use client";

import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
  onBack?: () => void;
}

export default function PageHeader({ title, onBack }: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className="shrink-0 flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-white pt-safe">
      <button onClick={handleBack} className="p-2 -ml-2 text-gray-600">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 className="text-base font-medium text-gray-900">{title}</h1>
    </div>
  );
}
