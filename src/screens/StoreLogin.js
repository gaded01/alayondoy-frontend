import { useLayoutEffect, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import { REACT_APP_BASE_API_URL } from "@env";
import SafeViewAndroid from "../components/SafeViewAndroid";
import Spinner from "react-native-loading-spinner-overlay";
import {
  ArrowRightIcon,
  Bars3BottomRightIcon,
  LockOpenIcon,
} from "react-native-heroicons/outline";
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  UserIcon,
} from "react-native-heroicons/solid";
import { useStoreProfileContext } from "../context/StoreProfileContext";

const StoreLogin = ({ navigate }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const { setStoreProfile } = useStoreProfileContext();
  const navigation = useNavigation();

  useLayoutEffect(() =>
    navigation.setOptions({
      headerShown: false,
    })
  );

  const storeToken = async (value) => {
    const res = await AsyncStorage.setItem("@access_token", value);
    return res;
  };

  useEffect(() => {
    console.log('err');
  },[])


  const submitLogin = () => {
    const params = { username: username,  password: password};
    setLoading(true);
    axios
      .post(`${REACT_APP_BASE_API_URL}/user-login`, params)
      .then((res) => {
        setLoading('here', false);
        if (res.data.status !== "failed") {
          console.log(res.data.access_token);
          setStoreProfile(res.data.user);
          storeToken(res.data.access_token);
          navigation.navigate("StoreHome");
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.log('error', error);
        setLoading(false);
      }); 
 
  };

  function enablePassword() {
    if(!visible) setVisible(true);
    else if(visible) setVisible(false);
  }

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View className="flex-1 px-5" style={{ backgroundColor: "#0088EC" }}>
        <View className="flex flex-row justify-center mt-10">
          <Image
            source={require("../../assets/app-logo.jpg")}
            className="h-32 w-32"
          />
        </View>
        <Text className="mt-2 text-3xl text-white font-bold">Store Login</Text>
        <Text className="text-lg text-gray-700">Please sign to continue</Text>
        <View className="flex-row justify-center">
         <Image
            source={require("../../assets/store-logo.png")}
            className="h-72 w-96"
          />
        </View>
       
        <View className="mt-5 h-screen">
         
          <View className="relative mb-5">
            <Text
              className="absolute text-red-500 text-sm top-2 left-4 z-10"
              style={{ color: "#FE6205" }}
            >
              Username
            </Text>
            <TextInput
              className="bg-gray-100 rounded-lg px-4 pb-3 pt-6 w-full text-base"
              onChangeText={setUsername}
              value={username}
              placeholder="Enter username"
            />
            {/* <UserIcon style={{position: 'absolute', top: 15, left: 10}} color="#c7c7c7" size={30}/> */}
          </View>
          <View className="relative mb-5">
            <Text
              className="absolute text-sm top-2 left-4 z-10"
              style={{ color: "#FE6205" }}
            >
              Password
            </Text>
            <TextInput
              className="bg-gray-100 rounded-lg px-4 pb-3 pt-6 w-full text-base"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!visible ? true : false}
              // value={password}
              placeholder="Enter password"
            />
            {/* <LockClosedIcon style={{position: 'absolute', top: 15, left: 10}} color="#c7c7c7" size={30}/> */}
            {!visible ? (
              <EyeIcon
                onPress={()=> enablePassword()}
                style={{ position: "absolute", top: 15, right: 10 }}
                color="#c7c7c7"
                size={30}
              />
            ) : (
              <EyeSlashIcon
                onPress={()=> enablePassword()}
                style={{ position: "absolute", top: 15, right: 10 }}
                color="#c7c7c7"
                size={30}
              />
            )}
          </View>
          <View className="flex-row justify-end">
            <TouchableOpacity
              className="flex-row items-center justify-end px-4 mt-4 rounded-full h-14 w-36"
              style={{ backgroundColor: "#FE6205" }}
              onPress={() => {
                submitLogin()
              }}
            >
              <Text className="text-white text-lg mr-3  font-bold text-center">
                Login
              </Text>
              <ArrowRightIcon color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
   
      </View>
      <Spinner visible={loading} />
    </SafeAreaView>
  );
};

export default StoreLogin;
