import db from './ddbb';
import {Request, Response} from 'express';

const authtoken = async (req : any, resp : Response, next : any) => {
	// TIENE TOKEN?
		if( req.headers.token == undefined ){
			return resp.status(401).send({
				status: false,
				error: "No has mandado el token"
			});
		}

	// TOKEN ES CORRECTO?
		const token = req.headers.token;
		const result = await db.select("*").from("users").where("token", token);

		if(result.length == 0){
			return resp.status(401).send({
				status: false,
				error: "Token caducado"
			})
		}

	// GUARDAMOS DATOS
		req.userdata = result[0];
		next();
		return true;
}

export default authtoken;