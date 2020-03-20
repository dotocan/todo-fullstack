"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dbConfig_1 = require("./config/dbConfig");
const entities_1 = require("./models/entities");
const types_1 = require("./models/types");
typeorm_1.createConnection({
    type: "postgres",
    host: dbConfig_1.dbConfig.pgHost,
    port: +dbConfig_1.dbConfig.pgPort,
    username: dbConfig_1.dbConfig.pgUser,
    password: dbConfig_1.dbConfig.pgPassword,
    database: dbConfig_1.dbConfig.pgDatabase,
    entities: [entities_1.TodoItem],
    synchronize: true
})
    .then(async (connection) => {
    const app = express_1.default();
    app.use(cors_1.default());
    app.use(body_parser_1.default.json());
    const itemRepository = connection.getRepository(entities_1.TodoItem);
    /**
     * GET /items
     * Gets all items from the database
     */
    app.get("/items", async (req, res) => {
        try {
            const items = await itemRepository.find();
            res.status(200).send(items);
        }
        catch (error) {
            res.status(500).send(new types_1.TodoError("Error when fetching items", error));
        }
    });
    /**
     * GET /items/:id
     * Finds the item by id
     */
    app.get("/items/:id", async (req, res) => {
        const itemId = +req.params.id;
        try {
            const item = await itemRepository.findOneOrFail(itemId);
            res.status(200).send(item);
        }
        catch (error) {
            res.status(500).send(new types_1.TodoError(`Error fetching item with id ${itemId}`, error));
        }
    });
    /**
     * Creates a new item in db
     */
    app.post("/items", async (req, res) => {
        const { title, description, completed } = req.body;
        try {
            const itemToCreate = new entities_1.TodoItem();
            itemToCreate.title = title;
            itemToCreate.description = description;
            itemToCreate.completed = completed || false;
            const savedItem = await itemRepository.save(itemToCreate);
            res.status(201).send(savedItem);
        }
        catch (error) {
            res.status(500).send(new types_1.TodoError("Error when creating item", error));
        }
    });
    /**
     * PUT /items
     * Update existing item
     */
    app.put("/items", async (req, res) => {
        const { id, title, description, completed } = req.body;
        try {
            const itemToUpdate = await itemRepository.findOneOrFail(id);
            itemToUpdate.title = title;
            itemToUpdate.description = description;
            itemToUpdate.completed = completed;
            const updatedItem = await itemRepository.save(itemToUpdate);
            res.status(200).send(updatedItem);
        }
        catch (error) {
            res.status(500).send(new types_1.TodoError(`Error updating item with id ${id}`, error));
        }
    });
    /**
     * DELETE /items/:id
     * Delete existing item by id
     */
    app.delete("/items/:id", async (req, res) => {
        const itemId = +req.params.id;
        try {
            const itemToDelete = await itemRepository.findOneOrFail(itemId);
            const removeResult = await itemRepository.remove(itemToDelete);
            res.status(200).send({ ...removeResult, id: itemId });
        }
        catch (error) {
            res.status(500).send(new types_1.TodoError(`Error deleting item with id ${itemId}`, error));
        }
    });
    app.post("/items/batch-delete", async (req, res) => {
        const items = req.body;
        const removedItems = [];
        try {
            for (let i = 0; i < items.length; i++) {
                const itemToDelete = await itemRepository.findOneOrFail(items[i].id);
                await itemRepository.remove(itemToDelete);
                removedItems.push(items[i]);
            }
            res.status(200).send(removedItems);
        }
        catch (error) {
            res.status(500).send(new types_1.TodoError(`Error deleting multiple items`, error));
        }
    });
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log("App listening on port:", PORT);
    });
})
    .catch(error => console.log(error));
//# sourceMappingURL=server.js.map