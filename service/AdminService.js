import bcrypt from "bcrypt";
import AdminModel from "../models/users/Admin.js";
import tokenService from "../utilities/generate_token.js";
import BaseService from "./BaseService.js";
import AdminRepository from "../repository/AdminRepository.js";

class AdminService extends BaseService {
    constructor() {
        super(AdminModel);
        this.AdminRepository = new AdminRepository(AdminModel);
    }

    async createAdmin(data) {
        const { email, adminCode, password, firstName, role } = data;

        // Check if admin already exists
        const existingAdmin = await this.AdminRepository.find({ email });
        if (existingAdmin.length > 0) {
            throw new Error("Sorry, this admin already exists");
        }

        // Hash the password
        const hashedPass = await bcrypt.hash(password, 10);

        // Create new admin
        const newAdmin = await this.AdminRepository.create({
            email,
            adminCode,
            password: hashedPass,
            firstName,
            role,
        });

        if (!newAdmin) {
            throw new Error("Failed to create admin");
        }

        // Generate a token for the new admin
        const token = new tokenService(process.env.JWT_SECRET).generateToken(newAdmin._id);

        return { ...newAdmin.toObject(), token };
    }
}

export default AdminService;
