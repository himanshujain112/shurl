import "dotenv/config";
import express, { Router } from "express";
import router from "./api/client.js";

const PORT = process.env.PORT;

const app = express();

app.get("/", async (req, res) => {
	res.send({
		Name: "shurl",
		version: "1.0.0",
		github: "https://github.com/himanshujain112/shurl",
	});
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(PORT || 8000, () => {
	console.log("Server running on PORT 8000");
});
