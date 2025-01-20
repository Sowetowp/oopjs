import BaseRoutes from "./BaseRoutes";
import AdminService from "../service/AdminService";
import { validateDto } from "../middlewares/validateDto";
import { AdminRequestDto } from "../models/dto/Admin/AdminRequestDto";
import asyncHandler from "express-async-handler";

class AdminRoutes extends BaseRoutes {
    constructor() {
        const adminService = new AdminService(); 
        super(adminService); 
        this.adminService = adminService; 
    }

    initializeRoutes() {
        // POST route for creating an admin
        this.router.post(
            "/", 
            validateDto(AdminRequestDto), // Middleware to validate request body
            asyncHandler(async (req, res) => {
                const adminData = req.body; // Extract data from request
                const newAdmin = await this.adminService.createAdmin(adminData); // Call service
                res.status(201).json({
                    message: "Admin created successfully",
                    data: newAdmin,
                });
            })
        );

        // GET route for fetching all admins (example route)
        this.router.get(
            "/", 
            asyncHandler(async (req, res) => {
                const admins = await this.adminService.UserRepository.find({}); // Call repository directly
                res.status(200).json({ data: admins });
            })
        );
    }
}

export default new AdminRoutes().getRouter();
