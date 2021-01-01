import { forwardRef, useState } from "react";

export const Input = ({ className = "", prefix, Prefix, ...rest }) => {
  const [focus, setFocus] = useState(false);

  return (
    <div
      className={`input-container flex align-center in-regular-soft ${className}${
        focus ? " focus" : ""
      }`}
    >
      {Prefix && (
        <Prefix width="25px" height="25px" className="prefix colorable ml-2" />
      )}
      {prefix && (
        <span className="prefix font-6 px-1 mb-1 colorable">{prefix}</span>
      )}
      <input
        className="flex-1 font-6 p-2 h-100 w-100 colorable"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...rest}
      />
    </div>
  );
};

export const InputWithRef = forwardRef(
  ({ className = "", prefix, ...rest }, ref) => {
    const [focus, setFocus] = useState(false);
    return (
      <div
        className={`input-container flex align-center in-regular-soft ${className}${
          focus ? " focus" : ""
        }`}
      >
        {prefix && (
          <span className="prefix font-6 px-1 mb-1 colorable">{prefix}</span>
        )}
        <input
          className="flex-1 font-6 p-2 h-100 w-100 colorable"
          ref={ref}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          {...rest}
        />
      </div>
    );
  }
);
