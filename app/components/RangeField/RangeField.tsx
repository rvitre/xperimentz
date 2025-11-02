import {
  labelRow,
  labelText,
  sliderRoot,
  sliderThumb,
  sliderTrack,
  sliderTrackHighlight,
  valueText,
} from "../../styles/primitives";
import {
  Label,
  Slider,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from "react-aria-components";

type RangeFieldProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
};

export function RangeField({ label, value, min, max, step, onChange }: RangeFieldProps) {
  const handleChange = (nextValue: number | number[]) => {
    if (Array.isArray(nextValue)) {
      onChange(nextValue[0]);
      return;
    }

    onChange(nextValue);
  };

  return (
    <Slider
      className={sliderRoot()}
      minValue={min}
      maxValue={max}
      step={step}
      value={value}
      onChange={handleChange}
    >
      <div className={labelRow()}>
        <Label className={labelText()}>{label}</Label>
        <SliderOutput className={valueText()}>
          {({ state }) => state.getThumbValueLabel(0)}
        </SliderOutput>
      </div>
      <SliderTrack className={sliderTrack()}>
        {({ state }) => (
          <>
            <div
              className={sliderTrackHighlight()}
              style={{ width: `${state.getThumbPercent(0) * 100}%` }}
            />
            <SliderThumb className={sliderThumb()} aria-label={label} />
          </>
        )}
      </SliderTrack>
    </Slider>
  );
}
