import { FakeDb } from '../db/FakeDb'
import { BadRequest, NotFound } from '../utils/Errors'

class BurgerService {
    createBurger(burgerData) {
        const found = FakeDb.burgers.find(b => b.name === burgerData.name)
        if (found) {
            throw new BadRequest('burger already exists')
        }
        burgerData.Id = Math.floor(Math.random() * 100)
        FakeDb.burgers.push(burgerData)
        return burgerData
    }

    getById(id) {
        const found = FakeDb.burgers.find(b => b.Id.toString() === id)
        if (!found) {
            throw new NotFound('No burger by that id ' + id)
        }
        return found
    }
}

export const burgerService = new BurgerService()