import "./Popup.css";

export default function Popup({isOpen, text, onClose}) {
  return (
    <div className={`popup ${isOpen ? 'popup_active' : ''}`}>
      <button className="popup__close" onClick={onClose}></button>
      <p className="popup__text">{text}</p>
    </div>
  )
};
