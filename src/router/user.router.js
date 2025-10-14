const { Router } = require("express");
const UserService = require("../services/user.service");
const router = Router();
const userService = new UserService();
const userSchema = require("../schemas/user.schema");
const ValidationHandler = require("../middlewares/validator.handle");

router.get("/", ValidationHandler(userSchema.get), async (req, res) => {
  try {
    const users = await userService.get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", ValidationHandler(userSchema.create), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    const user = await userService.create(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    if (error.message === "User with this email already exists") {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", ValidationHandler(userSchema.login), async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    const user = await userService.login(email, password);
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    if (error.message === "Invalid credentials") {
      return res.status(401).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", ValidationHandler(userSchema.get, "params"), ValidationHandler(userSchema.update, "body"), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const id = req.params.id;
    const user = await userService.update(id, name, email, password);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    if (error.message === "Email already exists") {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", ValidationHandler(userSchema.get, "params"), async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await userService.getById(id);  
    const user = await userService.delete(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({"User eliminado": deleted});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", ValidationHandler(userSchema.get, "params"), async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userService.getById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
