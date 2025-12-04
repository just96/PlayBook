import { useEffect, useRef } from "react";

export default function Toast({ message, onClose, type = "success" }) {
  const toastRef = useRef(null);

  useEffect(() => {
    if (message) {
      toastRef.current?.scrollIntoView({ top: 0, behavior: "smooth" });

      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      ref={toastRef}
      className={`alert ${
        type === "success" ? "alert-success" : "alert-error"
      } shadow-lg text-sm p-2 flex items-center gap-2 mx-auto mt-4 w-max`}
    >
      <span className="text-bold text-xl">{message}</span>
    </div>
  );
}
