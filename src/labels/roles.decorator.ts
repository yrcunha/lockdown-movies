import { SetMetadata } from '@nestjs/common';

export const Roles = () => SetMetadata('isAdmin', true);
