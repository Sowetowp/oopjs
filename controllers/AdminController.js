import asyncHandler from 'express-async-handler'
import AdminModel from '../models/users/Admin.js';
import tokenService from '../utilities/generate_token.js';
import BaseController from './BaseController.js';


class AdminController extends BaseController {
	constructor() {
		super(new AdminModel())
	}

	createAdmin = asyncHandler(async (req, res) => {
		const {
			email,
			adminCode,
			password,
			firstName,
			role
		} = req.body;

		const hashedPass = await this.hashMe(password, 10)

		const existingAdmin = await this.model.adminExists({ email });
		if (existingAdmin.length > 0) {
			throw new Error('Sorry, this admin already exists');
		}

		const newAdmin = await this.model.createAdmin({
			email,
			adminCode,
			password: hashedPass,
			firstName,
			role
		})

		if (newAdmin) {
			this.success(res, 201, 'Admin created successfully', { ...newAdmin.toObject(), token: new tokenService(process.env.JWT_SECRET).generateToken(newAdmin._id) })
		} else {
			this.failure(res, 500, 'Failed to create admin');
		}
	});
}

export default AdminController;