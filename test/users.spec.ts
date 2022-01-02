import request from "supertest";
import app from "../src/app";
/**
 * @author Luis Peris
 * @description Example testing, if you have any question: luis.peris+github@kaira.es
 * @see supertest https://github.com/visionmedia/supertest#readme
 * @see jest https://jestjs.io/es-ES/docs/expect
 */

// Check Login
	test('Login', async () => {
		const test = await request(app)
			.post("/users/login")
			.send({
				login : 'luis@peris.com',
				password : '123456'
			});
		
		expect(test.body.status).toBe(true);
	});

// Check info
	test('Info', async () => {
		const test = await request(app)
			.get("/users/info")
			.set('token', "953c3eb6871822b94377f0b929d2fa49815bec42");
			
			expect(test.body.status).toBe(true);
	});

// Check Add
	test('ADD', async () => {
		const test = await request(app)
			.post("/users/add")
			.send({
				// To generate a random email
				'email' : "carlitos."+(+new Date())+"@gmail.com",
				'password' : "12312312",
				'first_name' : "Carlitos"
			})
			.set('token', "953c3eb6871822b94377f0b929d2fa49815bec42");
			
			expect(test.body.status).toBe(true);
	});


// Check Edit
	test('EDIT', async () => {
		const test = await request(app)
			.put("/users/edit")
			.send({
				// To generate a random email
				'email' : "carlitos."+(+new Date())+"@gmail.com"
			})
			.set('token', "953c3eb6871822b94377f0b929d2fa49815bec42");
			
			expect(test.body.status).toBe(true);
	});


// Check change password
	test('CHANGE PASSWORD', async () => {
		const test = await request(app)
			.put("/users/change_password")
			.send({
				// To generate a random email
				'old_password' : "123456",
				'new_password' : "123456"
			})
			.set('token', "953c3eb6871822b94377f0b929d2fa49815bec42");
			
			expect(test.body.status).toBe(true);
	});
