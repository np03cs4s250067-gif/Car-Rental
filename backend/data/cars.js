import dbConnection from '../src/config/db.js'
import car from './car.js'

const cars = [
    {
      model: "Toyota Corolla",
      type: "Sedan",
      rate: 5000,
      available: true,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRg59BOcD_63i61GKkLKx6Y8ADa-PYl6XBWth-wswKo9VJayvAJoNCfOw&s=10",
    },
    {
      model: "Honda Civic",
      type: "Sedan",
      rate: 5500,
      available: true,
      image: "https://www.automobileendirect.com/assets/vehicles/2HGFE2F33NH113986/2022-honda-civic-sedan/w1080/07f2c89ac76340afbdfe7f1f7f49db9d.webp",
    },
    {
      model: "Ford Mustang",
      type: "Sports",
      rate: 12000,
      available: false,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqmjlAWLBecPUsUg6HBDHfM9fP4bOmMQUojS_eIdIZrUb5H1jDqQsGhrdN&s=10",
    },
    {
      model: "Tesla Model 3",
      type: "Electric",
      rate: 15000,
      available: true,
      image: "https://car-images.bauersecure.com/wp-images/189979/01-tesla_model_3_performance_2.jpeg",
    },
    {
      model: "Jeep Wrangler",
      type: "SUV",
      rate: 9000,
      available: true,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0RJjtp4RpyM9QtDH7nUX5Yiqc3Td0mNLWb8ny7UxJlaUOGChdPgDnHtiC&s=10",
    },
  ];

  await dbConnection()
  await car.deleteMany({})
  await car.insertMany(cars)
  process.exit()

  export default cars;