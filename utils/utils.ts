import { User } from '../src/users/entities/user.entity';

export const getUserWithoutPassword = (user: User) => {
  const { password, ...rest } = user;

  return rest;
};
