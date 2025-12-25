import "./popup.css";

export default function Popup({ message, type, onClose }) {
  return (
    <div className={`popup ${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>×</button>
    </div>
  );
}
