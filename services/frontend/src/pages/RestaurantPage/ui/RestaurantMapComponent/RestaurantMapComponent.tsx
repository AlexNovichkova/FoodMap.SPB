import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { FC } from 'react';
import { TRestaurant } from 'src/entities/projects/models/types';
export const RestaurantMapComponent: FC<{
  restaurant: TRestaurant;
  coordinates: [number, number];
}> = ({ restaurant, coordinates }) => {
  return (
    <YMaps>
      <div className=' rounded-b-[8px] overflow-hidden md:rounded-bl-none md:rounded-r-[8px]'>
        <Map
          defaultState={{ center: coordinates, zoom: 14 }}
          style={{ width: '100%', height: '400px' }}
        >
          <Placemark
            geometry={coordinates}
            properties={{ balloonContent: restaurant.name }}
          />
        </Map>
      </div>
    </YMaps>
  );
};
