import API from "../../services/apiService";
import { GetMapAutocompeleteDTO, GetMapAutocompeleteResponse } from "../interface/getMapAutoComplete.interface";

export default function getMapAutoCompleteInteractor(params: GetMapAutocompeleteDTO): Promise<GetMapAutocompeleteResponse> {
  const link = `https://api.locationiq.com/v1/autocomplete?key=pk.9b254bf7cb5be233afb04532d9b825b8&q=${params.keyword}`;

  return API.get(link);
}