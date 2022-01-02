import db from '../config/ddbb';
import {login, addUser, editUser} from '../DTO/users';
import {createHash} from 'crypto';

const login = async (data: login) => {

	// Check if the information is correct
		const resp = await db.from("users")
			.select(["ID", "email","token","first_name"])
			.where({ "email": data.login, "password": data.password });

	// Incorrect credentials
		if( resp.length !== 1 ){ return false; }
	
		const random = (+new Date()+"")+JSON.stringify(resp[0])+JSON.stringify(data);


	// Update the new token
		const new_token = createHash("sha1").update(random).digest("hex");
		await db('users').where('ID', resp[0].ID).update({'token':new_token});

	// Prepare the return
		const obj = {
			email: resp[0].email,
			token: new_token,
			first_name: resp[0].first_name
		};
	
		return obj;
}

const info_token = async (token : string) => {
	const resultados = await db.select(["email","token","first_name"]).from('users').where('token',token);
	if(resultados.length === 0){
		return {};
	}else{
		return resultados[0];
	}
}


const add = async (object : addUser) => {
	try {
		await db('users').insert(object);
	} catch (error) {
		return false;
	}

	return true;
}


const edit = async (ID : number, object : editUser) => {
	try {
		await db('users')
			.where('ID', ID)
			.update(object);
	} catch (error) {
		return false;
	}
	
	return true;
	
}


const del = async (ID : number) => {
	try {
		await db('users').where('ID', ID).delete();
	} catch (error) {
		return false;
	}
	return true;
}


const check_password = async (ID : number, hash : string) => {

	try {
		const res = await db.from('users').where('ID', ID).where('password', hash);
		if(res.length !== 1){
			return false;
		}
	} catch (error) {
		return false;
	}

	return true;

}


const change_password = async (ID : number, password : string) => {
	try {
		const res = await db('users').where('ID', ID).update({password:password});
	} catch (error) {
		return false;
	}

	return true;
}




export default {
	login,
	info_token,
	add,
	edit,
	del,
	check_password,
	change_password
};