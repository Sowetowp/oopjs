import bcrypt from 'bcryptjs'

class BaseService {
    constructor(model) {
        this.model = model
    }

    async hashMe(data, len) {
        return await bcrypt.hash(data, len)
    }

    success(res, code, message, data) {
        res.status(code).json({
            message: message,
            status: 'ok',
            data: data
        });
    }

    failure(res, code, message) {
        res.status(code).json({ message: message });
    }
}

export default BaseService;