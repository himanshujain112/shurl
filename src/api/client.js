import { Router } from "express";

const router = Router();

router.get("/shorten", (req, res) => {
	res.send("hello");
});

export default router