import Spinner from "./Spinner";

interface LoadingOverlayProps {
  message?: string;
}

export default function LoadingOverlay({ message }: LoadingOverlayProps) {
  return (
    <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
      <div className="text-center">
        <Spinner />
        {message && <p className="mt-2 text-sm text-gray-500">{message}</p>}
      </div>
    </div>
  );
}
