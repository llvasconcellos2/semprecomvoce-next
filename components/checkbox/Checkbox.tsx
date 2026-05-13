import { ReactNode } from "react";
import "./Checkbox.css";

export interface CheckboxProps {
  disabled?: boolean;
  defaultChecked?: boolean;
  id: string;
  children: ReactNode;
}

export default function Checkbox({
  id,
  disabled,
  defaultChecked,
  children,
}: CheckboxProps) {
  return (
    <div className="checkbox-wrapper-1">
      <input
        id={id}
        className="substituted"
        type="checkbox"
        aria-hidden="true"
        disabled={disabled}
        defaultChecked={defaultChecked}
      />
      <label className="cursor-pointer" htmlFor={id}>
        {children}
      </label>
    </div>
  );
}
