import cars from "../../data/cars.js";

export function getAll() {
    return cars;
}

export function add(car) {
    cars.push(car);
    return car;
}

export function update(id, newCar) {
    const index = cars.findIndex(car => car.id == id);

    if (index === -1) {
        return false;
    }

    cars[index] = newCar;
    return true;
}

export function del(id) {
    const index = cars.findIndex(car => car.id == id);

    if (index === -1) {
        return false;
    }

    cars.splice(index, 1);
    return true;
}