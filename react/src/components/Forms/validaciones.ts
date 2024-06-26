import { z } from "zod";
//validaciones para todos los formularios

//LOGIN
//VALIDACIONES PARA INICIAR SESION
export const loginSchema = z.object({
    name: z.string().min(1, "El usuario es requerido"),
    password: z.string().min(1, "La contraseña es requerida"),
  })

  //CATALOGOS
  //VALIDACIONES ANOMALIAS
  export const anomaliaSchema = z.object({
    nombre: z.string().min(1, "El Nombre es requerido"),
    descripcion: z.string(),
    estado:  z.string(),
  })
