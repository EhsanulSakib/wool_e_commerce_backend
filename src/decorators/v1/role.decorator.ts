import { SetMetadata } from '@nestjs/common';
import { Role as RoleEnum } from 'src/types/v1/auth.types';

export const Role = (...roles: RoleEnum[]) => SetMetadata('roles', roles);
