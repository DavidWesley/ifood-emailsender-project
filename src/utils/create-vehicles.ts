import { faker } from "@/lib/faker.ts"
import type { VehicleModel } from "@/lib/db/models/vehicle.ts"

export function createRandomVehicle(): VehicleModel {
    const vehicle = faker.vehicle

    const commonCarFeatures: string[] = [
        "Air Conditioning",
        "Power Windows and Locks",
        "Cruise Control",
        "Keyless Entry",
        "Bluetooth Connectivity",
        "Touchscreen Infotainment System",
        "Backup Camera",
        "Automatic Headlights",
        "Adaptive Cruise Control",
        "Lane Departure Warning and Lane Keeping Assist",
        "Blind Spot Monitoring",
        "Collision Avoidance Systems",
        "Heated Seats",
        "Leather Upholstery",
        "Power Adjustable Seats",
        "Four-Wheel Drive (4WD) or All-Wheel Drive (AWD)",
        "Hybrid or Electric Powertrain",
        "Turbocharged or Supercharged Engines",
        "Remote Start"
    ]

    const today = new Date().toISOString()

    return {
        model: vehicle.model(),
        type: vehicle.type(),
        manufacturer: vehicle.manufacturer(),
        fuel: vehicle.fuel(),
        year: faker.date.past({ years: 5, refDate: today }).getUTCFullYear().toString(),
        mark: vehicle.vrm(),
        price: faker.number.float({ min: 1e4, max: 1e6, precision: 2 }).toString(10),
        features: JSON.stringify(faker.helpers.arrayElements(commonCarFeatures, { min: 1, max: 4 }))
    }
}
