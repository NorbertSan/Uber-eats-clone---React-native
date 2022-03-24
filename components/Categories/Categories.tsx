import React from 'react';
import {Image, Text, View} from 'react-native';
import {Divider} from 'react-native-elements';

import {CATEGORIES} from './CategoriesItems';

const Categories = () => {
  return (
    <>
      <Divider />
      <View
        style={{
          backgroundColor: '#fff',
          padding: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {CATEGORIES.map((category, index) => (
          <View key={index} style={{alignItems: 'center'}}>
            <Image
              style={{width: 30, height: 30}}
              source={category.image}></Image>
            <Text style={{fontWeight: '600', marginTop: 5}}>
              {category.text}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
};

export default Categories;
