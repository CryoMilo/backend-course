const { PrismaClient } = require("@prisma/client");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();
const PORT = 8383;

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});

app.get("/test", (req, res) => {
	try {
		res.send("<h1>Subscribe LC SIGN</h1>");
	} catch (error) {
		res.send(error);
	}
});

app.get("/api/users", async (req, res) => {
	try {
		const users = await prisma.user.findMany();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.get("/api/users/:id", async (req, res) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: Number(req.params.id),
			},
		});
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.post("/api/users", async (req, res) => {
	try {
		const newEntry = await prisma.user.create({
			data: {
				name: req.body.name,
				email: req.body.email,
			},
		});
		res.status(201).json({
			message: "New Entry Added",
			newEntry,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.put("/api/users/:id", async (req, res) => {
	try {
		const newEntry = await prisma.user.update({
			where: {
				id: Number(req.params.id),
			},
			data: {
				name: req.body.name,
				email: req.body.email,
			},
		});
		res.status(201).json({
			message: "Entry Updated",
			newEntry,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.delete("/api/users/:id", async (req, res) => {
	try {
		await prisma.user.delete({
			where: {
				id: Number(req.params.id),
			},
		});
		res.status(204).json({ message: "Delete Successful" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.listen(PORT, (req, res) =>
	console.log(`Whassup Hommie I'm tony at ${PORT}`)
);
