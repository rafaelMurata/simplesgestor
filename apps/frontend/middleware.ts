import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|auth|favicon.ico).*)"]
};

export default auth(async (req) => {
  const pathname = req.nextUrl.pathname;
  const session = req.auth;

  // Redirecionar usuários não autenticados
  if (!session?.user) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Verificar se o usuário já está na rota correta
  const prefix = session.user.planType === "free" ? "/f" : "/p";

  if (!pathname.startsWith(prefix)) {
    return NextResponse.redirect(new URL(`${prefix}/dashboard`, req.url));
  }

  return NextResponse.next();
});
