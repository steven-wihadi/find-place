import { PlaceView } from "../../@core/entity/map.entity";
import getMapAutoCompleteInteractor from "../../@core/interactor/getMapAutoComplete.interator";
import { GetMapAutocompeleteDTO, GetMapAutocompeleteResponse } from "../../@core/interface/getMapAutoComplete.interface";
import { AdjustToViewMapper } from "../../@core/mapper/getMapAutoComplete.mapper";
import LandingPageUsecase from "../../@core/usecases/landingPage.usecase";

export default class LandingPageUsecaseImpl extends LandingPageUsecase {
  getMapAutoComplete(params: GetMapAutocompeleteDTO): Promise<PlaceView[]> {
    return getMapAutoCompleteInteractor(params).then((res: GetMapAutocompeleteResponse) => {
      if (res.status === 200) {
        return AdjustToViewMapper(res.data);
      }
    });
  }
}