import {IDish} from './../components/Restaurant/RestaurantDishesItems';

interface IAboutRestaurantRouteParams {
  restaurationId: number;
  restaurantName: string;
  image_url: string;
}

interface IOrderRouteParams {
  restaurantName: string;
  items: IDish[];
  totalPrice: string;
}

export type RouteParamsList = {
  aboutRestaurant: IAboutRestaurantRouteParams;
  order: IOrderRouteParams;
};
