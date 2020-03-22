import "reflect-metadata";
import { createConnection } from "typeorm";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { dbConfig } from "./config/dbConfig";
import { TodoItem } from "./models/entities";
import { TodoError } from "./models/types";

createConnection({
    type: "postgres",
    host: dbConfig.pgHost,
    port: +dbConfig.pgPort,
    username: dbConfig.pgUser,
    password: dbConfig.pgPassword,
    database: dbConfig.pgDatabase,
    entities: [TodoItem],
    synchronize: true
})
    .then(async (connection: any) => {
        const app = express();

        app.use(cors());
        app.use(bodyParser.json());

        const itemRepository = connection.getRepository(TodoItem);

        /**
         * GET /items
         * Gets all items from the database
         */
        app.get("/items", async (req: any, res: any) => {
            try {
                const items = await itemRepository.find();
                res.status(200).send(items);
            } catch (error) {
                res.status(500).send(
                    new TodoError("Error when fetching items", error)
                );
            }
        });

        /**
         * GET /items/:id
         * Finds the item by id
         */
        app.get("/items/:id", async (req: any, res: any) => {
            const itemId = +req.params.id;

            try {
                const item = await itemRepository.findOneOrFail(itemId);
                res.status(200).send(item);
            } catch (error) {
                res.status(500).send(
                    new TodoError(
                        `Error fetching item with id ${itemId}`,
                        error
                    )
                );
            }
        });

        /**
         * Creates a new item in db
         */
        app.post("/items", async (req: any, res: any) => {
            const { title, description, completed } = req.body;

            try {
                const itemToCreate = new TodoItem();
                itemToCreate.title = title;
                itemToCreate.description = description;
                itemToCreate.completed = completed || false;

                const savedItem = await itemRepository.save(itemToCreate);
                res.status(201).send(savedItem);
            } catch (error) {
                res.status(500).send(
                    new TodoError("Error when creating item", error)
                );
            }
        });

        /**
         * PUT /items
         * Update existing item
         */
        app.put("/items", async (req: any, res: any) => {
            const { id, title, description, completed } = req.body;

            try {
                const itemToUpdate = await itemRepository.findOneOrFail(id);
                itemToUpdate.title = title;
                itemToUpdate.description = description;
                itemToUpdate.completed = completed;

                const updatedItem = await itemRepository.save(itemToUpdate);
                res.status(200).send(updatedItem);
            } catch (error) {
                res.status(500).send(
                    new TodoError(`Error updating item with id ${id}`, error)
                );
            }
        });

        /**
         * DELETE /items/:id
         * Delete existing item by id
         */
        app.delete("/items/:id", async (req: any, res: any) => {
            const itemId = +req.params.id;

            try {
                const itemToDelete = await itemRepository.findOneOrFail(itemId);
                const removeResult = await itemRepository.remove(itemToDelete);
                res.status(200).send({ ...removeResult, id: itemId });
            } catch (error) {
                res.status(500).send(
                    new TodoError(
                        `Error deleting item with id ${itemId}`,
                        error
                    )
                );
            }
        });

        app.post("/items/batch-delete", async (req: any, res: any) => {
            const items = req.body;
            const removedItems = [] as TodoItem[];

            try {
                for (let i = 0; i < items.length; i++) {
                    const itemToDelete = await itemRepository.findOneOrFail(
                        items[i].id
                    );
                    await itemRepository.remove(itemToDelete);
                    removedItems.push(items[i]);
                }

                res.status(200).send(removedItems);
            } catch (error) {
                res.status(500).send(
                    new TodoError(`Error deleting multiple items`, error)
                );
            }
        });

        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log("App listening on port:", PORT);
        });
    })
    .catch(error => console.log(error));
