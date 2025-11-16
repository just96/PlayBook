import Tactic from "../models/Tactic.js";

export async function getTactics(req, res) {
  try {
    const allTactics = await Tactic.find();
    res.status(200).json(allTactics);
  } catch (error) {
    console.error("Error in getTactics controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getCurrentTactic(req, res) {
  try {
    const { id } = req.params;
    const currentTactic = await Tactic.findById(id);
    if (!currentTactic) return res.status(404).json({ message: "Tactic not found!" });
    res.status(200).json({ message: "Your current tactic is", currentTactic });
  } catch (error) {
    console.error("Error in getCurrentTactic controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function newTactic(req, res) {
  try {
    const { map, side, zone, description, effectiveness } = req.body;
    const newTactic = new Tactic({ map, side, zone, description, effectiveness });
    const saveTactic = await newTactic.save();
    res.status(201).json({ message: "Tactic created successfully!", saveTactic });
  } catch (error) {
    console.error("Error in newTactic controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateTactic(req, res) {
  try {
    const { map, side, zone, description, effectiveness } = req.body;
    const { id } = req.params;
    const updateTactic = await Tactic.findByIdAndUpdate(
      id,
      { map, side, zone, description, effectiveness },
      { new: true, runValidators: true }
    );
    if (!updateTactic) return res.status(404).json({ message: "Tactic not found!" });
    res.status(200).json({ message: "Tactic updated sucessfully!", updateTactic });
  } catch (error) {
    console.error("Error in updateTactic controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteCurrentTactic(req, res) {
  try {
    const { id } = req.params;
    const deleteTactic = await Tactic.findByIdAndDelete(id);
    if (!deleteTactic) return res.status(404).json({ message: "Tactic not found!" });
    res.status(200).json({ message: "Tactic deleted sucessfully!", deleteTactic });
  } catch (error) {
    console.error("Error in deleteTactic controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// seed via Postman
// export async function createManyTactics(req, res) {
//   try {
//     const tactics = req.body;
//     const inserted = await Tactic.insertMany(tactics);
//     res.status(201).json(inserted);
//   } catch (error) {
//     console.error("Error in createManyTactics:", error);
//     res.status(500).json({ message: error.message });
//   }
// }
