import express from "express";

const app = express();

// Middelware and loaders
	// cors
	app.use(express.json());

// Listamos los modelos
	import users from './routers/users';

// Usamos los modelos
	app.use("/users", users);

	console.log(process.env.PORT);

export default app;