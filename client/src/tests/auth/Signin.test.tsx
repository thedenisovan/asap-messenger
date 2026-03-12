import '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, expect, test, afterEach } from 'vitest';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import AuthFrom from '../../pages/auth/components/AuthForm';
import { MemoryRouter } from 'react-router';

afterEach(() => {
  cleanup();
});

describe('Authorization signin form', () => {
  //! TEST CASE 1
  test('auth form must be in document', () => {
    render(
      <MemoryRouter>
        <AuthFrom />
      </MemoryRouter>,
    );
    expect(screen.getByRole('form')).toBeDefined();
  });

  //! TEST CASE 2
  test('wrong signin inputs should render error components', async () => {
    render(
      <MemoryRouter>
        <AuthFrom />
      </MemoryRouter>,
    );

    expect(screen.getByText('Sign In')).toBeDefined();
    const emailInput = screen.getByRole('userEmail');

    // Set email input to wrong value
    fireEvent.change(emailInput, { target: { value: 'wrongEmail.com' } });
    fireEvent.click(screen.getByRole('auth-button'));

    expect(
      screen.findByText(
        'Password must be 6+ chars, with at least one uppercase, lowercase, number and symbol.',
      ),
    ).toBeDefined();

    expect(
      await screen.findByText('User with give email does not exist.'),
    ).toBeDefined();
  });
});
