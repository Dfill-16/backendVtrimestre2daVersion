const { Router } = require("express");
const postsRouter = require("./posts.router");
const commentRouter = require("./comment.router");
const userRouter = require("./user.router");
const router = Router();

function setUpRoutes(app) {
    app.use("/api", router, (req,res) =>{
        return res.status(404).json({ message: "This is not the page you are looking for"});
    });
    router.use("/posts", postsRouter);
    router.use("/comments", commentRouter);
    router.use("/users", userRouter);
}

module.exports = setUpRoutes