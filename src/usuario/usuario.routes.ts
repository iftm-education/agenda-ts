import { Router } from 'express';
import { validate } from '../utils/validate';
const router = Router();

import * as usuarioController from './usuario.controller';
import * as usuarioSchema from './usuario.schema';


/**
 * @openapi
 * /usuarios:
 *   get:
 */
router.get('/', usuarioController.getAll);

router.post('/', validate(usuarioSchema.createUsuarioSchema), usuarioController.create);

router.put('/:id', validate(usuarioSchema.updateUsuarioSchema), usuarioController.update);

router.delete('/:id', validate(usuarioSchema.usuarioParamsSchema, "params"), usuarioController.remove);


export default router;