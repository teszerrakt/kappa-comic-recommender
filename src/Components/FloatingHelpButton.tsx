import { useState } from "react";
import { HelpCircle } from "lucide-react";
import TutorialModal from "./TutorialModal";

const FloatingHelpButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (): void => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-kappa-dark-gray border-2 border-kappa-green rounded-full text-kappa-green hover:bg-kappa-green hover:text-kappa-black transition-all duration-300 shadow-lg hover:shadow-xl"
        aria-label="Open help tutorial"
      >
        <HelpCircle className="h-6 w-6" />
      </button>

      <TutorialModal
        isVisible={isModalOpen}
        onClose={handleCloseModal}
        forceShow={true}
      />
    </>
  );
};

export default FloatingHelpButton;
