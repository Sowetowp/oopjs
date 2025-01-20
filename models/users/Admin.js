import mongoose from 'mongoose';
import BaseUser from '../base/BaseUsers.js';

class AdminModel {
	constructor() {
		const adminSchema = new mongoose.Schema({
			adminCode: { type: String, required: true },
		});

		this.AdminModel = BaseUser.discriminator("Admin", adminSchema);
	}

	async createAdmin(data) {
		return await this.AdminModel.create(data);
	}

	async adminExists(data) {
		return await this.AdminModel.find(data);
	}

}

export default AdminModel;