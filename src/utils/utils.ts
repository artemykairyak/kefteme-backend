import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

export const getUserWithoutPassword = (user: User) => {
  const { password, ...rest } = user;

  return rest;
};

export const getFlatProduct = (product: Product) => {
  return {
    ...product,
    size: product.size.id,
    color: product.color.id,
    type: product.type.id,
  };
};
