import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetAllUsersUseCaseResponse {
  user: Omit<User, 'password_hash'>[]
}

export class GetAllUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<GetAllUsersUseCaseResponse> {
    const user = await this.usersRepository.findAll()

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
