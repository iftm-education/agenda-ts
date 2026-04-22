import prisma from "../prisma/prismaClient";
import { createUsuarioSchema } from "./usuario.schema";
import { Request, Response } from "express";

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    
    try{
        const usuarios = await prisma.usuario.findMany();
        return res.status(200).json(usuarios);

    }catch(error:any){
        console.error("Erro ao buscar usuários:", error);
        return res.status(500).json({ error: "Erro ao buscar usuários" });
    }
}


export const create = async (req: Request, res: Response): Promise<Response> => {
    
    try {

        /*
        Aqui fazemos a validação do body.
        Se estiver inválido, o Zod lança erro automaticamente.
        */
        //const data = createUsuarioSchema.parse(req.body);    // O body já foi validado pelo middleware de validação, então podemos usá-lo diretamente. Veja a seguir.


        const data = req.body; 

        const novoUsuario = await prisma.usuario.create({
            data
        });
        return res.status(201).json(novoUsuario);

    } catch (error:any) {
        /*
        Retorno padrão de erro de validação
        */
        console.error("Erro ao criar usuário:", error);
        return res.status(400).json({ error: "Erro ao criar usuário" });
    }
};

export const update = async (req: Request, res: Response): Promise<Response> => {
    

    const { id } = req.params;

    const updatedUsuario = await prisma.usuario.update({
        where: { id: Number(id) },
        data: req.body
    });
    // Lógica para atualizar um usuário
    return res.status(200).json({ obj: updatedUsuario, message: "Usuário atualizado com sucesso" });
};
