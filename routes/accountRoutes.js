import express from "express"
import Account from "../models/account.js"

const router = express.Router()

// Créer un compte
router.post("/", async (req, res) => {
  try {
    const { numero, nom, solde } = req.body

    // Vérifier si le compte existe déjà
    const existingAccount = await Account.findOne({ numero })
    if (existingAccount) {
      return res.status(400).json({ message: "Ce numéro de compte existe déjà" })
    }

    const newAccount = new Account({
      numero,
      nom,
      solde: solde || 0,
    })

    await newAccount.save()
    res.status(201).json({ message: "Compte créé avec succès", account: newAccount })
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du compte", error: error.message })
  }
})

// Consulter un compte
router.get("/:numero", async (req, res) => {
  try {
    const account = await Account.findOne({ numero: req.params.numero })
    if (!account) {
      return res.status(404).json({ message: "Compte non trouvé" })
    }
    res.status(200).json(account)
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la consultation du compte", error: error.message })
  }
})

// Déposer de l'argent
router.put("/deposer/:numero", async (req, res) => {
  try {
    const { montant } = req.body
    if (!montant || montant <= 0) {
      return res.status(400).json({ message: "Montant invalide" })
    }

    const account = await Account.findOne({ numero: req.params.numero })
    if (!account) {
      return res.status(404).json({ message: "Compte non trouvé" })
    }

    account.solde += Number(montant)
    await account.save()

    res.status(200).json({ message: "Dépôt effectué avec succès", account })
  } catch (error) {
    res.status(500).json({ message: "Erreur lors du dépôt", error: error.message })
  }
})

// Retirer de l'argent
router.put("/retirer/:numero", async (req, res) => {
  try {
    const { montant } = req.body
    if (!montant || montant <= 0) {
      return res.status(400).json({ message: "Montant invalide" })
    }

    const account = await Account.findOne({ numero: req.params.numero })
    if (!account) {
      return res.status(404).json({ message: "Compte non trouvé" })
    }

    if (account.solde < montant) {
      return res.status(400).json({ message: "Solde insuffisant" })
    }

    account.solde -= Number(montant)
    await account.save()

    res.status(200).json({ message: "Retrait effectué avec succès", account })
  } catch (error) {
    res.status(500).json({ message: "Erreur lors du retrait", error: error.message })
  }
})

// Effacer un compte
router.delete("/:numero", async (req, res) => {
  try {
    const account = await Account.findOneAndDelete({ numero: req.params.numero })
    if (!account) {
      return res.status(404).json({ message: "Compte non trouvé" })
    }
    res.status(200).json({ message: "Compte supprimé avec succès", account })
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du compte", error: error.message })
  }
})

// Lister tous les comptes
router.get("/", async (req, res) => {
  try {
    const accounts = await Account.find()
    res.status(200).json(accounts)
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des comptes", error: error.message })
  }
})

export default router

