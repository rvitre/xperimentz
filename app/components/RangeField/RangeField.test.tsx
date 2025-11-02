import { useState } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RangeField } from './RangeField';

function RangeFieldExample() {
  const [value, setValue] = useState(10);
  return (
    <RangeField
      label="Rows"
      value={value}
      min={0}
      max={20}
      step={1}
      onChange={setValue}
    />
  );
}

describe('RangeField', () => {
  it('renders the provided label and current value', () => {
    render(<RangeFieldExample />);

    expect(screen.getByText('Rows')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('updates value when using keyboard interaction', async () => {
    const user = userEvent.setup();
    render(<RangeFieldExample />);

    const slider = screen.getByRole('slider', { name: /Rows/ });
    expect(slider).toHaveValue('10');

    await user.click(slider);
    await user.keyboard('[ArrowRight]');

    expect(slider).toHaveValue('11');
    expect(screen.getByText('11')).toBeInTheDocument();
  });
});
