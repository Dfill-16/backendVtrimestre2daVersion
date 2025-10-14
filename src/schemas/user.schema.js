const joi = require("joi");
const useMongo = true

const userSchemaSql = joi.object({
  id: joi.number().integer().positive(),  
  name: joi.string().min(2).max(50).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const userSchemaMongo = joi.object({
  _id: joi.string().hex().length(24).optional(),
  name: joi.string().min(2).max(50).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const createUserSchemaSql = joi.object({
    name: joi.string().min(2).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
})

const createUserSchemaMongo = joi.object({
    name: joi.string().min(2).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
})

const updateUserSchemaSql = joi.object({
    name: joi.string().min(2).max(50).optional(),
    email: joi.string().email().optional(),
    password: joi.string().min(6).optional(),
})

const updateUserSchemaMongo = joi.object({
    name: joi.string().min(2).max(50).optional(),
    email: joi.string().email().optional(),
    password: joi.string().min(6).optional(),
})

const getUserSchemaSql = joi.object({
    id: joi.number().integer().positive().required(),
})

const getUserSchemaMongo = joi.object({
    id: joi.string().hex().length(24).required(),
})

const loginUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
})

const userSchema = {
    create: useMongo ? createUserSchemaMongo : createUserSchemaSql,
    update: useMongo ? updateUserSchemaMongo : updateUserSchemaSql,
    get: useMongo ? getUserSchemaMongo : getUserSchemaSql,
    base: useMongo ? userSchemaMongo : userSchemaSql,
    login: loginUserSchema,
}

module.exports = userSchema;
