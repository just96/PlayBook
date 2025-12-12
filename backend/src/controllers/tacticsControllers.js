import Tactic from "../models/Tactic.js";
import { validateTactic } from "../validators/tactics.js";

export async function getTactics(req, res) {
  try {
    const tactics = await Tactic.find({ user: req.userId });
    res.status(200).json(tactics);
  } catch (error) {
    console.error("Error in getTactics", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getCurrentTactic(req, res) {
  try {
    const tactic = await Tactic.findOne({ _id: req.params.id, user: req.userId });
    if (!tactic) return res.status(404).json({ message: "Tactic not found!" });
    res.status(200).json(tactic);
  } catch (error) {
    console.error("Error in getCurrentTactic", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function newTactic(req, res) {
  try {
    const { error } = validateTactic(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const tactic = new Tactic({ user: req.userId, ...req.body });
    const saveTactic = await tactic.save();
    res.status(201).json(saveTactic);
  } catch (error) {
    console.error("Error in newTactic", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateTactic(req, res) {
  try {
    const { error } = validateTactic(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const tactic = await Tactic.findOneAndUpdate({ _id: req.params.id, user: req.userId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tactic) return res.status(404).json({ message: "Tactic not found!" });
    res.status(200).json(tactic);
  } catch (error) {
    console.error("Error in updateTactic", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteCurrentTactic(req, res) {
  try {
    const tactic = await Tactic.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!tactic) return res.status(404).json({ message: "Tactic not found!" });
    res.status(200).json(tactic);
  } catch (error) {
    console.error("Error in deleteTactic", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
