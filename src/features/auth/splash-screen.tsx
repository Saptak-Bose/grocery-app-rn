import { View, StyleSheet, Image, Alert } from "react-native";
import { Colors } from "../../utils/constants";
import Logo from "../../assets/images/logo.jpeg";
import { screenHeight, screenWidth } from "../../utils/scaling";
import { useEffect } from "react";
import { navigate, resetAndNavigate } from "../../utils/navigationUtils";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { useAuthStore } from "../../state/auth-store";
import { tokenStorage } from "../../state/storage";
import { jwtDecode } from "jwt-decode";
import { refetchUser, refresh_tokens } from "../../services/auth-service";

type Props = {};

type DecodedToken = {
  exp: number;
};

const TASK_NAME = "BG_LOCATION_TASK";

TaskManager.defineTask(TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log("BG locations:", (data as any).locations);
});

const startBackgroundLocation = async () => {
  await Location.startLocationUpdatesAsync(TASK_NAME, {
    accuracy: Location.Accuracy.Balanced,
    timeInterval: 15000,
    distanceInterval: 0,
    pausesUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: false,
    foregroundService: {
      notificationTitle: "Location Permissions",
      notificationBody:
        "We need your location permission to provide you with better shopping experience...",
    },
  });
};

const SplashScreen = (props: Props) => {
  const { setUser, user } = useAuthStore();

  const tokenCheck = async () => {
    const accessToken = (await tokenStorage.getItem("accessToken")) as string;
    const refreshToken = (await tokenStorage.getItem("refreshToken")) as string;

    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);
      const currentTime = Date.now() / 1000;

      if (decodedRefreshToken?.exp < currentTime) {
        resetAndNavigate("CustomerLogin");
        Alert.alert("Session expired", "Please login again...");

        return false;
      }

      if (decodedAccessToken?.exp < currentTime) {
        try {
          refresh_tokens();
          await refetchUser(setUser);
        } catch (error) {
          console.log(error);
          Alert.alert("There was an refreshing the token...");

          return false;
        }
      }

      if (user?.role === "Customer") {
        resetAndNavigate("ProductDashboard");
      } else {
        resetAndNavigate("DeliveryDashboard");
      }

      return true;
    }

    resetAndNavigate("CustomerLogin");
    return false;
  };

  useEffect(() => {
    const initialStartup = async () => {
      try {
        await Location.requestBackgroundPermissionsAsync();
        await Location.requestForegroundPermissionsAsync();
        tokenCheck();
        startBackgroundLocation();
      } catch (error) {
        Alert.alert(
          "Sorry we need your location permission to provide you with better shopping experience..."
        );
      }
    };

    const timeoutId = setTimeout(initialStartup, 4000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logoImage} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    height: screenHeight * 0.4,
    width: screenWidth * 0.4,
    resizeMode: "contain",
  },
});
