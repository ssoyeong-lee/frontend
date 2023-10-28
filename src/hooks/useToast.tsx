import { createContext, useContext, useEffect, useState } from "react";

interface ToastContextType {
  toast: React.ReactNode | null;
  openToast: (content: JSX.Element) => void;
  closeToast: () => void;
}

const ToastContext = createContext<ToastContextType>({
  toast: null,
  openToast: () => {},
  closeToast: () => {},
});

function ToastImplement() {
  const [toast, setToast] = useState<React.ReactNode>(<></>);
  const [isStartTimer, setIsStartTimer] = useState(false);

  const closeToast = () => {
    setToast(<></>);
    setIsStartTimer(false);
  };

  const openToast = (content: JSX.Element) => {
    setToast(
      <div className="toast" onClick={closeToast}>
        <div className="toast-container">{content}</div>
      </div>
    );
    setIsStartTimer(true);
  };

  const toastTime = 3;
  const [time, setTime] = useState(toastTime);
  useEffect(() => {
    if (isStartTimer == true) {
      const timer = setTimeout(() => {
        setTime((time) => time - 1);
      }, 1000);
      if (time == 0) {
        closeToast();
        clearTimeout(timer);
        setTime(toastTime);
      }
      return () => {
        clearTimeout(timer);
      };
    }
  }, [time, isStartTimer]);

  return { toast, openToast, closeToast };
}

function ToastProvider({ children }: { children: JSX.Element }) {
  const toast = ToastImplement();

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {toast.toast}
    </ToastContext.Provider>
  );
}

function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
}

export { ToastProvider, useToast };
