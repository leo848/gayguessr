import {seededRandom} from "../utils/random";
import {flagPresets} from "./flagPresets";

export default () => {
    let random = seededRandom(new Date().toDateString());
    let keys = Object.keys(flagPresets);
    let randomNumber = Math.floor(random() * keys.length);
    return keys[randomNumber];
}
