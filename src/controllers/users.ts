import {Request, Response} from "express";
import {missingData, internalError, invalidData, unexpectedError} from '../helper/errorResponse';
import dbUser from '../services/users';
import {createHash} from 'crypto';
import {editUser} from '../DTO/users';

const login = async (req: Request, res: Response) =>{

	// Required params
		if(	!req.body?.login || !req.body?.password){
			return missingData("login,password are required", res);
		}


	// Required params
		if(	!process?.env?.SALT ){
			return internalError("missing salt", res);
		}

	// Add SALT
		const password = createHash('sha1').update(process.env.SALT+req.body.password).digest('hex');

	// Do request
		const ddbb = await dbUser.login({ login: req.body.login, password: password });

		if(ddbb !== false){
			return res.json({ status: true, data: ddbb });
		}else{
			return res.json({ status: false, text: 'incorrect login/password' });
		}


};

const info = async (req: any, res: Response)=>{
	const resultado = await dbUser.info_token(req.userdata.token);
	return res.send({ status:true, data: resultado });
};


const add = async (req: Request, res: Response)=>{

	const RB = req?.body;

	// Required params
		if(	!RB?.email || !RB?.password || !RB?.first_name){
			return missingData("email,first_name,password are required", res);
		}

	// Validate email
		const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
		if( emailRegexp.test(RB.email) === false ){
			return invalidData('email is invalid', res);
		}


	// Prepare the object
		const obj = {
			password: createHash('sha1').update(process.env.SALT+RB.password).digest('hex'),
			token: createHash('sha1').update(process.env.SALT+RB.password+"1011").digest('hex'),
			first_name: RB.first_name,
			email: RB.email
		};

	// Save the user
		const ret = await dbUser.add(obj);

		if(ret === true){
			return res.json({
				status: true,
				token: obj.token
			});
		}else{
			return unexpectedError('unexpectedError', res);
		}

};

const edit = async (req: Request | any, res: Response)=>{
	
	const ID : number = parseInt(req.userdata.ID);
	const RB = req?.body;
	const obj : editUser = {};

	if(RB?.email){
		const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
		if( emailRegexp.test(RB.email) === false ){
			return invalidData('email is invalid', res);
		}

		obj.email = RB.email;
	}

	if(RB?.first_name){ obj.first_name = RB.first_name; }

	const ret = await dbUser.edit(ID, obj);

	if(ret === true){
		return res.json({ status: true, token: obj.token });
	}else{
		return unexpectedError('unexpectedError', res);
	}
};


const del = async (req: Request | any, res: Response)=>{

	const ID : number = parseInt(req.userdata.ID);

	const ret = await dbUser.del(ID);

	if(ret === true){
		return res.json({ status: true });
	}else{
		return unexpectedError('unexpectedError', res);
	}

};


const change_password = async (req: Request | any, res: Response)=>{

	const ID : number = parseInt(req.userdata.ID);
	const RB = req?.body;

	// Required params
		if(	!RB?.old_password || !RB?.new_password ){
			return missingData("password,old_password are required", res);
		}


	// Check the old_password
		const ret = await dbUser.check_password(ID, createHash('sha1').update(process.env.SALT+RB.old_password).digest('hex'));

		if(ret === false){
			return invalidData('invalid old password', res);
		}

	// Change the password
		const ret2 = await dbUser.change_password(ID, createHash('sha1').update(process.env.SALT+RB.new_password).digest('hex'));

		if(ret2 === true){
			return res.json({ status: true });
		}else{
			return unexpectedError('unexpectedError', res);
		}

};
const recovery_password = (req: Request, res: Response)=>{
	/* Send another password */
};

const test = async (req: Request | any, res: Response)=>{
	/* Send another password */

};


export default {
	login,
	info,
	add,
	edit,
	del,
	change_password,
	recovery_password,
	test
};
