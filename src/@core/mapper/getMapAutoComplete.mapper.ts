import { PlaceView } from "../entity/map.entity";
import { PlaceResponse } from "../interface/getMapAutoComplete.interface";

export function AdjustToViewMapper(placeResponse: PlaceResponse[]): PlaceView[] {
  const result = [];
  if (placeResponse.length !== 0) {
    placeResponse.forEach(place => {
      result.push({
        display_place: place.display_place,
        display_address: place.display_address,
        lon: place.lon,
        lat: place.lat,
        place_id: `${place.place_id}--${new Date().getTime()}`
      });
    });
  }

  return result;
}