import { SyntheticEvent, Dispatch, SetStateAction } from 'react';
export type TPriceMode = 'дешево' | 'средне' | 'дорого';
export interface ICategory {
  id: number;
  name: string;
  photo_link?: string;
}

export type TNewRestaurant = {
  id: number;
  name: string;
  address: string;
  cuisine_type: ICategory[];
  rating: number;
  photo_links: string;
  prices?: string;
  description?: string;
};

export type TRestaurant = {
  id: number;
  name: string;
  address: string;
  cuisine_type: string[];
  rating: number;
  photo_links?: string;
  prices?: string;
  description?: string;
};

export type TUser = {
  email: string;
  username: string;
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
  errors: {
    username?: string;
    email: string;
    password: string;
    image?: string;
  };
  generalError: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.SyntheticEvent) => void;
};
