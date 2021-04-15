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
        "/api/admin/user",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted,
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        controller.createUser
    );

    app.delete("/api/admin/user", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);

    app.get("/api/admin/info/users", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllInfosUsers);
};