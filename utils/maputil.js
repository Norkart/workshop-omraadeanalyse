import { currentMapFeature } from '../state/mapfeature';

export function removeMapFeatureIfExists(){
    if(currentMapFeature){
        currentMapFeature.remove();
    }
} 