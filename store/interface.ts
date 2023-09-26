import {Action} from 'easy-peasy';

export interface StoreInterface {
  fontSize: number;
  keepScreenAwake: boolean;
  larivaar: boolean;
  larivaarAssist: boolean;

  setFontSize: Action<StoreInterface, number>;
  setLarivaar: Action<StoreInterface, boolean>;
  setLarivaarAssist: Action<StoreInterface, boolean>;
  setKeepScreenAwake: Action<StoreInterface, boolean>;
}
