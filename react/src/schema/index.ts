import { z } from "zod";

//validaciones
export const loginSchema = z.object({
    name: z.string().min(1, "El usuario es requerido"),
    password: z.string().min(1, "La contraseña es requerida"),
  })
