import { useState } from "react";

const useModal = () => {
    const [showModal, setShowModal] = useState(false);
    const toggle = () => {
      setShowModal(!showModal)
    };

  return { showModal, toggle }
};

export default useModal;
