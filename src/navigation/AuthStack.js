import 'react-native-gesture-handler';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/LoginScreen";
import Register from "../screens/Register";
import CustomerHome from "../screens/Customer/Home";
import ShopeMenu from "../screens/Customer/Menu";
import Basket from "../screens/Customer/Basket";
import PendingOrder from "../screens/Customer/PendingOrder";
import DeliveryScreen from "../screens/Customer/DeliveryScreen";
import StoreLogin from "../screens/StoreLogin";
import StoreSettings from "../screens/Store/Setting";
import StoreHome from "../screens/Store/Home";
import StoreProducts from "../screens/Store/StoreProducts";
import AddProduct from "../screens/Store/AddProduct";
// ---------------------------------------------
import Beck from "../screens/BeckTest/index";
import Root from '../screens/Root';
import Usdi from "../screens/UsdiTest/index";
import { CardStyleInterpolators } from 'react-navigation-stack';



const Stack = createNativeStackNavigator();
const config ={
   animation: 'spring',
   config: {
      stiffness: 1000,
      damping: 50,
      mass: 3,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
   }
}
const AuthStack = () => {
   return ( 
      <Stack.Navigator
         screenOptions={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            transitionSpec: {
               open: config,
               close: config
            },
            cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
         }}
      >
         <Stack.Screen name="StoreLogin" component={StoreLogin} />
         <Stack.Screen name="Login" component={LoginScreen} />
         
         

         <Stack.Screen name="Register" component={Register} />
         
         <Stack.Screen name="CustomerHome" component={CustomerHome} />
         <Stack.Screen name="ShopeMenu" component={ShopeMenu} />
         <Stack.Screen 
            name="Basket" 
            component={Basket} 
            options={({ navigation }) => ({
               title: 'Awesome app',
               
             })}
         />
         <Stack.Screen name="PendingOrder" component={PendingOrder} />
         <Stack.Screen name="DeliveryScreen" component={DeliveryScreen} />
         {/* Store */}
         <Stack.Screen name="StoreSettings" component={StoreSettings} />
         <Stack.Screen name="StoreProducts" component={StoreProducts} />
         <Stack.Screen name="AddProduct" component={AddProduct} />
         <Stack.Screen name="StoreHome" component={StoreHome} />


         <Stack.Screen name="Beck" component={Beck}/>
         <Stack.Screen name="Usdi" component={Usdi}/>
         <Stack.Screen name="Root" component={Root}  options={{ headerShown: false }}/>
      </Stack.Navigator>
   );
}
export default AuthStack; 
