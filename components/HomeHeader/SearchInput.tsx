import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Ionicon from 'react-native-vector-icons/Ionicons';

interface SearchInputProps {
  setLocation: (location: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = () => {
  const handleChangeLocation = (text: any) => {
    console.log(text);
  };

  return (
    <View
      style={{
        marginTop: 15,
        marginBottom: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignContent: 'center',
      }}>
      <GooglePlacesAutocomplete
        placeholder="Podaj adres"
        onPress={handleChangeLocation}
        query={{}}
        styles={{
          textInput: {
            backgroundColor: '#efefef',
            borderRadius: 20,
            marginTop: 7,
          },
          textInputContainer: {
            backgroundColor: '#efefef',
            borderRadius: 50,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
          },
        }}
        renderLeftButton={() => <Ionicon name="location-sharp" size={24} />}
        renderRightButton={() => (
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              width: 90,
              borderRadius: 20,
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Ionicon name="time-outline" size={16} />
            <Text style={{fontWeight: '500'}}>Szukaj</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchInput;
