import {z} from 'zod';
import {createUsuarioSchema, updateUsuarioSchema, usuarioParamsSchema, usuarioResponseSchema} from './usuario.schema';

export type CreateUsuarioDTO = z.infer<typeof createUsuarioSchema>;
export type UpdateUsuarioDTO = z.infer<typeof updateUsuarioSchema>;
export type UsuarioParamsDTO = z.infer<typeof usuarioParamsSchema>;
export type UsuarioResponseDTO = z.infer<typeof usuarioResponseSchema>;