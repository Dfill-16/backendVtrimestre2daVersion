function ValidationHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    //const { value, error } = schema.validate(data, { abortEarly: false });
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } //else {
    //req[property] = value;
    next();
    //}
  };
}

module.exports = ValidationHandler;
