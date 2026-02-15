import { HelpCircle } from "lucide-react";
import { useState } from "react";
import TutorialModal from "./TutorialModal";
import { Button } from "./ui/button";

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
      <Button
        onClick={handleOpenModal}
        variant="kappaOutline"
        size="icon"
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full border-2 shadow-lg transition-all duration-200"
        aria-label="Open help tutorial"
      >
        <HelpCircle className="h-6 w-6" />
      </Button>

      <TutorialModal isVisible={isModalOpen} onClose={handleCloseModal} forceShow={true} />
    </>
  );
};

export default FloatingHelpButton;
