import express from 'express'

import { CommonRoutesConfig, configureRoutes } from '../common/common.routes.config'
import { UsersController } from './controllers/users.controller';
import { UsersMiddleware } from './middlewares/users.middleware';


export class UsersRoutes extends CommonRoutesConfig implements configureRoutes {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes')
    this.configureRoutes();
  }

  configureRoutes() {
    const usersController = new UsersController()
    const usersMiddleware = new UsersMiddleware()

    this.app.get(`/users`, [
      usersController.listUsers,
    ])

    this.app.post(`/users`, [
      usersMiddleware.validateRequiredCreateUserBodyFields,
      usersMiddleware.validateSameEmailDoesntExist,
      usersController.createUser,
    ])

    this.app.put(`/users/:userId`, [
      usersMiddleware.validateUserExist,
      usersMiddleware.extractUserId,
      usersController.put
    ])

    this.app.patch(`/users/:userId`, [
      usersMiddleware.validateUserExist,
      usersMiddleware.extractUserId,
      usersController.patch
    ])

    this.app.delete(`/users/:userId`, [
      usersMiddleware.validateUserExist,
      usersMiddleware.extractUserId,
      usersController.removeUser
    ])

    this.app.get(`/users/:userId`, [
      usersMiddleware.validateUserExist,
      usersMiddleware.extractUserId,
      usersController.getUserById
    ])
  }
}