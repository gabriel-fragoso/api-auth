import { makeDeleteUserUseCase } from '@/use-cases/factories/make-delete-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.sub) {
    return reply
      .status(401)
      .send({ error: 'Unauthorized: No user ID provided' })
  }

  const deleteUser = makeDeleteUserUseCase()

  try {
    await deleteUser.execute({
      userId: request.user.sub,
    })
    return reply.status(204).send()
  } catch (error) {
    return reply.status(500).send({ error: 'Internal Server Error' })
  }
}
