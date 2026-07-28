import dotenv from 'dotenv'
dotenv.config()

import dbConnection from './config/db.js'
import Car from './data/car.js'
import User from './data/user.js'

const cars = [
  {
    model: 'Toyota Corolla',
    type: 'Sedan',
    rate: 5000,
    available: true,
    plateNumber: `XYZ-${Math.floor(Math.random() * 9000) + 1000}`,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRg59BOcD_63i61GKkLKx6Y8ADa-PYl6XBWth-wswKo9VJayvAJoNCfOw&s=10',
  },
  {
    model: 'Honda Civic',
    type: 'Sedan',
    rate: 5500,
    available: true,
    plateNumber: `XYZ-${Math.floor(Math.random() * 9000) + 1000}`,
    image: 'https://www.automobileendirect.com/assets/vehicles/2HGFE2F33NH113986/2022-honda-civic-sedan/w1080/07f2c89ac76340afbdfe7f1f7f49db9d.webp',
  },
  {
    model: 'Ford Mustang',
    type: 'Sports',
    rate: 12000,
    available: true,
    plateNumber: `XYZ-${Math.floor(Math.random() * 9000) + 1000}`,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqmjlAWLBecPUsUg6HBDHfM9fP4bOmMQUojS_eIdIZrUb5H1jDqQsGhrdN&s=10',
  },
  {
    model: 'Tesla Model 3',
    type: 'Electric',
    rate: 15000,
    available: true,
    plateNumber: `XYZ-${Math.floor(Math.random() * 9000) + 1000}`,
    image: 'https://car-images.bauersecure.com/wp-images/189979/01-tesla_model_3_performance_2.jpeg',
  },
  {
    model: 'Jeep Wrangler',
    type: 'SUV',
    rate: 9000,
    available: true,
    plateNumber: `XYZ-${Math.floor(Math.random() * 9000) + 1000}`,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0RJjtp4RpyM9QtDH7nUX5Yiqc3Td0mNLWb8ny7UxJlaUOGChdPgDnHtiC&s=10',
  },
]

const users = [
  {
    name: 'Admin User',
    email: 'admin@hellfire.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    name: 'Staff Member',
    email: 'staff@hellfire.com',
    password: 'staff123',
    role: 'staff',
  },
  {
    name: 'Test Customer',
    email: 'customer@hellfire.com',
    password: 'customer123',
    role: 'customer',
  },
]

await dbConnection()

console.log('Seeding database...')

await Car.deleteMany({})
await Car.insertMany(cars)
console.log(`Inserted ${cars.length} cars`)

await User.deleteMany({})
// Create users one-by-one so pre-save hooks (password hashing) fire
for (const u of users) {
  await User.create(u)
}
console.log(`Inserted ${users.length} users`)
console.log('')
console.log('Default accounts:')
console.log('  Admin  → admin@hellfire.com    / admin123')
console.log('  Staff  → staff@hellfire.com    / staff123')
console.log('  Customer → customer@hellfire.com / customer123')
console.log('')
console.log('Done!')

process.exit(0)
