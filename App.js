
import { useState } from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from '@react-navigation/native';
import { BeckStatusContext } from './src/context/BeckStatusContext'
import { UsdiStatusContext } from './src/context/UsdiStatusContext'
import { StoreProfileContext } from './src/context/StoreProfileContext'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./src/screens/LoginScreen";
import AuthStack from "./src/navigation/AuthStack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./src/screens/HomeScreen";
import Beck from "./src/screens/BeckTest/index";
import BeckQuestion from "./src/screens/BeckTest/Questions/index";
import Usdi from "./src/screens/UsdiTest/index";
import UsdiQuestion from "./src/screens/UsdiTest/Test/index";
import { StoreMenuContext } from "./src/context/StoreMenuContext";
import { CartContext } from "./src/context/CartContext";

const Stack = createDrawerNavigator();


export default function App() {
	const [ beckStatus, setBeckStatus ] = useState(1);
	const [ usdiStatus, setUsdiStatus ] = useState(1);
	const [ storeProfile, setStoreProfile ] = useState({});
	const [ storeMenu, setStoreMenu ] = useState({});
	const [ cart, setCart ] = useState([]);
	
  	return (
		<NavigationContainer>
			<TailwindProvider>
				<StoreProfileContext.Provider value={{storeProfile, setStoreProfile}}>
				<StoreMenuContext.Provider value={{storeMenu, setStoreMenu}}>
				<CartContext.Provider value={{cart , setCart}}>
				<BeckStatusContext.Provider value={{beckStatus, setBeckStatus }}>
					<UsdiStatusContext.Provider value={{usdiStatus, setUsdiStatus }}>
					<AuthStack/>
					</UsdiStatusContext.Provider>
				</BeckStatusContext.Provider>
				</CartContext.Provider>
				</StoreMenuContext.Provider>
				</StoreProfileContext.Provider>
			</TailwindProvider>
		</NavigationContainer>
  	);
}
