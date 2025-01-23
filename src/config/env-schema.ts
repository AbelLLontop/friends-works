import * as Joi from 'joi';
export const envSchema = Joi.object({
    PORT: Joi.number().default(3000),
    SECRET_TOKEN_JWT: Joi.string().required()
})