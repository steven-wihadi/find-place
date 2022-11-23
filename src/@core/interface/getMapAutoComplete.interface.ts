export interface GetMapAutocompeleteDTO {
  keyword: string;
}

export interface Address {
  country: string;
  country_code: string;
  name: string;
}

export interface PlaceResponse {
  address: Address;
  boundingbox: string[];
  class: string;
  display_address: string;
  display_name: string;
  display_place: string;
  lat: string;
  licence: string;
  lon: string;
  osm_id: string;
  osm_type: string;
  place_id: string;
  type: string;
}

export interface GetMapAutocompeleteResponse {
  status: number;
  statusText: string;
  data: PlaceResponse[];
}