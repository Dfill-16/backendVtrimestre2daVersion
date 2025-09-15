const joi = require("joi");
const useMongo = false

const postSchemaSql = joi.object({
  id: joi.number().integer().positive(),  
  title: joi.string().min(3).max(100).required(),
  content: joi.string().min(10).required(),
});

const postSchemaMongo = joi.object({
  _id: joi.string().hex().length(24).optional(),
  title: joi.string().min(3).max(100).required(),
  content: joi.string().min(10).required(),
  author: joi.string().length(50).required(),
});

const createPostSchemaSql = joi.object({
    title: joi.string().min(3).max(100).required(),
    content: joi.string().min(10).required(),
})

const createPostSchemaMongo = joi.object({
    title: joi.string().min(3).max(100).required(),
    content: joi.string().min(10).required(),
    author: joi.string().length(50).required(),
})

const updatePostSchemaSql = joi.object({
    title: joi.string().min(3).max(100).optional(),
    content: joi.string().min(10).optional(),
})

const updatePostSchemaMongo = joi.object({
    title: joi.string().min(3).max(100).optional(),
    content: joi.string().min(10).optional(),
    author: joi.string().length(50).required(),
})

const getPostSchemaSql = joi.object({
    id: joi.number().integer().positive().required(),
})

const getPostSchemaMongo = joi.object({
    id: joi.string().hex().length(24).required(),
})

const postSchema = {
    create: useMongo ? createPostSchemaMongo : createPostSchemaSql,
    update: useMongo ? updatePostSchemaMongo : updatePostSchemaSql,
    get: useMongo ? getPostSchemaMongo : getPostSchemaSql,
    base: useMongo ? postSchemaMongo : postSchemaSql,
}

module.exports = postSchema;
