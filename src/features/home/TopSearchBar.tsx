export default function TopSearchBar() {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 pt-safe px-4 pb-3 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
          >
            <circle cx="12" cy="12" r="8" />
            <path d="M12 8v8M8 12h8" />
          </svg>
        </div>
        <div>
          <h1 className="text-base font-semibold text-gray-900">
            우리사이 여기쯤
          </h1>
          <p className="text-xs text-gray-500">두 출발지의 중간 지점 찾기</p>
        </div>
      </div>
    </div>
  );
}
