// const express = require("express");
// const router = express.Router();
// const Product = require("../models/Product");

// router.get("/barchart", async (req, res) => {
//   const { month } = req.query;
//   const dateRegex = new RegExp(`-${month.padStart(2, "0")}-`);

//   try {
//     const priceRanges = [
//       { range: "0-100", min: 0, max: 100 },
//       { range: "101-200", min: 101, max: 200 },
//       { range: "201-300", min: 201, max: 300 },
//       { range: "301-400", min: 301, max: 400 },
//       { range: "401-500", min: 401, max: 500 },
//       { range: "501-600", min: 501, max: 600 },
//       { range: "601-700", min: 601, max: 700 },
//       { range: "701-800", min: 701, max: 800 },
//       { range: "801-900", min: 801, max: 900 },
//       { range: "901-above", min: 901, max: Infinity },
//     ];

//     const barChartData = await Promise.all(
//       priceRanges.map(async ({ range, min, max }) => {
//         const count = await Product.countDocuments({
//           dateOfSale: dateRegex,
//           price: { $gte: min, $lte: max },
//         });

//         return { range, count };
//       })
//     );

//     res.json(barChartData);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching bar chart data", error });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/barchart/:month", async (req, res) => {
  const { month } = req.params;

  if (!month || isNaN(month) || month < 1 || month > 12) {
    return res.status(400).json({ message: "Invalid month parameter" });
  }

  try {
    const priceRanges = [
      { range: "0-100", min: 0, max: 100 },
      { range: "101-200", min: 101, max: 200 },
      { range: "201-300", min: 201, max: 300 },
      { range: "301-400", min: 301, max: 400 },
      { range: "401-500", min: 401, max: 500 },
      { range: "501-600", min: 501, max: 600 },
      { range: "601-700", min: 601, max: 700 },
      { range: "701-800", min: 701, max: 800 },
      { range: "801-900", min: 801, max: 900 },
      { range: "901-above", min: 901, max: Infinity },
    ];

    const barChartData = await Promise.all(
      priceRanges.map(async ({ range, min, max }) => {
        const count = await Product.countDocuments({
          $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
          price: { $gte: min, $lte: max },
        });

        return { range, count };
      })
    );

    res.json(barChartData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bar chart data", error });
  }
});

module.exports = router;
