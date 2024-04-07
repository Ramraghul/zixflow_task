import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';


declare global {
    namespace Express {
        interface Request {
            validBody?: any;
        }
    }
}

const validation = (schema: Joi.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.message.replace(/"/g, '');
            return res.status(403).json({
                success: false,
                error: errorMessage
            });
        }
        req.validBody = value;
        next();
    };
};


export default validation;
