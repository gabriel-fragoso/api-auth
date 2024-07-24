import { makeUpdateUserUseCase } from '@/use-cases/factories/make-update-user-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user?.sub) {
    return reply.status(401).send({ error: 'Unauthorized' })
  }

  const updateUser = makeUpdateUserUseCase()

  try {
    const { user } = await updateUser.execute({
      userId: request.user.sub,
      data: request.body as {
        name: string
        email: string
        password_hash: string
      },
    })

    return reply.status(200).send({
      user: {
        ...user,
        password_hash: undefined,
      },
    })
  } catch (error) {
    return reply.status(500).send({ error: 'Internal Server Error' })
  }
}
