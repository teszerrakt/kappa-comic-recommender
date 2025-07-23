import Modal from "./Modal";
import kappa from "../Assets/kappa.png";
import useStorage from "../Hooks/useStorage";
import { SESSION_STORAGE } from "../constant";

interface TutorialModalProps {
  isVisible: boolean;
  onClose: () => void;
}

interface FooterProps {
  onClose: () => void;
}

const Header: React.FC = () => (
  <>
    <h2 className="text-3xl font-bold text-center text-kappa-green">
      Welcome to Kappa
    </h2>
  </>
);

const Footer: React.FC<FooterProps> = ({ onClose }) => (
  <button
    onClick={onClose}
    className="w-full px-4 py-2 font-bold rounded-lg bg-kappa-green hover:brightness-90"
  >
    I Understand
  </button>
);

const TutorialModal: React.FC<TutorialModalProps> = ({ isVisible, onClose }) => {
  const [isModalShownOnce, setIsModalShownOnce] = useStorage<boolean>(
    SESSION_STORAGE.SHOW_TUTORIAL_MODAL,
    false
  );

  const handleClose = (): void => {
    setIsModalShownOnce(true);
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible && !isModalShownOnce}
      header={<Header />}
      footer={<Footer onClose={handleClose} />}
      onClose={handleClose}
    >
      <div className="flex flex-col justify-center my-4">
        <img
          className="self-center h-32 duration-300"
          src={kappa}
          alt="kappa"
        />
        <p className="px-2 mt-4 text-center text-kappa-gray">
          To get your comic recommendation, please rate at least{" "}
          <b className="text-kappa-green">five titles</b> and then you can click
          K-Means or DBSCAN buttons that will appear.
        </p>
      </div>
    </Modal>
  );
};

export default TutorialModal;
