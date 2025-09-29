import { useState } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToggleButtonField } from './ToggleButtonField';

function ToggleButtonExample() {
  const [selected, setSelected] = useState(false);
  return (
    <ToggleButtonField
      selectedLabel="Hide Intersection Markers"
      unselectedLabel="Show Intersection Markers"
      isSelected={selected}
      onChange={setSelected}
    />
  );
}

describe('ToggleButtonField', () => {
  it('renders the unselected label by default', () => {
    render(<ToggleButtonExample />);

    expect(
      screen.getByRole('button', { name: 'Show Intersection Markers' })
    ).toBeInTheDocument();
  });

  it('toggles text and pressed state when clicked', async () => {
    const user = userEvent.setup();
    render(<ToggleButtonExample />);

    const button = screen.getByRole('button', { name: 'Show Intersection Markers' });
    expect(button).toHaveAttribute('aria-pressed', 'false');

    await user.click(button);

    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveTextContent('Hide Intersection Markers');
  });
});
