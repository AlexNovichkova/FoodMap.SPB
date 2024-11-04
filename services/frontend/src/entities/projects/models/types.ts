import { FC, SyntheticEvent, Dispatch, SetStateAction } from 'react';
export type TPriceMode = 'дешево' | 'средне' | 'дорого';
export interface ICategory {
  id: number;
  name: string;
}
export type TRestaurant = {
  id: number;
  name: string;
  address: string;
  category: ICategory[];
  rating: number;
  image: string;
  price?: string;
  description?: string;
};

export type TUser = {
  email: string;
  name: string;
  image?: string;
  liked?: TRestaurant[];
  recommended?: TRestaurant[];
};

export interface IAppState {
  catalog: TRestaurant[];
  liked: string[];
  loading: boolean;
}

export type PageUIProps = {
  errorText: string | undefined;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: SyntheticEvent) => void;
};
