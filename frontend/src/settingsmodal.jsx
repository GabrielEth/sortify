import PropTypes from "prop-types";

const SettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal content goes here */}
        <h2>Settings Modal</h2>
        <p>This is the settings modal content.</p>
        <button onClick={onClose}>Close Modal</button>
      </div>
    </div>
  );
};

SettingsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SettingsModal;
