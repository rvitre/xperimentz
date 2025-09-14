import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MIBRoute from './motion-induced-blindness';

describe('Motion-Induced Blindness route', () => {
  it('renders heading and canvas', () => {
    render(<MIBRoute />);
    expect(
      screen.getByRole('heading', { name: /motion-induced blindness/i })
    ).toBeInTheDocument();
    // Canvas from component
    expect(
      screen.getByLabelText(/motion-induced blindness canvas/i)
    ).toBeInTheDocument();
  });
});

