import {z} from 'zod';
import {createUsuarioSchema} from './usuario.schema';

export type CreateUsuarioDTO = z.infer<typeof createUsuarioSchema>;