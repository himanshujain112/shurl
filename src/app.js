import "dotenv/config";
import express, { Router } from "express";
import router from "./api/client.js";
import client from "./bots/discord/discord.js";

const PORT = process.env.PORT;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

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

client.login(DISCORD_TOKEN);

app.listen(PORT || 8000, () => {
	console.log("Server running on PORT 8000");
});
