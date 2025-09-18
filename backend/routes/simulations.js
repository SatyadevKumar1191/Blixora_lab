import express from "express";
import { auth, adminOnly } from "../middleware/auth.js";
import Simulation from "../models/Simulation.js";

const router = express.Router();

// ===================== Get all simulations =====================
router.get("/", async (req, res) => {
  try {
    const sims = await Simulation.find();
    res.json(sims);
  } catch (err) {
    res.status(500).json({ message: "Failed to load simulations" });
  }
});

// ===================== Admin: Create simulation =====================
router.post("/", auth, adminOnly, async (req, res) => {
  try {
    const sim = new Simulation(req.body);
    await sim.save();
    res.json(sim);
  } catch (err) {
    res.status(400).json({ message: "Create failed" });
  }
});

// ===================== Admin: Delete simulation =====================
router.delete("/:id", auth, adminOnly, async (req, res) => {
  try {
    await Simulation.findByIdAndDelete(req.params.id);
    res.json({ message: "Simulation deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed" });
  }
});

// ===================== Admin: Update simulation =====================
router.put("/:id", auth, adminOnly, async (req, res) => {
  try {
    const sim = await Simulation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(sim);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
});

export default router;
