import connectToDatabase from "./utils/db.js";
import Car from "./utils/models/Car.js";

async function insertCars() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Array of car data to insert
    const cars = [
      {
        name: "Luxury Sedan",
        type: "Sedan",
        price: 120,
        img: "https://via.placeholder.com/300x200?text=Luxury+Sedan",
      },
      {
        name: "Family SUV",
        type: "SUV",
        price: 150,
        img: "https://via.placeholder.com/300x200?text=Family+SUV",
      },
      {
        name: "Convertible Coupe",
        type: "Coupe",
        price: 200,
        img: "https://via.placeholder.com/300x200?text=Convertible+Coupe",
      },
    ];

    // Insert the data into the Car collection
    const result = await Car.insertMany(cars);

    console.log("Data inserted successfully:", result);
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

insertCars();
