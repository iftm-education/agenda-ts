import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";


import { registerUsuarioPaths } from "../usuario/usuario.openapi";

const registry = new OpenAPIRegistry();

registerUsuarioPaths(registry);


const generator = new OpenApiGeneratorV3(registry.definitions);

export const openApiDocument = generator.generateDocument({
    openapi: "3.0.0",
    info: {
        title: "API de Agenda",
        version: "1.0.0",
        description: "API para  gerenciamento de agenda da contatos",
    },
    servers: [
        {   url: "http://localhost:3000/api",
            description: "Servidor local de desenvolvimento",
        },
    ],
});