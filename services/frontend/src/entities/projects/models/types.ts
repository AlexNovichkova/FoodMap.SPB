export type TPriceMode = 'дешево' | 'средне' | 'дорого';
export interface ICategory {
  id: string;
  name: string;
}
export interface IRestaurant {
  id: string;
  name: string;
  category: ICategory[];
  rating?: number;
  image: string;
  price?: TPriceMode;
  description?: string;
}

export interface IUser {
  id: string;
  name: string;
  image: string;
  liked: IRestaurant[];
}

export interface IAppState {
  catalog: IRestaurant[];
  liked: string[];
  loading: boolean;
}
