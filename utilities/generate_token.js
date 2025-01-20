import jwt from "jsonwebtoken";

class TokenService {
    constructor(secret) {
        this.secret = secret;
    }

    generateToken(id) {
        return jwt.sign({ id }, this.secret, {
            expiresIn: "1d",
        });
    }
}
export default TokenService;