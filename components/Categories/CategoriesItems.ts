import {ImageSourcePropType} from 'react-native';

interface ICategory {
  text: string;
  image: ImageSourcePropType;
}

export const CATEGORIES: ICategory[] = [
  {
    text: 'Odbiór',
    image: require('../../assets/images/shopping-bag.png'),
  },
  {
    text: 'Fast food',
    image: require('../../assets/images/fast-food.png'),
  },
  {
    text: 'Napoje',
    image: require('../../assets/images/coffee.png'),
  },
  {
    text: 'Śniadanie',
    image: require('../../assets/images/bread.png'),
  },
];
