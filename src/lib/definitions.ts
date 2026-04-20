import * as z from "zod";

// ─── Session Payload ────────────────────────────────────────────────────────
export interface SessionPayload {
  userId: string;
  role: "CUSTOMER" | "WORKER" | "ADMIN";
  expiresAt: Date;
}

// ─── Form State ─────────────────────────────────────────────────────────────
export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        password?: string[];
        role?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;

// ─── Signup Schema ──────────────────────────────────────────────────────────
export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ error: "Please enter a valid email." }).trim(),
  phone: z
    .string()
    .min(10, { error: "Phone number must be at least 10 digits." })
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters." })
    .trim(),
  role: z.enum(["CUSTOMER", "WORKER"], {
    error: "Please select a valid role.",
  }),
});

// ─── Login Schema ───────────────────────────────────────────────────────────
export const LoginFormSchema = z.object({
  email: z.string().email({ error: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(1, { error: "Password is required." })
    .trim(),
  role: z.enum(["CUSTOMER", "WORKER", "ADMIN"], {
    error: "Please select a valid role.",
  }),
});
