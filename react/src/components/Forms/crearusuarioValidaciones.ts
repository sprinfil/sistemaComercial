import { z } from "zod";

//VALIDACIONES CREAR USUARIO NUEVO
export const crearusuarionuevoSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, "El Nombre es requerido"),
    curp: z.string().min(1, "El curp es requerido").max(18, "El curp no puede tener mas de 18 caracteres"),
    rfc: z.string().min(1, "El rfc es requerido").max(13, "El RFC no puede tener mas de 13 caracteres"),
    correo: z.string().min(1, "El correo electronico es requerido"),
  })
