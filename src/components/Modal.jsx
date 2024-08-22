import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";

function Modal({ onClickCloseButton, onClickMainButton, message }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-5/12 bg-white p-5 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="font-bold font-mono">Wordle</h1>
          <IoClose
            className="hover:text-red-600 hover:cursor-pointer"
            onClick={onClickCloseButton}
          />
        </div>
        <div className="mt-4">
          <p className="font-mono">{message}</p>
          <button
            onClick={onClickMainButton}
            className="mt-4 px-4 py-2 bg-slate-400 text-white font-mono rounded-lg text-sm hover:bg-slate-800 transition-colors ease-in duration-300"
          >
            RESTART
          </button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClickCloseButton: PropTypes.func.isRequired,
  onClickMainButton: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default Modal;
