import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { ContactDTO, create, readOne, list, update, deleteOne } from "./models/contact";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/contact", async (req, res) => {
    try {
        const data: ContactDTO = {
            name: req.body.name,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
        };
        const contact = await create(data);
        res.json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

app.get("/contact", async (req, res) => {
    try {
        const filterLastName = req.query.lastName as string;
        const contactList = await list(filterLastName);
        res.json(contactList);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

app.get("/contact/:id", async (req, res) => {
    try {
        const id: number = parseInt(req.params.id);
        const contact = await readOne(id);
        res.json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

app.put("/contact/:id", async (req, res) => {
    try {
        const id: number = parseInt(req.params.id);
        const data: ContactDTO = {
            name: req.body.name,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
        };
        const contact = await update(id, data);
        res.json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

app.delete("/contact/:id", async (req, res) => {
    try {
        const id: number = parseInt(req.params.id);
        await deleteOne(id);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
