const express = require("express");
const router = express.Router();

router.get("/insertedData", async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    // const products = response.data;

    // await Product.deleteMany({});
    // await Product.insertMany(products);

    let { id, title, description, price, category, dateOfSale, sold, image } =
      response.data;

    // Convert dateOfSale to a Date object and set time to midnight
    let date = new Date(dateOfSale);
    date.setUTCHours(0, 0, 0, 0); // Set time to 00:00:00.000 UTC

    const newProduct = new Product({
      id,
      title,
      description,
      price,
      category,
      image,
      dateOfSale: date, // Store the modified date
      sold,
    });

    await newProduct.save();

    console.log("Database inserted in DB successfully");
    // process.exit();
  } catch (error) {
    console.error(" DataBase not inserted", error);
    // process.exit(1);
  }
});
module.exports = router;
