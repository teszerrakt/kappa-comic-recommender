import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import kappa from "../Assets/kappa.png";
import useStorage from "../Hooks/useStorage";
import { SESSION_STORAGE } from "../constant";

interface TutorialModalProps {
  isVisible: boolean;
  onClose: () => void;
  forceShow?: boolean;
}

const TutorialModal: React.FC<TutorialModalProps> = ({
  isVisible,
  onClose,
  forceShow = false,
}) => {
  const [isModalShownOnce, setIsModalShownOnce] = useStorage<boolean>(
    SESSION_STORAGE.SHOW_TUTORIAL_MODAL,
    false,
  );

  const handleClose = (): void => {
    if (!forceShow) {
      setIsModalShownOnce(true);
    }
    onClose();
  };

  const shouldShowModal = forceShow ? isVisible : isVisible && !isModalShownOnce;

  return (
    <Dialog open={shouldShowModal} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="bg-kappa-dark-gray border-kappa-green max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center text-kappa-green">
            Welcome to Kappa
          </DialogTitle>
          <DialogDescription className="sr-only">
            Tutorial on how to use the Kappa comic recommender
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col justify-center my-4">
          <img
            className="self-center h-32 duration-300"
            src={kappa}
            alt="kappa"
          />
          <p className="px-2 mt-4 text-center text-kappa-gray">
            To get your comic recommendation, please rate at least{" "}
            <b className="text-kappa-green">five titles</b> and then you can
            click K-Means or DBSCAN buttons that will appear.
          </p>
        </div>

        <DialogFooter>
          <Button
            onClick={handleClose}
            className="w-full bg-kappa-green hover:brightness-90 text-kappa-black font-bold"
          >
            I Understand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialModal;
