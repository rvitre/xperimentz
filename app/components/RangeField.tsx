import { labelRow, labelText, rangeInput, valueText } from "../styles/primitives";

type RangeFieldProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
};

export function RangeField({ label, value, min, max, step, onChange }: RangeFieldProps) {
  const id = label.toLowerCase().replace(/\s+/g, "-") + "-input";
  return (
    <div>
      <div className={labelRow()}>
        <label htmlFor={id} className={labelText()}>
          {label}
        </label>
        <span className={valueText()}>{value}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className={rangeInput()}
        aria-label={label}
      />
    </div>
  );
}
