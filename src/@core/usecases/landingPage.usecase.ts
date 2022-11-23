import { PlaceView } from "../entity/map.entity";
import { GetMapAutocompeleteDTO } from "../interface/getMapAutoComplete.interface";

export default abstract class LandingPageUsecase {
  abstract getMapAutoComplete(params: GetMapAutocompeleteDTO): Promise<PlaceView[]>;
}