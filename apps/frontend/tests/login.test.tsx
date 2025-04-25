import React from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import LoginPage from '../app/auth/login/page';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn()
  })
}));

jest.mock('cookies-next', () => ({
  setCookie: jest.fn(),
}));

describe('LoginPage', () => {
  const mockedUseRouter = jest.mocked(useRouter);

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('deve renderizar o formulário de login', () => {
    render(<LoginPage />);
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('deve mostrar erro para email inválido', async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'email-invalido' }
    });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(
        screen.getByText((content) =>
          content.toLowerCase().includes('e-mail') && content.toLowerCase().includes('válido')
        )
      ).toBeInTheDocument();
    });
  });

  it('deve mostrar erro para senha curta', async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@valido.com' }
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: '123' }
    });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(
        screen.getByText((content) =>
          content.toLowerCase().includes('senha') && content.includes('caracter')
        )
      ).toBeInTheDocument();
    });
  });

  it('deve redirecionar após login bem-sucedido', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ token: 'mocked-token' })
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: 'senhavalida' }
    });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/auth/login'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
      );
      expect(setCookie).toHaveBeenCalled();
      expect(mockedUseRouter().push).toHaveBeenCalledWith('/f/dashboard');
    });
  });
});
