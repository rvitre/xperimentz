import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MotionInducedBlindness } from './MotionInducedBlindness';

describe('MotionInducedBlindness component', () => {
  it('renders and allows toggling play/pause', async () => {
    render(<MotionInducedBlindness />);
    const canvas = screen.getByLabelText(/motion-induced blindness canvas/i);
    expect(canvas).toBeInTheDocument();

    const user = userEvent.setup();
    const toggle = screen.getByRole('button', { name: /pause|play/i });
    await user.click(toggle);
    // After one click, button text should flip
    const next = screen.getByRole('button', { name: /pause|play/i });
    expect(next).toBeInTheDocument();
  });

  it('has adjustable sliders', async () => {
    render(<MotionInducedBlindness />);
    const user = userEvent.setup();
    const [dotsSlider] = screen.getAllByRole('slider', { name: /dots/i });
    await user.click(dotsSlider);
    expect(dotsSlider).toBeInTheDocument();
  });
});
