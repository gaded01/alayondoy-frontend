import {useContext , createContext} from 'react';

export const StoreMenuContext = createContext({
   storeMenu: '',
   setStoreMenu: () => {}
}) 

export const useStoreMenuContext = () => useContext(StoreMenuContext);