import AdminController from "../controllers/AdminController.js";
import AdminValidation from "../Validations/adminValidation.js";
import ProtectMiddleware from "../middlewares/auth_handlers.js";
import BaseRoutes from "./BaseRoutes.js";

class AdminRoutes extends BaseRoutes {
    constructor() {
        super(new AdminController())
    }

    initializeRoutes() {
        this.router.route("/")
            .post(AdminValidation.validateSignup, this.controller.createAdmin)
            .get(new ProtectMiddleware(process.env.JWT_SECRET).adminProtect, (req, res)=>{
                res.send("hello")
            })
    }
}

export default new AdminRoutes().getRouter();