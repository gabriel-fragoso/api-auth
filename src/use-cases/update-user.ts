import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateUserUseCaseRequest {
  userId: string
  data: {
    name: string
    email: string
    password_hash: string
  }
}

interface UpdateUserUseCaseResponse {
  user: User
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    data,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userExists = await this.usersRepository.findById(userId)

    if (!userExists) {
      throw new ResourceNotFoundError()
    }

    const user = await this.usersRepository.update(userId, data)

    return {
      user,
    }
  }
}
