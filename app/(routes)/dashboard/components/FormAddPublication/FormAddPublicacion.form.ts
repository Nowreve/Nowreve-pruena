import * as z from "zod"

export const formSchema = z.object({
  title: z.string().min(3, {
    message: "El título debe tener al menos 3 caracteres.",
  }).max(255, {
    message: "El título no puede exceder los 255 caracteres.",
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  maxCollaborators: z.number().int().positive({
    message: "El número de colaboradores debe ser un entero positivo.",
  }),
  rewardAmount: z.number().positive({
    message: "La recompensa debe ser un número positivo.",
  }).refine((val) => {
    const parts = val.toString().split('.');
    return parts.length === 1 || parts[1].length <= 2;
  }, {
    message: "La recompensa debe tener como máximo 2 decimales.",
  }),
  deadline: z.date({
    required_error: "Se requiere una fecha límite.",
  }),
  photo: z.string().min(1, {
    message: "Se requiere una foto.",
  }),
  isPublished: z.boolean().default(false),
})