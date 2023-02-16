import functions from "firebase-functions"
import express from "express"
import cors from "cors"
import { getAllTasks, addTask, updateTask, deleteTask } from "./src/tasks.js"

const app = express()
app.use(cors())
app.use(express.json())

app.get('/tasks', getAllTasks)
app.post('/tasks', addTask)
app.patch('/tasks/:taskId', updateTask)
app.delete('/deleteTask/:taskId', deleteTask)

export const api = functions.https.onRequest(app)