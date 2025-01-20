import { validate } from "class-validator";

export const validateDto = (DtoClass) => {
    return async (req, res, next) => {
        const dtoInstance = new DtoClass(req.body);

        const errors = await validate(dtoInstance);
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors.map(err => err.constraints) });
        }

        req.body = dtoInstance; 
        next();
    };
};
