import { z } from "zod";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createUsuarioSchema, usuarioParamsSchema, usuarioResponseSchema, updateUsuarioSchema } from "../usuario/usuario.schema";

const registry = new OpenAPIRegistry();

export function registerUsuarioPaths(registry: OpenAPIRegistry) {

    const errorSchema = z.object({
        message: z.string().openapi({
            example: "Recurso não encontrado",
            description: "Mensagem de erro detalhada",
        }),
    }).openapi("ErrorResponse");

    registry.register("UsuarioParams", usuarioParamsSchema);
    registry.register("CreateUsuarioInput", createUsuarioSchema);
    registry.register("UpdateUsuarioInput", updateUsuarioSchema);
    registry.register("UsuarioResponse", usuarioResponseSchema);
    registry.register("ErrorResponse", errorSchema);

    registry.registerPath({
        method: "get",
        path: "/usuarios",
        tags: ["Usuários"],
        summary: "Listar usuários",
        description: "Retorna uma lista de usuários cadastrados",
        responses: {
            200: {
            description: "Lista de usuários",
            content: {
                "application/json": {
                    schema: z.array(usuarioResponseSchema),
                },
            },
            },
            500: {
            description: "Erro interno do servidor",
            content: {
                "application/json": {
                schema: errorSchema,
                },
                },
            },  
        },
    });

    registry.registerPath({
        method: "post",
        path: "/usuarios",
        tags: ["Usuários"],
        summary: "Criar um novo usuário",
        description: "Cria um novo usuário com os dados fornecidos",
        request: {
            body: {
                description: "Dados para criar um novo usuário",
                content: {
                    "application/json": {
                        schema: z.array(createUsuarioSchema),
                    },
                }
            },
        },
        responses: {
        201: {
            description: "Usuário criado com sucesso",
            content: {
            "application/json": {
                schema: usuarioResponseSchema,
            },
            },  
            },
            400: {
                description: "Requisição inválida",
                content: {
                "application/json": {
                    schema: errorSchema,
                    },
                },
            },
            500: {
                description: "Erro interno do servidor",
                content: {
                "application/json": {
                    schema: errorSchema,
                    },
                },
            },
        },
    });

    registry.registerPath({
        method: "put",
        path: "/usuarios/{id}",
        tags: ["Usuários"],
        summary: "Atualiza um usuário",
        description: "Atualiza os dados de um usuário existente",
        request: {
            params: usuarioParamsSchema,
            body: {
            description: "Dados para atualização do usuário",
            content: {
                "application/json": {
                    schema: updateUsuarioSchema,
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Usuário atualizado com sucesso",
                content: {
                    "application/json": {
                    schema: usuarioResponseSchema,
                    },
                },
            },
            404: {
                description: "Usuário não encontrado",
                content: {
                    "application/json": {
                        schema: errorSchema,
                    },            
                },
            },
            500: {
                description: "Erro interno do servidor",
                content: {
                    "application/json": {
                        schema: errorSchema,
                    },
                },
            },
        },
    });

    registry.registerPath({
        method: "delete",
        path: "/usuarios/{id}",
        tags: ["Usuários"],
        summary: "Remover um usuário",
        description: "Remove um usuário existente",
        request: {
            params: usuarioParamsSchema,
        },
        responses: {
            200: {
                description: "Usuário removido com sucesso",
            },
            404: {
                description: "Usuário não encontrado",
                content: {
                    "application/json": {
                    schema: errorSchema,
                },
            
            },
        },
    },
    });
}