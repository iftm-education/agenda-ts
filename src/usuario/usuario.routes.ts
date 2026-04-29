import { Router } from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
  getCreatedToday
} from "./usuario.controller";

import { validate } from "../utils/validate";
import {
  createUsuarioSchema,
  updateUsuarioSchema
} from "./usuario.schema";

const router = Router();

router.get("/", getAll);
router.get("/hoje", getCreatedToday);
router.get("/:id", getById);

router.post("/", validate(createUsuarioSchema), create);
router.put("/:id", validate(updateUsuarioSchema), update);
router.delete("/:id", remove);

export default router;