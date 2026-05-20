import { userService } from "./usuario.services";
import { userRepository } from "./usuario.repo";

jest.mock("./usuario.repo", () => ({
    userRepository: {
        getAll: jest.fn(),
        findById: jest.fn(),
        findByEmail: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    },
}));

describe("userService", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("deve retornar a lista de usuários", async () => {
        const usuariosMock = [{
            nome: "Ariane Alves Souza",
            email: "ariane@email.com",
            senha: "12345678",
            dataNascimento: new Date("1990-01-01"),
            apelido: "Nane"
        }];

        (userRepository.getAll as jest.Mock).mockResolvedValue(usuariosMock);

        const result = await userService.getAll();

        expect(result).toEqual(usuariosMock);
        expect(userRepository.getAll).toHaveBeenCalledTimes(1);
    });

    it("deve criar um usuário quando o e-mail ainda não estiver cadastrado", async () => {
        
        const novoUsuario = {
            nome: "Joanildo da Silva",
            email: "joaonildo@email.com",
            senha: "12",
            dataNascimento: new Date("1995-05-10"),
            apelido: "João",
        };

        const usuarioCriado = {
            id: 1,
            ...novoUsuario,
        };

        (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);
        (userRepository.create as jest.Mock).mockResolvedValue(usuarioCriado);

        const resultado = await userService.create(novoUsuario);

        expect(resultado).toEqual(usuarioCriado);
        expect(userRepository.findByEmail).toHaveBeenCalledWith(novoUsuario.email);
        expect(userRepository.create).toHaveBeenCalledWith(novoUsuario);
    });

    it("não deve criar usuário quando o e-mail já estiver cadastrado", async () => {
        const usuario = {
            nome: "Joanildo da Silva",
            email: "joaonildo@email.com",
            senha: "12",
            dataNascimento: new Date("1995-05-10"),
            apelido: "João",
        };

        const usuarioExistente = {
        id: 1,
        ...usuario,
        };

        (userRepository.findByEmail as jest.Mock).mockResolvedValue(usuarioExistente);

        await expect(userService.create(usuario)).rejects.toThrow(
            "Erro ao criar usuário."
        );

        expect(userRepository.findByEmail).toHaveBeenCalledWith(usuario.email);
        expect(userRepository.create).not.toHaveBeenCalled();
    });

    it("deve remover usuário existente", async () => {
        const id = 1;

        const usuarioExistente = {
            id,
            nome: "Mariana",
            email: "mariana@email.com",
        };

        (userRepository.findById as jest.Mock).mockResolvedValue(usuarioExistente);
        (userRepository.delete as jest.Mock).mockResolvedValue(usuarioExistente);

        const resultado = await userService.delete(id);

        expect(resultado).toEqual(usuarioExistente);
        expect(userRepository.findById).toHaveBeenCalledWith(id);
        expect(userRepository.delete).toHaveBeenCalledWith(id);
    });

    it("não deve remover usuário inexistente", async () => {
        const id = 99;

        (userRepository.findById as jest.Mock).mockResolvedValue(null);

        await expect(userService.delete(id)).rejects.toThrow(
            "Usuário não encontrado"
        );

        expect(userRepository.delete).not.toHaveBeenCalled();
    });
});
