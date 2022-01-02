import {Response} from "express";

const missingData = (text : string = "", response : Response ) =>{
	return response.status(400).json({
		'status': false,
		'error' : 'missingData',
		'text' : text
	});
}


const invalidData = (text : string = "", response : Response ) =>{
	return response.status(400).json({
		'status': false,
		'error' : 'invalidData',
		'text' : text
	});
}

const unexpectedError = (text : string = "", response : Response ) =>{
	return response.status(506).json({
		'status': false,
		'error' : 'unexpectedError',
		'text' : text
	});
}



const internalError = (text : string = "", response : Response ) =>{
	return response.status(506).json({
		'status': false,
		'error' : 'internalError',
		'text' : text
	});
}

export  {
	missingData,
	internalError,
	invalidData,
	unexpectedError
}