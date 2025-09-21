import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import Home from './home';
import OpticalIllusion from '../optical-illusion/optical-illusion';

function renderWithRouter(initialEntries: string[] = ['/']) {
  const router = createMemoryRouter(
    [
      { path: '/', element: <Home /> },
      { path: '/optical-illusion', element: <OpticalIllusion /> },
    ],
    { initialEntries }
  );
  return render(<RouterProvider router={router} />);
}

describe('Home route', () => {
  it('renders title and experiment link', () => {
    renderWithRouter(['/']);
    expect(screen.getByText('Xperimentz')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /optical illusion/i });
    expect(link).toHaveAttribute('href', '/optical-illusion');
  });
});
