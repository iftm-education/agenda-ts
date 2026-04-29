import { Request, Response } from "express";
import { userService } from "./usuario.services";

export const getAll = async (req: Request, res: Response): Promise<Response> => {
  try {
    const usuarios = await userService.getAll();
    return res.status(200).json(usuarios);
  } catch (error: any) {
    console.error("Erro ao buscar usuários:", error);
    return res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

export const getById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const usuario = await userService.findById(Number(id));

    return res.status(200).json(usuario);
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
};

export const create = async (req: Request, res: Response): Promise<Response> => {
  try {
    const novoUsuario = await userService.create(req.body);
    return res.status(201).json(novoUsuario);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const update = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const updatedUsuario = await userService.update(Number(id), req.body);

    return res.status(200).json({
      obj: updatedUsuario,
      message: "Usuário atualizado com sucesso"
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const remove = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    await userService.delete(Number(id));

    return res.status(200).json({
      message: "Usuário removido com sucesso"
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const getCreatedToday = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const usuarios = await userService.findCreatedToday();
    return res.status(200).json(usuarios);
  } catch (error: any) {
    return res.status(500).json({
      error: "Erro ao buscar usuários cadastrados hoje"
    });
  }
};