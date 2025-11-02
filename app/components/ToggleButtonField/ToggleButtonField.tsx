import { ToggleButton } from "react-aria-components";
import { button } from "../../styles/primitives";

type ToggleButtonFieldProps = {
  selectedLabel: string;
  unselectedLabel: string;
  isSelected: boolean;
  onChange: (isSelected: boolean) => void;
};

export function ToggleButtonField({
  selectedLabel,
  unselectedLabel,
  isSelected,
  onChange,
}: ToggleButtonFieldProps) {
  return (
    <ToggleButton
      className={({ isSelected: pressed }) => button({ active: pressed })}
      isSelected={isSelected}
      onChange={onChange}
    >
      {({ isSelected: pressed }) => (pressed ? selectedLabel : unselectedLabel)}
    </ToggleButton>
  );
}
