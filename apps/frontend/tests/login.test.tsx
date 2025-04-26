import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from '../app/auth/login/page';

describe("LoginPage", () => {
  it("should show email validation error", async () => {
    render(<LoginPage />);

    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByTestId("email-error")).toHaveTextContent("Email é obrigatório");
    });
  });

  it("should show password length error", async () => {
    render(<LoginPage />);

    await userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
    await userEvent.type(screen.getByLabelText(/senha/i), "123");
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByTestId("password-error")).toHaveTextContent(
        "Senha deve ter pelo menos 6 caracteres"
      );
    });
  });
});
