import axios from 'axios';
// @ts-ignore
import {API_KEY_YELP} from '@env';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3',
  headers: {
    Authorization: `Bearer ${API_KEY_YELP}`,
  },
});
