import Tactic from "../models/Tactic.js";

export async function getTactics(req, res) {
  try {
    const userId = req.userId;
    const tactics = await Tactic.find({ user: userId });
    res.status(200).json(tactics);
  } catch (error) {
    console.error("Error in getTactics controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getCurrentTactic(req, res) {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const tactic = await Tactic.findOne({ _id: id, user: userId });
    if (!tactic) return res.status(404).json({ message: "Tactic not found!" });
    res.status(200).json({ message: "Your current tactic is", tactic });
  } catch (error) {
    console.error("Error in getCurrentTactic controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function newTactic(req, res) {
  try {
    const userId = req.userId;
    const { map, side, zone, description, effectiveness } = req.body;
    if (!map || !side || !zone || !description || !effectiveness) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const tactic = new Tactic({ user: userId, map, side, zone, description, effectiveness });
    const saveTactic = await tactic.save();
    res.status(201).json({ message: "Tactic created successfully!", saveTactic });
  } catch (error) {
    console.error("Error in newTactic controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateTactic(req, res) {
  try {
    const userId = req.userId;
    const { map, side, zone, description, effectiveness } = req.body;
    if (!map || !side || !zone || !description || !effectiveness) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const { id } = req.params;
    const tactic = await Tactic.findOneAndUpdate(
      { _id: id, user: userId },
      { map, side, zone, description, effectiveness },
      { new: true, runValidators: true }
    );
    if (!tactic) return res.status(404).json({ message: "Tactic not found!" });
    res.status(200).json({ message: "Tactic updated successfully!", tactic });
  } catch (error) {
    console.error("Error in updateTactic controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteCurrentTactic(req, res) {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const tactic = await Tactic.findOneAndDelete({ _id: id, user: userId });
    if (!tactic) return res.status(404).json({ message: "Tactic not found!" });
    res.status(200).json({ message: "Tactic deleted successfully!", tactic });
  } catch (error) {
    console.error("Error in deleteTactic controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
