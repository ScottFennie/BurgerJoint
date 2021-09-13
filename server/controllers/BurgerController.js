import { FakeDb } from '../db/FakeDb'
import { burgerService } from '../services/BurgerService'
import BaseController from '../utils/BaseController'
import { NotFound } from '../utils/Errors'

export class BurgerController extends BaseController {
    constructor() {
        super('api/burgers')
        this.router
            .get('', this.getBurgers)
            .post('', this.createBurger)
            .get('/:Id', this.getBurgerById)
    }

    async getBurgerById(req, res, next) {
        const Id = req.params.Id
        const burg = await burgerService.getById(Id)
        res.send(burg)
    }

    async getBurgers(req, res, next) {
        res.send(FakeDb.burgers)
    }

    async createBurger(req, res, next) {
        try {
            const newBurger = await burgerService.createBurger(req.body)
            res.send(newBurger)
        } catch (error) {
            next(error)
        }
    }
}