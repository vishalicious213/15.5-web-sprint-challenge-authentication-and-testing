const request = require('supertest')
const server = require('./api/server')
const db = require('./database/dbConfig')

describe("GET users", () => {
	it('should GET all users', async () => {
		const res = await request(server).get('/api/auth/users')
		expect(res.statusCode).toBe(200)
		expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
	})
})

describe("login", () => {
	it('should log user in', async () => {
		const res = await request(server)
			.post("/api/auth/login")
			.send({ username: "vish", password: "password-1" });
		expect(res.statusCode).toBe(200);
		expect(res.type).toBe("application/json");
		expect(res.body.message).toBe("Welcome vish!");
	});
});