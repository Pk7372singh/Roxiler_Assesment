const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/statistics/:month", async (req, res) => {
  const { month } = req.params;

  if (!month || isNaN(month) || month < 1 || month > 12) {
    return res.status(400).json({ message: "Invalid month parameter" });
  }

  try {
    const totalSales = await Product.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
          sold: true,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" },
          totalItems: { $sum: 1 },
        },
      },
    ]);

    const notSoldItems = await Product.countDocuments({
      $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
      sold: false,
    });

    res.json({
      totalSaleAmount: totalSales[0]?.totalAmount || 0,
      totalSoldItems: totalSales[0]?.totalItems || 0,
      totalNotSoldItems: notSoldItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics", error });
  }
});

module.exports = router;
