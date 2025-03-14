import mongoose from "mongoose"

const accountSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true,
    unique: true,
  },
  nom: {
    type: String,
    required: true,
  },
  solde: {
    type: Number,
    required: true,
    default: 0,
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
})

const Account = mongoose.model("Account", accountSchema)

export default Account

