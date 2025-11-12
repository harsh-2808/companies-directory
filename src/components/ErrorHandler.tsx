import { TEXTS } from "../constants/text";

interface ErrorHandlerProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorHandler({ message, onRetry }: ErrorHandlerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <p className="text-red-400 mb-3">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {TEXTS.RETRY}
        </button>
      )}
    </div>
  );
}
