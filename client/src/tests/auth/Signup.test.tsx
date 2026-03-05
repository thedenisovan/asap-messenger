import '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, test, expect, afterEach } from 'vitest';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import AuthFrom from '../../pages/auth/sections/AuthForm';
import { MemoryRouter } from 'react-router';

afterEach(() => {
  cleanup();
});

describe('Signup authorization form', () => {
  //! TEST CASE 1
  test('auth form must be in document', () => {
    render(
      <MemoryRouter>
        <AuthFrom isSignUpForm={true} />
      </MemoryRouter>,
    );
    expect(screen.getByRole('form')).toBeDefined();
  });

  //! TEST CASE 2
  test('wrong signup inputs must render error components', async () => {
    render(
      <MemoryRouter>
        <AuthFrom isSignUpForm={true} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Create account')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('auth-button'));

    expect(
      screen.findByText(
        'Password must be 6+ chars, with at least one uppercase, lowercase, number and symbol.',
      ),
    ).toBeDefined();

    expect(await screen.findByText('Username is required.')).toBeDefined();
    expect(await screen.findByText('Email is required.')).toBeDefined();
  });
});
