import { Checkbox } from "react-aria-components";
import {
  checkboxControl,
  checkboxIcon,
  checkboxLabel,
} from "../../styles/primitives";

type CheckboxFieldProps = {
  label: string;
  isSelected: boolean;
  onChange: (isSelected: boolean) => void;
};

export function CheckboxField({ label, isSelected, onChange }: CheckboxFieldProps) {
  return (
    <Checkbox
      className={checkboxLabel()}
      isSelected={isSelected}
      onChange={onChange}
    >
      {({ isFocusVisible, isSelected: selected }) => (
        <>
          <span
            className={checkboxControl({
              focusVisible: isFocusVisible,
              selected,
            })}
            aria-hidden="true"
          >
            <svg
              aria-hidden="true"
              className={checkboxIcon({ selected })}
              viewBox="0 0 16 16"
            >
              <path
                d="M6.173 11.414 3.05 8.293l1.414-1.414 1.708 1.707 4.364-4.364 1.414 1.414z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span>{label}</span>
        </>
      )}
    </Checkbox>
  );
}
