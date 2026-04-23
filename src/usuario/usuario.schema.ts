import {z} from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

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
}).openapi({
  example: "1990-01-01",
  description: "Data de nascimento do usuário (formato: YYYY-MM-DD)"
});

export const usuarioResponseSchema = z
  .object({
    id: z.number().int().positive().openapi({
      example: 1,
      description: "Identificador do usuário",
    }),
    nome: z.string().min(3).openapi({
      example: "Maria da Silva",
      description: "Nome do usuário",
    }),
    email: z.email().openapi({
      example: "maria@email.com",
      description: "E-mail do usuário",
    }),
    apelido: z.string().nullable().openapi({
      example: "Mari",
      description: "Apelido do usuário",
    }),
  })
  .openapi("Usuario");

export const createUsuarioSchema = z.object({   
    nome: z.string().min(3, "O nome deve ter no mínimo três caracteres").openapi({
      example: "Maria da Silva",
    }),
    email: z.email("O email deve ser válido").openapi({
      example: "maria@email.com"}),
    senha: z.string().min(8, "A senha deve ter pelo menos 8 caracteres").openapi({
      example: "senhaSegura123"
    }),
    dataNascimento: dataNascimentoSchema,
    apelido: z.string().optional().openapi({
      example: "Mari",
      description: "Apelido do usuário (opcional)",
    }),
}).openapi("CreateUsuarioInput");

export const updateUsuarioSchema = z.object({
    nome: z.string().min(3, "O nome deve ter no mínimo três caracteres").optional().openapi({
      example: "Maria da Silva",
    }),
    email: z.email().optional().openapi({
      example: "maria@email.com"}),
    apelido : z.string().optional().openapi({
      example: "Mari",
      description: "Apelido do usuário (opcional)",
    }),
    senha : z.string().min(8).optional().openapi({
      example: "senhaSegura123"
    }),
    dataNascimento: dataNascimentoSchema.optional()
});

export const usuarioParamsSchema = z
  .object({
    id: z.coerce.number().int().positive().openapi({
      example: 1,
      description: "ID do usuário",
      param: {
        name: "id",
        in: "path",
      },
    }),
  })
  .openapi("UsuarioParams");
