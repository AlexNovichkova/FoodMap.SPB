import { setCookie, getCookie, deleteCookie } from './cookie';
import { ICategory, TRestaurant, TUser } from '../models/types';

/*const URL = process.env.FOODMAP_API_URL;*/
const URL = `http://176.108.254.225:8000`;
const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TServerResponse<T> = {
  success: boolean;
} & T;

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

export const refreshToken = (): Promise<TRefreshResponse> =>
  fetch(`${URL}/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  })
    .then((res) => checkResponse<TRefreshResponse>(res))
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      return refreshData;
    });

export const fetchWithRefresh = async <T>(
  url: RequestInfo,
  options: RequestInit
) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err) {
    if ((err as { message: string }).message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (options.headers) {
        (options.headers as { [key: string]: string }).authorization =
          refreshData.accessToken;
      }
      const res = await fetch(url, options);
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export type TRegisterData = {
  email: string;
  username: string;
  password: string;
  image?: string;
  liked?: TRestaurant[];
  recommended?: TRestaurant[];
};

type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

export const registerUserApi = (data: TRegisterData) =>
  fetch(`${URL}/api/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export type TLoginData = {
  email: string;
  password: string;
};

export const loginUserApi = (data: TLoginData) =>
  fetch(`${URL}/api/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export const forgotPasswordApi = (data: { email: string }) =>
  fetch(`${URL}/password-reset/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TServerResponse<{}>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export const resetPasswordApi = (data: { password: string; token: string }) =>
  fetch(`${URL}/password-reset/reset/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TServerResponse<{}>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

type TUserResponse = TServerResponse<{ user: TUser }>;

export const getUserApi = () =>
  fetchWithRefresh<TUserResponse>(`${URL}/api/user-info/`, {
    headers: {
      authorization: `Bearer ${getCookie('accessToken')}`,
    } as HeadersInit,
  });

export const updateUserApi = (user: Partial<TRegisterData>) =>
  fetchWithRefresh<TUserResponse>(`${URL}/api/user-info/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: `Bearer ${getCookie('accessToken')}`,
    } as HeadersInit,
    body: JSON.stringify(user),
  });

export const logoutApi = () =>
  fetch(`${URL}/api/logout/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: `Bearer ${getCookie('accessToken')}`,
    },
    body: JSON.stringify({
      refresh: localStorage.getItem('refreshToken'), // Измените 'token' на 'refresh'
    }),
  }).then((res) => {
    checkResponse<TServerResponse<{}>>(res);
    deleteCookie('accessToken');
  });

type TRestaurantsResponse = TServerResponse<{
  restaurants: TRestaurant[];
}>;

type TCategorysResponse = TServerResponse<{
  cuisines: ICategory[];
}>;

export const getCategoriesApi = () =>
  fetch(`${URL}/api/cuisines/`)
    .then((res) => checkResponse<TCategorysResponse>(res))
    .then((data) => {
      if (data?.success) return data.cuisines;
      console.log(data);
      return Promise.reject(data);
    });

export const getRestaurantsApi = () =>
  fetch(`${URL}/api/restaurants/`)
    .then((res) => checkResponse<TRestaurantsResponse>(res))
    .then((data) => {
      if (data?.success) return data.restaurants;
      console.log(data);
      return Promise.reject(data);
    });

const apiKey = '90b594c5-60ad-4e4f-b665-a25fc23b8193';

export const fetchCoordinates = async (
  address: string
): Promise<[number, number] | null> => {
  const response = await fetch(
    `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${encodeURIComponent(
      address
    )}&format=json`,
    {
      headers: {
        Referer: 'http://176.108.254.225:4000',
      },
    }
  );
  const data = await response.json();

  if (
    data &&
    data.response &&
    data.response.GeoObjectCollection &&
    data.response.GeoObjectCollection.featureMember.length > 0
  ) {
    const geoObject =
      data.response.GeoObjectCollection.featureMember[0].GeoObject;
    const [longitude, latitude] = geoObject.Point.pos.split(' ').map(Number);
    return [latitude, longitude];
  } else {
    console.error('Coordinates not found');
    return null;
  }
};
