import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HermannGrid } from './HermannGrid';

describe('HermannGrid component', () => {
  it('renders canvas and sliders', async () => {
    render(<HermannGrid />);
    expect(screen.getByLabelText(/hermann grid canvas/i)).toBeInTheDocument();
    const user = userEvent.setup();
    const [rows] = screen.getAllByRole('slider', { name: /rows/i });
    await user.click(rows);
    expect(rows).toBeInTheDocument();
  });

  it('toggles intersection markers', async () => {
    render(<HermannGrid />);
    const user = userEvent.setup();
    const toggle = screen.getByRole('button', { name: /show intersection markers/i });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await user.click(toggle);
    // After toggling, label flips and aria-pressed is true
    const toggle2 = screen.getByRole('button', { name: /hide intersection markers/i });
    expect(toggle2).toHaveAttribute('aria-pressed', 'true');
  });
});
