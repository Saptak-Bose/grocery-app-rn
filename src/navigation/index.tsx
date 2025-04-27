import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "../utils/navigationUtils";
import SplashScreen from "../features/auth/splash-screen";
import DeliveryLogin from "../features/auth/delivery-login";
import CustomerLogin from "../features/auth/customer-login";
import ProductDashboard from "../features/dashboard/product-dashboard";

type Props = {};

const Stack = createNativeStackNavigator();

const Navigation = (props: Props) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="ProductDashboard" component={ProductDashboard} />
        <Stack.Screen
          options={{
            animation: "fade",
          }}
          name="DeliveryLogin"
          component={DeliveryLogin}
        />
        <Stack.Screen
          options={{
            animation: "fade",
          }}
          name="CustomerLogin"
          component={CustomerLogin}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
