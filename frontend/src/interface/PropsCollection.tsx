import { unknownType } from '../types/TypesCollection';

export interface I_Credentials {
  _id?: any;
  name?: string;
  email: string;
  password: string;
  password2?: string;
}

export interface I_InitState {
  entity?: unknownType;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
