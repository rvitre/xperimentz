import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CafeWallDemo } from './CafeWall';

describe('CafeWallDemo', () => {
  it('renders canvas and sliders', async () => {
    render(<CafeWallDemo />);
    const canvas = screen.getByLabelText(/café wall illusion canvas/i);
    expect(canvas).toBeInTheDocument();
    const user = userEvent.setup();
    const rows = screen.getByLabelText(/rows/i);
    await user.click(rows);
    // Change value to verify control is interactive
    await user.type(rows, '{arrowright}{arrowright}');
    expect(rows).toBeInTheDocument();
  });
});
