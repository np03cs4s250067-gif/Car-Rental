import dotenv from 'dotenv'
dotenv.config()

import connectDatabase from './config/db.js'
import VehicleRecord from './data/car.js'
import AccountRecord from './data/user.js'

const vehicleInventory = [
  {
    model: 'Tesla Model 3 Performance',
    type: 'Electric',
    rate: 14500,
    available: true,
    plateNumber: 'BA-2-PA-9988',
    image: 'https://car-images.bauersecure.com/wp-images/189979/01-tesla_model_3_performance_2.jpeg',
  },
  {
    model: 'BMW M4 Competition',
    type: 'Sports',
    rate: 18000,
    available: true,
    plateNumber: 'BA-3-CHA-4411',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    model: 'Range Rover Defender 110',
    type: 'SUV',
    rate: 15500,
    available: true,
    plateNumber: 'BA-1-JHA-8822',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
  },
  {
    model: 'Audi A6 Matrix Luxury',
    type: 'Sedan',
    rate: 8500,
    available: true,
    plateNumber: 'BA-4-PA-3321',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1000&q=80',
  },
  {
    model: 'Toyota Camry Hybrid',
    type: 'Sedan',
    rate: 6000,
    available: true,
    plateNumber: 'BA-2-CHA-7710',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRg59BOcD_63i61GKkLKx6Y8ADa-PYl6XBWth-wswKo9VJayvAJoNCfOw&s=10',
  },
  {
    model: 'Porsche 911 Carrera S',
    type: 'Sports',
    rate: 24000,
    available: true,
    plateNumber: 'BA-5-PA-0007',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    model: 'Hyundai Ioniq 5 EV',
    type: 'Electric',
    rate: 11000,
    available: true,
    plateNumber: 'BA-1-PA-5544',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1000&q=80',
  },
  {
    model: 'Jeep Wrangler Rubicon',
    type: 'SUV',
    rate: 9500,
    available: true,
    plateNumber: 'BA-3-JHA-1199',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0RJjtp4RpyM9QtDH7nUX5Yiqc3Td0mNLWb8ny7UxJlaUOGChdPgDnHtiC&s=10',
  },
  {
    model: 'Volkswagen Golf GTI',
    type: 'Hatchback',
    rate: 5500,
    available: true,
    plateNumber: 'BA-2-JHA-6633',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1000&q=80',
  }
]

const initialUserAccounts = [
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

async function seedDatabase() {
  try {
    await connectDatabase()

    console.log('[INFO] Initializing database seed operation...')

    await VehicleRecord.deleteMany({})
    const insertedVehicles = await VehicleRecord.insertMany(vehicleInventory)
    console.log(`[SUCCESS] Fleet seeded successfully: ${insertedVehicles.length} vehicles registered.`)

    await AccountRecord.deleteMany({})
    for (const accountCredentials of initialUserAccounts) {
      await AccountRecord.create(accountCredentials)
    }
    console.log(`[SUCCESS] Accounts seeded successfully: ${initialUserAccounts.length} system accounts registered.`)
    
    console.log('\n--- System Credentials ---')
    console.log('Administrator  : admin@hellfire.com / admin123')
    console.log('Staff Member    : staff@hellfire.com / staff123')
    console.log('Customer Account: customer@hellfire.com / customer123')
    console.log('--------------------------\n')

    process.exit(0)
  } catch (err) {
    console.error('[ERROR] Database seeding failed:', err)
    process.exit(1)
  }
}

seedDatabase()
