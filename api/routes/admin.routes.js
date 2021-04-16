const { authJwt, verifySignUp } = require("../middlewares");
const controller = require("../controllers/admin.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/admin/user/",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted,
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        controller.createUser
    );

    app.post(
        "/api/admin/contract/",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        controller.createContract
    );

    app.delete("/api/admin/user/", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);

    app.get("/api/admin/users/", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllInfosUsers);
    app.get("/api/admin/contracts/", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllInfosContracts);
};