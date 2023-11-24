import React from "react";
import { atom, useAtom } from "jotai";

const modalAtom = atom<JSX.Element>(<></>);

interface ModalTemplateProps {
  content: JSX.Element;
  onClose: () => void;
}

function ModalTemplate({ content, onClose }: ModalTemplateProps) {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal_container" onClick={(e) => e.stopPropagation()}>
        {content}
      </div>
    </div>
  );
}

interface UseModalType {
  modal: JSX.Element;
  openModal: (RC: JSX.Element) => void;
  closeModal: () => void;
}

function useModal(): UseModalType {
  const [modal, setModal] = useAtom(modalAtom);
  const openModal = (RC: JSX.Element) => {
    setModal(<ModalTemplate content={RC} onClose={closeModal} />);
  };
  const closeModal = () => {
    setModal(<></>);
  };
  return { modal, openModal, closeModal };
}

export { useModal };
