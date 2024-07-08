const mongoose = require("mongoose");
const axios = require("axios");
const Product = require("./models/Product"); // Assuming you have a Product model
async function seedDatabase() {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const products1 = response.data;
    // console.log(products1);
    await Product.deleteMany({});
    // await Product.insertMany(products);
    products1.map(async (data) => {
      let { id, title, description, price, category, dateOfSale, sold, image } =
        data;

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
    });
    console.log("Database inserted in DB successfully");
    // process.exit();
  } catch (error) {
    console.error(" DataBase not inserted", error);
    process.exit(1);
  }
}

seedDatabase();
module.exports = seedDatabase;
