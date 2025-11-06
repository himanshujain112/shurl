import "dotenv/config";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MongoDB URI not set");

export default async function connectdb() {
	console.log("Connecting to DB");

	const state = mongoose.connection.readyState;

	if (state === 1) {
		console.log("MongoDB connected! @state1");
		return mongoose;
	}
	if (state === 2) {
		// wait for ongoing connection to finish
		await new Promise((resolve, reject) => {
			const onOpen = () => {
				cleanup();
				resolve();
			};
			const onError = (err) => {
				cleanup();
				reject(err);
			};
			function cleanup() {
				mongoose.connection.off("open", onOpen);
				mongoose.connection.off("error", onError);
			}
			mongoose.connection.once("open", onOpen);
			mongoose.connection.once("error", onError);
		});
		console.log("MongoDB connected! @state2");

		return mongoose;
	}
	console.log("MongoDB connected! @state3");
	await mongoose.connect(MONGODB_URI);

	return mongoose;
}
