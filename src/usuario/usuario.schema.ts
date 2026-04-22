import {z} from 'zod';

const dataNascimentoSchema = z.coerce.date({
  error: "Data inválida"
}).refine((date) => {
  const today = new Date();

  let age = today.getFullYear() - date.getFullYear();

  const monthDiff = today.getMonth() - date.getMonth();
  const dayDiff = today.getDate() - date.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age >= 18;
}, {
  message: "O usuário deve ter pelo menos 18 anos"
});

export const createUsuarioSchema = z.object({   
    nome: z.string().min(3, "O nome deve ter no mínimo três caracteres"),
    email: z.email("O email deve ser válido"),
    senha: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
    dataNascimento: dataNascimentoSchema,
    apelido: z.string().optional()
});

export const updateUsuarioSchema = z.object({
    nome: z.string().min(3, "O nome deve ter no mínimo três caracteres").optional(),
    email: z.email().optional(),
    apelido : z.string().optional(),
    senha : z.string().min(8).optional(),
    dataNascimento: dataNascimentoSchema.optional()
});
