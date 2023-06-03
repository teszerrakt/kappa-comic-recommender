import Modal from "./Modal";
import kappa from "../kappa.png";

const Header = () => (
  <>
    <h2 className="text-3xl font-bold text-center text-kappa-green">
      Welcome to Kappa
    </h2>
  </>
);

const Footer = ({ onClose }) => (
  <button
    onClick={onClose}
    className="w-full px-4 py-2 font-bold rounded-lg bg-kappa-green hover:brightness-90"
  >
    I Understand
  </button>
);

const TutorialModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      isVisible={isVisible}
      header={<Header />}
      footer={<Footer onClose={onClose} />}
      onClose={onClose}
    >
      <div className="flex flex-col justify-center my-4">
        <img
          className="self-center h-32 duration-300"
          src={kappa}
          alt="kappa"
        />
        <p className="px-2 mt-4 text-center text-kappa-gray">
          To get your comic recommendation, please rate at least five titles and
          then you can click K-Means or DBSCAN buttons that will appear.
        </p>
      </div>
    </Modal>
  );
};

export default TutorialModal;
