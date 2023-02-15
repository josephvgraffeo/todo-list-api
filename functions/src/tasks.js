import { getFirestoreInstance } from "./utilities.js";
import { FieldValue } from "firebase-admin/firestore";

export async function getAllTasks(req, res) {
  const db = await getFirestoreInstance();
  db.collection('tasks').orderBy('createdAt', 'desc').get()
  .then(collection => {
      const tasks = collection.docs.map(doc => ({ taskId: doc.id, ...doc.data() }));
      res.send(tasks);
    })
    .catch(err => res.status(500).send({ error: err.message }));
}

export async function addTask(req, res) {
  const { task } = req.body;
  const newTask = { task, createdAt: FieldValue.serverTimestamp() }
  const db = await getFirestoreInstance();
  db.collection('tasks').add(newTask)
    .then(() => getAllTasks(req, res))
    .catch(err => res.status(500).send({ error: err.message }));
}

export async function updateTask(req, res) {
  const { done } = req.body;
  const { taskId } = req.params;
  const db = await getFirestoreInstance();
  db.collection('tasks').doc(taskId).update({ done })
    .then(() => getAllTasks(req, res))
    .catch(err => res.status(500).send({ error: err.message }));
}