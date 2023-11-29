import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";

const toastAtom = atom<JSX.Element>(<></>);

interface UseToastType {
  toast: JSX.Element | null;
  openToast: (content: JSX.Element) => void;
  closeToast: () => void;
}

function useToast(): UseToastType {
  const toastTime = 3000;
  const [toast, setToast] = useAtom(toastAtom);

  const openToast = (content: JSX.Element) => {
    setToast(
      <div className="toast" onClick={closeToast}>
        <div className="toast-container">{content}</div>
      </div>
    );
    setTimeout(closeToast, toastTime);
  };

  const closeToast = () => {
    setToast(<></>);
  };

  return { toast, openToast, closeToast };
}

export { useToast };
