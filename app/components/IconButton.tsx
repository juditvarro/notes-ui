'use client';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  submit?: boolean;
  alert?: boolean;
  disabled?: boolean;
}

const IconButton = ({
  onClick,
  icon,
  alert,
  disabled,
  submit,
}: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer focus:outline-none ${disabled ? 'text-theme-disabled' : alert ? 'text-theme-alert' : 'text-theme-primary'}`}
      disabled={disabled}
      type={submit ? 'submit' : 'button'}
    >
      {icon}
    </button>
  );
};

export default IconButton;
