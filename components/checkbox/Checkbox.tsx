import { ReactNode } from "react";
import "./Checkbox.css";

export interface CheckboxProps {
  disabled?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  id: string;
  children: ReactNode;
}

export default function Checkbox({
  id,
  disabled,
  defaultChecked,
  onChange,
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
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <label className="cursor-pointer" htmlFor={id}>
        {children}
      </label>
    </div>
  );
}
