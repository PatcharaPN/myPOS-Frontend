import { Icon } from "@iconify/react/dist/iconify.js";

interface ActionButtonProp {
  icon: string;
  className: string;
  onClick: () => void;
}

const ActionButton = ({ icon, className, onClick }: ActionButtonProp) => {
  return (
    <button className={`button-action ${className}`} onClick={onClick}>
      <Icon width={20} icon={icon} />
    </button>
  );
};

export default ActionButton;
