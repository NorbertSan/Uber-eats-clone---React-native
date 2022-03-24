import {AxiosResponse} from 'axios';

import {TransactionType} from '../components/HomeHeader/HomeHeader';
import {IRestaurant} from '../interfaces/restaurants-interfaces';
import YelpAxios from '../axios/yelp-config-axios';

export const getRestaurants =
  (location: string, transactionType: TransactionType) =>
  async (): Promise<IRestaurant[]> => {
    const response: AxiosResponse = await YelpAxios.get('businesses/search', {
      params: {
        location,
      },
    });
    const restaurants: IRestaurant[] = response.data.businesses;

    return restaurants.filter(restaurant =>
      restaurant.transactions.length === 0
        ? true
        : restaurant.transactions.includes(transactionType),
    );
  };

export const getSingleRestaurant =
  (id: number) => async (): Promise<IRestaurant> => {
    const response: AxiosResponse = await YelpAxios.get(`/businesses/${id}`);
    const restaurant: IRestaurant = response.data;
    return restaurant;
  };
