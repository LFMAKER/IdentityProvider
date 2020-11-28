const { Router } = require("express");

const { verifyClient } = require("./middleware/verifyClient");
const { verifyUser } = require("./middleware/verifyUser");

// Auth Controllers
const AuthClientController = require("./controllers/Auth/Client/AuthClientController");
const AuthUserController = require("./controllers/Auth/User/AuthUserController");

// Client controllers
const ClientController = require("./controllers/ClientControllers/ClientController");
const ClaimController = require("./controllers/ClientControllers/ClaimController");
const ManageAccessController = require("./controllers/ClientControllers/ManageAccessController");

// User controllers
const UserController = require("./controllers/UserControllers/UserController");
const PermissionsController = require("./controllers/UserControllers/PermissionsController");

const ConnectTokenController = require("./controllers/ConnectToken/ConnectTokenController");

const routes = Router();

// AUTH
// Realiza o login com credenciais de um client
routes.post("/client-auth", AuthClientController.store);
// Desloga um client do sistema
routes.post("/client-logout", verifyClient, AuthClientController.destroy);
// Realiza o login com credenciais de um user
routes.post("/user-auth", AuthUserController.store);
// Desloga um usuário do sistema
routes.post("/user-logout", verifyClient, AuthUserController.destroy);

// Client
// Cria o client
routes.post("/client-create", ClientController.store);
// Exibe informações do client logado
routes.get("/client-details", verifyClient, ClientController.show);

// Claim
// Cria uma nova claim no client logado
routes.post("/claim-create", verifyClient, ClaimController.store);

// Recupera todas claim de um client logado
routes.get("/claim", verifyClient, ClaimController.index);

// Recupera os detalhes de uma claim de um client
routes.get("/claim-details/:id", verifyClient, ClaimController.show);

// Manage Access
// Cria uma nova permissão de acesso no client logado para um usuário
routes.post(
  "/manage-access-create",
  verifyClient,
  ManageAccessController.store
);
// Recupera todas permissões cadastradas de um client logado
routes.get("/manage-access", verifyClient, ManageAccessController.index);

// USER
// Cria um novo usuário no client logado
routes.post("/user-create", verifyClient, UserController.store);

// Recupera todos usuarios de um client
routes.get("/user", verifyClient, UserController.index);

// Recupera os dados de um determinado usuario do client logado
routes.get("/user-details/:id", verifyClient, UserController.show);

// USER PERMISSIONS
// Recupera as claims de um usuário logado
routes.get("/user-claims", verifyUser, PermissionsController.index);
// Verifica se um usuario tem permissao para uma determinada claim
routes.get(
  "/user-has-permission/:id",
  verifyUser,
  PermissionsController.hasPermission
);

routes.post("/connect-token", ConnectTokenController.index);
routes.post("/auth-token", ConnectTokenController.isAuth);
module.exports = routes;
