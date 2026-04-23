import express from "express";
import swaggerUi from "swagger-ui-express";
import usuarioRoutes from "./usuario/usuario.routes";
import { openApiDocument } from "./utils/openapi";

const app = express();

app.use(express.json());

app.use("/usuarios", usuarioRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});