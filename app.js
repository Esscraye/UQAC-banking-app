import express from "express"
import mongoose from "mongoose"
import { config } from "dotenv"
import accountRoutes from "./routes/accountRoutes.js"

config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Servir les fichiers statiques
app.use(express.static("public"))

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://mongo:27017/banque")
  .then(() => console.log("Connecté à MongoDB"))
  .catch((err) => console.error("Erreur de connexion à MongoDB:", err))

// Routes
app.use("/api/accounts", accountRoutes)

// Route principale
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./public" })
})

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`)
})

export default app

