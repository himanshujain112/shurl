import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
	{
		originalUrl: { type: String, required: true },
		shortUrl: { type: String, required: true },
		analytics: [{ referrer: String, timestamp: Date.now }],
		author: {
			provider: {
				type: String,
				enum: ["guest", "discord", "web", "telegram"],
				required: true,
				default: "guest",
			},
			user_id: { type: String, default: null },
		},
	},
	{ timestamps: true }
);

const URL = mongoose.model("URL", urlSchema);
export default URL;
