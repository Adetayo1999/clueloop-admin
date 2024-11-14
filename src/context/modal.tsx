import { createContext, useContext, useState, useEffect } from "react";
import CenterModal from "../components/modal";
import { useLocation } from "react-router-dom";

interface ContextOptions {
  setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

export const ModalContext = createContext<ContextOptions>({} as ContextOptions);

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setModalContent((prev) => {
      if (prev) return null;

      return prev;
    });
  }, [pathname]);

  return (
    <ModalContext.Provider value={{ setModalContent }}>
      {modalContent && <CenterModal>{modalContent}</CenterModal>}
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  // if (!context)
  //   throw new Error("Modal context can only be used within modal provider");
  return context;
};

export default ModalProvider;
