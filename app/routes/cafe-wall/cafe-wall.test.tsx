import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OpticalIllusion from './cafe-wall';

describe('Optical Illusion route', () => {
  it('shows heading and cafe wall description', () => {
    render(<OpticalIllusion />);
    expect(screen.getByRole('heading', { name: /optical illusion/i })).toBeInTheDocument();
    expect(screen.getByText(/cafe wall illusion/i)).toBeInTheDocument();
  });
});
