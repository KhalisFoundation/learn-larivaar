import {createTypedHooks} from 'easy-peasy';
import {StoreInterface} from './interface';

const typedHooks = createTypedHooks<StoreInterface>();
export const useStoreState = typedHooks.useStoreState;
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
