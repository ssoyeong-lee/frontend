import React, { createContext, useContext, useState } from "react";

interface ModalTemplateProps {
  content: React.ReactNode;
  onClose: () => void;
}

interface ModalContextType {
  modal: React.ReactNode | null;
  openModal: (RC: React.ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  modal: null,
  openModal: () => {},
  closeModal: () => {},
});

function ModalTemplate({ content, onClose }: ModalTemplateProps) {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal_container" onClick={(e) => e.stopPropagation()}>
        {content}
      </div>
    </div>
  );
}

function ModalImplement(): ModalContextType {
  const [modal, setModal] = useState<React.ReactNode>(<></>);
  const closeModal = () => {
    setModal(<></>);
  };
  const openModal = (RC: React.ReactNode) => {
    console.log("openModal");
    setModal(<ModalTemplate content={RC} onClose={closeModal} />);
  };
  return { modal, openModal, closeModal };
}

function ModalProvider({ children }: { children: JSX.Element }) {
  const modal = ModalImplement();

  return (
    <ModalContext.Provider value={modal}>
      {children}
      {modal.modal}
    </ModalContext.Provider>
  );
}

function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
}

export { ModalProvider, useModal };
