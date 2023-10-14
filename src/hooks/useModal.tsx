import React, { useCallback, useState } from "react";

interface ModalTemplateProps {
  content: React.ReactNode;
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

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [children, setChildren] = useState<React.ReactNode>(null);

  const modalOpen = useCallback((children: React.ReactNode) => {
    setIsModalOpen(() => true);
    setChildren(() => children);
  }, []);

  const modalClose = useCallback(() => {
    setIsModalOpen(() => false);
  }, []);

  return {
    Modal: isModalOpen
      ? () => <ModalTemplate content={children} onClose={modalClose} />
      : () => null,
    modalOpen,
    modalClose,
    isModalOpen,
  };
};

export default useModal;
