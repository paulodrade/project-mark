import { environment as environmentProd } from './environment.prod';

export const environment = {
  ...environmentProd,
  production: false,
};
