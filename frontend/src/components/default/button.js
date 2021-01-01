import { ReactComponent as CheckIcon } from "../../icons/x.svg";

export const IconBtn = ({ className = "", Icon, ...rest }) => {
  return (
    <button
      className={`icon-btn regular-soft flex justify-center align-center clickable ${className}`}
      {...rest}
    >
      <Icon className="icon colorable" />
    </button>
  );
};

export const Button = ({ className = "", block, title, children, ...rest }) => {
  return (
    <button
      className={`btn flex justify-center align-center regular-soft clickable font-4${
        block ? " block" : ""
      } ${className}`}
      {...rest}
    >
      <span className="mb-1 flex-1 colorable">{children || title}</span>
    </button>
  );
};

export const Checkbox = ({
  className = "",
  title,
  checked,
  onClick,
  ...rest
}) => {
  return (
    <div
      className={`checkbox-container flex align-center x-gap-1 ml-4 ${className}`}
    >
      <button
        type="button"
        className={`checkbox p-rel clickable${checked ? " checked" : ""}`}
        onClick={onClick}
        {...rest}
      >
        <CheckIcon className="checkbox-check colorable m-auto p-abs" />
      </button>
      <p className="font-1 colorable">{title}</p>
    </div>
  );
};
