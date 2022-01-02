
export interface login {
	login: string,
	password: string
};



export interface addUser {
	email: string,
	password: string,
	token: string,
	first_name: string
};

export interface editUser {
	email?: string,
	password?: string,
	token?: string,
	first_name?: string
};

export const addUser = {};