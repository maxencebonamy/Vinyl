/* global console */

import cors from "cors"
import bodyParser from "body-parser"
import express from "express"
import mysql from "mysql2"
import { env } from "./config/env.js"

export const connection = mysql.createConnection({
	host: env.DB_HOST,
	port: env.DB_PORT,
	user: env.DB_USER,
	password: env.DB_PASSWORD,
	database: env.DB_DATABASE
})

connection.connect(err => {
	if (err) {
		console.error("Connection to MySQL failed:", err)
	} else {
		console.log("Successfully connected to MySQL.")
	}
})

export const app = express()

app.use(cors())
app.use(bodyParser.json())

// app.use((req, res) => {
// 	res.json({ message: "Votre requête a bien été reçue !" })
// })

app.get("/items", (_req, res) => {
	connection.query("SELECT * FROM items", (error, results) => {
		if (error) {
			console.error("Error while fetching items: ", error)
			res.status(500).json({ message: "An error occurred while fetching items." })
		} else {
			res.json(results)
		}
	})
})

app.get("/items/:id", (req, res) => {
	const itemId = req.params.id
	connection.query("SELECT * FROM items WHERE id = ?", [ itemId ], (error, results) => {
		if (error) {
			console.error("Error while fetching item: ", error)
			res.status(500).json({ error: "An error occurred while fetching the item." })
		} else {
			if (results.length > 0) {
				res.status(200).json(results[0])
			} else {
				res.status(404).json({ error: "Item not found." })
			}
		}
	})
})

app.post("/items", (req, res) => {
	const itemData = req.body
	connection.query("INSERT INTO items SET ?", [ itemData ], (error, results) => {
		if (error) {
			console.error("Error while inserting item: ", error)
			res.status(500).json({ error: "An error occurred while inserting the item." })
		} else {
			const insertedItemId = results.insertId
			connection.query("SELECT * FROM items WHERE id = ?", [ insertedItemId ], (error, results) => {
				if (error) {
					console.error("Error while fetching inserted item: ", error)
					res.status(500).json({ error: "An error occurred while fetching the inserted item." })
				} else {
					res.status(201).json(results[0])
				}
			})
		}
	})
})

app.put("/items/:id", (req, res) => {
	const itemId = req.params.id
	const updatedItemData = req.body
	console.log(updatedItemData)
	connection.query("UPDATE items SET ? WHERE id = ?", [ updatedItemData, itemId ], (error, results) => {
		if (error) {
			console.error("Error while updating item: ", error)
			res.status(500).json({ error: "An error occurred while updating the item." })
		} else {
			if (results.affectedRows > 0) {
				res.status(200).json(updatedItemData)
			} else {
				res.status(404).json({ error: "Item not found." })
			}
		}
	})
})
