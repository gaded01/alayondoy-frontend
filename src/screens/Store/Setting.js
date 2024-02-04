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
  ImageBackground,
} from "react-native";
import axios from "axios";
import { REACT_APP_BASE_API_URL } from "@env";
import SafeViewAndroid from "../../components/SafeViewAndroid";
import Spinner from "react-native-loading-spinner-overlay";
import {
  ArrowRightIcon,
  ArrowUpOnSquareIcon,
  ArrowUpTrayIcon,
  LockOpenIcon,
} from "react-native-heroicons/outline";
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  PlusIcon,
  UserIcon,
} from "react-native-heroicons/solid";

const Settings = ({ navigate }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);
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
    const submit_email = { email: email };
    setLoading(true);
    axios
      .post(`${REACT_APP_BASE_API_URL}/user-login`, submit_email)
      .then((res) => {
        setLoading(false);
        if (res.data.status !== "failed") {
          console.log(res.data.access_token);
          storeToken(res.data.access_token);
          navigation.navigate("Root");
        } else {
          alert(res.data.result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function enablePassword() {
    if(!visible) setVisible(true);
    else if(visible) setVisible(false);
  }

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View className="flex-1 relative" style={{ backgroundColor: "#0088EC" }}>
        <View className="flex flex-row justify-center mt-32 mb-20">
            <Text className="text-2xl font-bold text-white">Profile Settings</Text>
        </View>
          <View className="h-36 w-36 border  border-gray-200  bg-white rounded-full absolute left-[35%] top-[19%] z-10 flex justify-center items-center"> 
            {/* <Image
              source={require("../../../assets/restaurant.jpg")}
              className="object-cover w-full h-full rounded-full"
            /> */}
            <Text className="text-gray-400">Insert Photo</Text>
          </View>
          <TouchableOpacity className="bg-[#FE6205] h-8 w-8 flex justify-center items-center rounded-full absolute right-[36%] top-[30%]   z-20">
            <ArrowUpTrayIcon color="#fff" size={18}/>
          </TouchableOpacity>
   
        <View className="mt-5 h-screen bg-white px-4 py-5 relative flex-1">
          <View className="pt-20">
            <View className="relative mb-5">
              <Text
                className="absolute text-red-500 text-sm top-2 left-4 z-10"
                style={{ color: "#FE6205" }}
              >
                Store Name
              </Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-4 pb-3 pt-6 w-full text-base"
                // onChangeText={setContactNumber}
                // value={contactNumber}
                placeholder="Enter store name"
              />
              {/* <UserIcon style={{position: 'absolute', top: 15, left: 10}} color="#c7c7c7" size={30}/> */}
            </View>
            <View className="relative mb-5">
              <Text
                className="absolute text-red-500 text-sm top-2 left-4 z-10"
                style={{ color: "#FE6205" }}
              >
                Branch (if any)
              </Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-4 pb-3 pt-6 w-full text-base"
                // onChangeText={setContactNumber}
                // value={contactNumber}
                placeholder="Enter store branch"
              />
              {/* <UserIcon style={{position: 'absolute', top: 15, left: 10}} color="#c7c7c7" size={30}/> */}
            </View>
            <View className="relative mb-5">
              <Text
                className="absolute text-sm top-2 left-4 z-10"
                style={{ color: "#FE6205" }}
              >
                Complete Address
              </Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-4 pb-3 pt-6 w-full text-base"
                // onChangeText={setPassword}
                // value={password}
                placeholder="Enter store address"
              />
              {/* <LockClosedIcon style={{position: 'absolute', top: 15, left: 10}} color="#c7c7c7" size={30}/> */}
            </View>
            <View className="relative mb-5">
              <Text
                className="absolute text-red-500 text-sm top-2 left-4 z-10"
                style={{ color: "#FE6205" }}
              >
                Desription
              </Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-4 pb-3 pt-6 w-full text-base"
                multiline={true}
                numberOfLines={5}
                // onChangeText={setContactNumber}
                // value={contactNumber}
                placeholder="A short description about the store"
              />
              {/* <UserIcon style={{position: 'absolute', top: 15, left: 10}} color="#c7c7c7" size={30}/> */}
            </View>
            <View className="flex-row justify-end mt-10">
              <TouchableOpacity
                className="flex-row items-center justify-center px-4 mt-4 rounded-lg h-14 w-full"
                style={{ backgroundColor: "#0088EC" }}
                onPress={() => {
                  navigation.navigate("StoreHome");
                }}
              >
                <Text className="text-white text-lg mr-3  font-bold text-center">
                  Save Profile
                </Text>
                {/* <ArrowRightIcon color="#fff" /> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <View className="flex-1 flex-col justify-end py-10">
          <Text className="mt-5 text-base text-gray-700 text-center">
            Don't have a account?
            <Text
              className="font-bold text-white"
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              {" "}
              Sign Up
            </Text>
          </Text>
        </View> */}
      </View>
      <Spinner visible={loading} />
    </SafeAreaView>
  );
};

export default Settings;
