require('dotenv').config();
import express from "express";

const app = express();
const port = (process.env.PORT || 3005);

// Middelware and loaders
	// cors
	app.use(express.json());

// Listamos los modelos
	import users from './routers/users';

// Usamos los modelos
	app.use("/users", users);

	console.log(process.env.PORT);


app.listen(port, () => {
	console.log("loading, port: ", port);
} );

// export default app;