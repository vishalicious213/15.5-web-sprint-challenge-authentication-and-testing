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

describe("fail login", () => {
	it('should not log user in (wrong password)', async () => {
		const res = await request(server)
			.post("/api/auth/login")
			.send({ username: "vish", password: "password-2" });
		expect(res.statusCode).toBe(401);
		expect(res.type).toBe("application/json");
		expect(res.body.message).toBe("You shall not pass!");
	});
});

describe("register new user", () => {
	it('should add a new user if user does not exist', async () => {
		const res = await request(server)
			.post("/api/auth/register")
			.send({ username: "ella", password: "password-2" });
		// if user does not exist
		expect(res.statusCode).toBe(201);
		expect(res.type).toBe("application/json");
		expect(res.body.username).toBe("ella");
	});
});

describe("fail to register new user", () => {
	it('should not add a new user if user exists', async () => {
		const res = await request(server)
			.post("/api/auth/register")
			.send({ username: "ella", password: "password-2" });
		// if user exists
		expect(res.statusCode).toBe(409);
		expect(res.type).toBe("application/json");
		expect(res.body.message).toBe("Username is already taken");
	});
});

// close out db so process doesn't hang
afterAll(async () => {
	await db.destroy()
})