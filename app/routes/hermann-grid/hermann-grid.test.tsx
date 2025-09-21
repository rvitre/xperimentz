import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HermannGridRoute from './hermann-grid';

describe('Hermann Grid route', () => {
  it('renders heading and canvas', () => {
    render(<HermannGridRoute />);
    expect(screen.getByRole('heading', { name: /hermann grid/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/hermann grid canvas/i)).toBeInTheDocument();
  });
});
