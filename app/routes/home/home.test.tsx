import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import Home from './home';
import CafeWall from '../cafe-wall/cafe-wall';

function renderWithRouter(initialEntries: string[] = ['/']) {
  const router = createMemoryRouter(
    [
      { path: '/', element: <Home /> },
      { path: '/cafe-wall', element: <CafeWall /> },
    ],
    { initialEntries }
  );
  return render(<RouterProvider router={router} />);
}

describe('Home route', () => {
  it('renders title and experiment link', () => {
    renderWithRouter(['/']);
    expect(screen.getByText('Xperimentz')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /Café wall/i });
    expect(link).toHaveAttribute('href', '/cafe-wall');
  });
});
