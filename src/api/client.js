import { Router } from "express";
import connectdb from "../db/db.js";
import URL from "../models/shortUrl.model.js";
import { nanoid } from "nanoid";

const router = Router();

router.post("/shorten", async (req, res) => {
	const data = req.body;

	// TODO: Need to do url parsing before saving
	try {
		await connectdb();
		const urlBody = await URL.create({
			originalUrl: data.originalUrl,
			shortUrl: nanoid(7),
			analytics: [],
			author: {
				provider: data.author?.provider ?? null,
				user_id: data.author?.user_id ?? null,
			},
		});

		res.status(201).send(urlBody);
	} catch (err) {
		res.status(400).send("Url shortening failed");
	}
});

router.get("/:shortId", async (req, res, next) => {
	const shortId = req.params.shortId;

	const referrer = req.get("Referer") || null;

	try {
		await connectdb();
		const updated = await URL.findOneAndUpdate(
			{ shortUrl: shortId },
			{
				$push: {
					analytics: {
						$each: [{ referrer, timestamp: new Date() }],
						$slice: -100, // keeping only 100 records max
					},
				},
			},
			{ new: true, projection: { originalUrl: 1 } }
		).lean();

		if (!updated) return res.status(404).send({ error: "Short url not found" });

		res.redirect(updated.originalUrl);
	} catch (err) {
		return next(err);
	}
});

router.get("/analytics/:shortId", async (req, res, next) => {
	const shortId = req.params.shortId;

	try {
		await connectdb();

		const doc = await URL.findOne({ shortUrl: shortId }).lean();
		if (!doc) return res.status(404).send({ error: "Short url not found" });

		const analytics = doc.analytics || [];
		const stats = {
			totalClicks: analytics.length,
			lastClick: analytics[analytics.length - 1] || null,
		};

		res.status(200).send({
			shortUrl: doc.shortUrl,
			createdAt: doc.createdAt,
			analytics,
			stats,
		});
	} catch (err) {
		return next(err);
	}
});

export default router;
