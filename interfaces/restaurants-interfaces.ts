export interface ICategory {
  alias: string;
  title: string;
}

export interface IRestaurant {
  id: number;
  categories: ICategory[];
  image_url: string;
  name: string;
  review_count: number;
  rating: number;
  price: string;
  transactions: string[];
}

export type IRestaurantKeyInfo = Pick<IRestaurant, 'id' | 'name' | 'image_url'>;
