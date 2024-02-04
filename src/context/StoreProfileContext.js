import {useContext , createContext} from 'react';

export const StoreProfileContext = createContext({
   storeProfile: '',
   setStoreProfile: () => {}
}) 

export const useStoreProfileContext = () => useContext(StoreProfileContext);