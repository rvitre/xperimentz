import { useState } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckboxField } from './CheckboxField';

function CheckboxFieldExample() {
  const [checked, setChecked] = useState(false);
  return (
    <CheckboxField
      label="Invert Colors"
      isSelected={checked}
      onChange={setChecked}
    />
  );
}

describe('CheckboxField', () => {
  it('shows the provided label', () => {
    render(<CheckboxFieldExample />);

    expect(screen.getByText('Invert Colors')).toBeInTheDocument();
  });

  it('toggles the checkbox when clicked', async () => {
    const user = userEvent.setup();
    render(<CheckboxFieldExample />);

    const checkbox = screen.getByRole('checkbox', { name: 'Invert Colors' });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
