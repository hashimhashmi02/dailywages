"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { createSession, deleteSession } from "./session";
import {
  SignupFormSchema,
  LoginFormSchema,
  FormState,
} from "./definitions";

// ─── Signup ─────────────────────────────────────────────────────────────────
export async function signup(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || "",
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fix the errors below.",
    };
  }

  const { name, email, phone, password, role } = validatedFields.data;

  // 2. Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      message: "An account with this email already exists. Please sign in.",
    };
  }

  // 3. Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // 4. Create user in database
  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone: phone || null,
      passwordHash,
      role,
    },
  });

  if (!user) {
    return {
      message: "An error occurred while creating your account. Please try again.",
    };
  }

  // 5. Create role-specific profile
  if (role === "CUSTOMER") {
    await prisma.customer.create({
      data: { userId: user.id },
    });
  }
  // Worker profiles are created during onboarding (requires category, etc.)

  // 6. Create session and redirect
  await createSession(user.id, role);

  const destination =
    role === "CUSTOMER" ? "/customer/dashboard" : "/worker/dashboard";
  redirect(destination);
}

// ─── Login ──────────────────────────────────────────────────────────────────
export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fix the errors below.",
    };
  }

  const { email, password, role } = validatedFields.data;

  // 2. Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.passwordHash) {
    return {
      message: "Invalid email or password.",
    };
  }

  // 3. Verify role matches
  if (user.role !== role) {
    return {
      message: `This account is registered as a ${user.role.toLowerCase()}. Please select the correct role.`,
    };
  }

  // 4. Verify password
  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    return {
      message: "Invalid email or password.",
    };
  }

  // 5. Create session and redirect
  await createSession(user.id, user.role);

  const destination =
    user.role === "CUSTOMER"
      ? "/customer/dashboard"
      : user.role === "WORKER"
        ? "/worker/dashboard"
        : "/admin/dashboard";
  redirect(destination);
}

// ─── Logout ─────────────────────────────────────────────────────────────────
export async function logout() {
  await deleteSession();
  redirect("/login");
}
