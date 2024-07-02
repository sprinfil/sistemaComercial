import { z } from "zod";

//VALIDACIONES CREAR USUARIO NUEVO
export const crearusuarionuevoSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, "El Nombre es requerido"),
    curp: z.string().min(1, "El curp es requerido"),
    rfc: z.string().min(1, "El rfc es requerido"),
    correo: z.string().min(1, "El correo electronico es requerido"),
  })
