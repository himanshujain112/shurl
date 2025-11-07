import { Client, Events, GatewayIntentBits } from "discord.js";

const client = new Client({ intents: GatewayIntentBits.Guilds });

client.once(Events.ClientReady, (readyClient) => {
	console.log("Ready! logged in as " + readyClient.user.tag);
});

export default client
