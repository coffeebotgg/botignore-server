import "./utils/processes";
import Server from "./apps/server";
import logger from "./utils/logger";

/**
 * NOTE: This file is only used during testing for simplicity.
 * run `npm dev:start-client` and `npm dev:start-server` to start the client and server separately.
 */
export default class Snowball {
	public async start() {
		await logger.init();

		Promise.all([new Server().start()]);
	}
}

new Snowball().start();
