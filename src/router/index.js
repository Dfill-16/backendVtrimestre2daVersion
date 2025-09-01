const { Router } = require("express");
const postsRouter = require("./posts.router");
const router = Router();

function setUpRoutes(app) {
    app.use("/api", router, (req,res) =>{
        return res.status(404).json({ message: "This is not the page you are looking for"});
    });
    router.use("/posts", postsRouter);

}

module.exports = setUpRoutes