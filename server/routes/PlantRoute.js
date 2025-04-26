const express = require("express");
const router = express.Router();
const multer = require("multer");
const Plant = require("../models/Plant.js");
const EmployeeModel = require("../models/user.js");
const path = require("path");
const upload=require('../config/cloudinary.js')



// const express = require("express");
 // Make sure this is configured correctly
 router.get("/", async (req, res) => {
  try {
    const userEmail = req.user.email; // Requires authentication middleware
    const user = await EmployeeModel.findOne({ email: userEmail });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const plants = await Plant.find({ userId: user._id });
    res.status(200).json(plants);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch plant data" });
  }
});

// POST route - Backend handles Cloudinary upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, lastWatered, waterFrequency, lightRequirement } = req.body;
    const userEmail = req.user.email;

    const user = await EmployeeModel.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    const newPlant = new Plant({
      name,
      lastWatered,
      waterFrequency,
      lightRequirement,
      imageUrl: req.file ? req.file.path : null, // Cloudinary URL is stored in req.file.path
      userId: user._id,
    });

    await newPlant.save();
    res.status(201).json(newPlant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding plant", error });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const result = await Plant.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Plant not found" });
    }
    res.status(200).json({ message: "Plant deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});



// UPDATE plant
router.put("/:id", async (req, res) => {
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          lastWatered: req.body.lastWatered,
          waterFrequency: req.body.waterFrequency,
          lightRequirement: req.body.lightRequirement,
          // Add other fields if needed
        },
      },
      { new: true } // return updated document
    );

    if (!updatedPlant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    res.status(200).json(updatedPlant);
  } catch (err) {
    console.error("Error updating plant:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//water update
router.put("/:id/water", async (req, res) => {
  try {
    const plantId = req.params.id;

    const updatedPlant = await Plant.findByIdAndUpdate(
      plantId,
      {
        $set: {
          lastWatered: new Date(),
          healthStatus: "Healthy", // Optional: change this if needed
        },
      },
      { new: true }
    );

    if (!updatedPlant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    res.status(200).json(updatedPlant);
  } catch (err) {
    console.error("Error marking plant as watered:", err);
    res.status(500).json({ message: "Server error" });
  }
});







module.exports = router;


// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const Plant = require("../models/Plant.js");
// const path = require("path");
// const jwt = require('jsonwebtoken');

// // File upload config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
// });

// const upload = multer({ storage });

// // POST route for adding plant with image
// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     const { name, lastWatered, waterFrequency, lightRequirement } = req.body;

//     const newPlant = new Plant({
//       name,
//       lastWatered,
//       waterFrequency,
//       lightRequirement,
//       imageUrl: req.file ? `/uploads/${req.file.filename}` : null, // Add imageUrl field
//     });

//     await newPlant.save();
//     res.status(201).json(newPlant);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error adding plant", error });
//   }
// });

// // GET all plants
// router.get("/", async (req, res) => {
//   try {
//     const plants = await Plant.find();
//     res.status(200).json(plants);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch plant data" });
//   }
// });

// module.exports = router;

