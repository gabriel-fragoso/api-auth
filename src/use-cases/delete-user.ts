import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteUserUseCaseRequest {
  userId: string
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: DeleteUserUseCaseRequest): Promise<void> {
    if (!userId) {
      throw new Error('Invalid user ID')
    }

    const userExists = await this.usersRepository.findById(userId)

    if (!userExists) {
      throw new ResourceNotFoundError()
    }

    await this.usersRepository.delete(userId)
  }
}
