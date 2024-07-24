import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetAllUsersUseCase } from '../get-all-users'
import { UpdateUserUseCase } from '../update-user'

export function makeUpdateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new UpdateUserUseCase(usersRepository)

  return useCase
}
