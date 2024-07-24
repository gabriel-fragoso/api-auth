import { makeGetAllUsersUseCase } from '@/use-cases/factories/make-list-users-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
  const getAllUser = makeGetAllUsersUseCase()

  const { user } = await getAllUser.execute()

  return reply.status(200).send({
    ...user,
    password_hash: undefined,
  })
}
