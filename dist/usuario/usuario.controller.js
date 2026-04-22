"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.create = exports.getAll = void 0;
const prismaClient_1 = __importDefault(require("../prisma/prismaClient"));
const getAll = async (req, res) => {
    try {
        const usuarios = await prismaClient_1.default.usuario.findMany();
        return res.status(200).json(usuarios);
    }
    catch (error) {
        console.error("Erro ao buscar usuários:", error);
        return res.status(500).json({ error: "Erro ao buscar usuários" });
    }
};
exports.getAll = getAll;
const create = async (req, res) => {
    try {
        /*
        Aqui fazemos a validação do body.
        Se estiver inválido, o Zod lança erro automaticamente.
        */
        //const data = createUsuarioSchema.parse(req.body);    // O body já foi validado pelo middleware de validação, então podemos usá-lo diretamente. Veja a seguir.
        const data = req.body;
        const novoUsuario = await prismaClient_1.default.usuario.create({
            data
        });
        return res.status(201).json(novoUsuario);
    }
    catch (error) {
        /*
        Retorno padrão de erro de validação
        */
        console.error("Erro ao criar usuário:", error);
        return res.status(400).json({ error: "Erro ao criar usuário" });
    }
};
exports.create = create;
const update = async (req, res) => {
    const { id } = req.params;
    const updatedUsuario = await prismaClient_1.default.usuario.update({
        where: { id: Number(id) },
        data: req.body
    });
    // Lógica para atualizar um usuário
    return res.status(200).json({ obj: updatedUsuario, message: "Usuário atualizado com sucesso" });
};
exports.update = update;
