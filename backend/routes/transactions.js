const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// router.get("/transactions", async (req, res) => {
//   const { page = 1, perPage = 10, search = "", month } = req.query;

//   try {
//     let query = {
//       $or: [
//         { title: { $regex: new RegExp(search, "i") } },
//         { description: { $regex: new RegExp(search, "i") } },
//         { price: search }, // Assuming price is stored as a string in your database
//       ],
//     };

//     if (month) {
//       query.dateOfSale = { $regex: new RegExp(`-${month.padStart(2, "0")}-`) };
//     }

//     const transactions = await Product.find(query)
//       .skip((parseInt(page) - 1) * parseInt(perPage))
//       .limit(parseInt(perPage));

//     res.json(transactions);
//   } catch (error) {
//     console.error("Error fetching transactions:", error);
//     res.status(500).json({ message: "Error fetching transactions", error });
//   }
// });

router.get("/transactions/:month", async (req, res) => {
  const { month } = req.params;
  const { page = 1, perPage = 10, search = "" } = req.query;

  if (!month || isNaN(month) || month < 1 || month > 12) {
    return res.status(400).json({ message: "Invalid month parameter" });
  }

  try {
    let query = {
      $or: [
        { title: { $regex: new RegExp(search, "i") } },
        { description: { $regex: new RegExp(search, "i") } },
        { price: search }, // Assuming price is stored as a string in your database
      ],
    };

    if (month) {
      const year = new Date().getFullYear(); // Or set a specific year if needed
      const startDate = new Date(`${year}-${month.padStart(2, "0")}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      query.dateOfSale = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    const transactions = await Product.find(query)
      .skip((parseInt(page) - 1) * parseInt(perPage))
      .limit(parseInt(perPage));

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Error fetching transactions", error });
  }
});

module.exports = router;
