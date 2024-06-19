import app from './app.js';
import db from './db.js';


const startServer = async () => {
	const port = process.env.PORT || 4000;

	try {
		await db.connect();
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}`);
		});
	}
	catch (err) {
		console.error(err);
		process.exit(1);
	}
}
startServer();