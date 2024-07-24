import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { listUsers } from './list-users'
import { deleteUser } from './delete-user'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /**
   * Authenticated
   */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
  app.delete('/users/:id', { onRequest: [verifyJWT] }, deleteUser)
  app.get('/users', listUsers)
  app.put('/users/:id', { onRequest: [verifyJWT] }, profile)
}
