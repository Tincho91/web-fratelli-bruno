"use server";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";

export async function authenticate(_: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Debes completar tu correo y contrasena" };
  }

  try {
    await signIn("credentials", {
      redirectTo: "/admin",
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales invalidas" };
        default:
          return { error: "No pudimos iniciar sesion. Intenta de nuevo." };
      }
    }

    throw error;
  }

  redirect("/admin");
}