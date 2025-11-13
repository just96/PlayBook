import { useEffect, useRef } from "react";

export default function Toast({ message, onClose }) {
  const toastRef = useRef(null);

  useEffect(() => {
    if (message) {
      toastRef.current?.scrollIntoView({ top: 0, behavior: "smooth" });

      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div
      ref={toastRef}
      className="alert alert-success shadow-lg text-sm p-2 flex items-center gap-2 mx-auto mt-4 w-max"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{message}</span>
      <span className="loading loading-spinner loading-md"></span>
    </div>
  );
}
