"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUsuarioSchema = exports.createUsuarioSchema = void 0;
const zod_1 = require("zod");
const dataNascimentoSchema = zod_1.z.coerce.date({
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
exports.createUsuarioSchema = zod_1.z.object({
    nome: zod_1.z.string().min(3, "O nome deve ter no mínimo três caracteres"),
    email: zod_1.z.email("O email deve ser válido"),
    senha: zod_1.z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
    dataNascimento: dataNascimentoSchema,
    apelido: zod_1.z.string().optional()
});
exports.updateUsuarioSchema = zod_1.z.object({
    nome: zod_1.z.string().min(3, "O nome deve ter no mínimo três caracteres").optional(),
    email: zod_1.z.email().optional(),
    apelido: zod_1.z.string().optional(),
    senha: zod_1.z.string().min(8).optional(),
    dataNascimento: dataNascimentoSchema.optional()
});
