import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import AuthFrom from '../pages/auth/sections/AuthForm';
import { MemoryRouter } from 'react-router';

describe('Authorization form', () => {
  test('auth form must be in document', () => {
    render(
      <MemoryRouter>
        <AuthFrom />
      </MemoryRouter>,
    );

    expect(screen.getByRole('form')).toBeDefined();
  });
});
