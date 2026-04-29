import { userRepository } from "./usuario.repo";

export const userService = {
  getAll: async () => {
    try{
        return await userRepository.getAll();

    }catch(error){
        throw new Error("Erro ao busca lista de usuários");
    }
  },

  findById: async (id: number) => {

    try{
        const usuario = await userRepository.findById(id);

        if (!usuario) {
        throw new Error("Usuário não encontrado");
        }

        return usuario;
    }catch(error){
        throw new Error("Erro ao buscar usuário por ID");
    }
    
  },

  create: async (data: any) => {

    try{
         const usuarioExistente = await userRepository.findByEmail(data.email);

        if (usuarioExistente) {
        throw new Error("E-mail já cadastrado");
        }

    return await userRepository.create(data);

    }catch(error){
        throw new Error("Erro ao criar usuário.")
    }
   
  },

  update: async (id: number, data: any) => {
    const usuario = await userRepository.findById(id);

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    if (data.email) {
      const usuarioComEmail = await userRepository.findByEmail(data.email);

      if (usuarioComEmail && usuarioComEmail.id !== id) {
        throw new Error("E-mail já utilizado por outro usuário");
      }
    }

    return await userRepository.update(id, data);
  },

  delete: async (id: number) => {
    const usuario = await userRepository.findById(id);

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    return await userRepository.delete(id);
  },

  findCreatedToday: async () => {
    return await userRepository.findCreatedToday();
  }
};