const joi = require("joi");
const useMongo = true; // Alineado con el servicio que usa UseMongo = true

const commentSchemaSql = joi.object({
  id: joi.number().integer().positive(),
  postId: joi.number().integer().positive().required(),
  content: joi.string().min(1).required(),
});

const commentSchemaMongo = joi.object({
  _id: joi.string().hex().length(24).optional(),
  postId: joi.string().hex().length(24).required(),
  content: joi.string().min(1).required(),
  createdAt: joi.date().optional(),
  updatedAt: joi.date().optional(),
});

const createCommentSchemaSql = joi.object({
  postId: joi.number().integer().positive().required(),
  content: joi.string().min(1).required(),
});

const createCommentSchemaMongo = joi.object({
  postId: joi.string().hex().length(24).required(),
  content: joi.string().min(1).required(),
});

const updateCommentSchemaSql = joi.object({
  postId: joi.number().integer().positive().optional(),
  content: joi.string().min(1).optional(),
});

const updateCommentSchemaMongo = joi.object({
  postId: joi.string().hex().length(24).optional(),
  content: joi.string().min(1).optional(),
});

const getCommentSchemaSql = joi.object({
  id: joi.number().integer().positive().required(),
});

const getCommentSchemaMongo = joi.object({
  id: joi.string().hex().length(24).required(),
});

const commentSchema = {
  create: useMongo ? createCommentSchemaMongo : createCommentSchemaSql,
  update: useMongo ? updateCommentSchemaMongo : updateCommentSchemaSql,
  get: useMongo ? getCommentSchemaMongo : getCommentSchemaSql,
  base: useMongo ? commentSchemaMongo : commentSchemaSql,
};

module.exports = commentSchema;