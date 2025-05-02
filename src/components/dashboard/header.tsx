import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { useAuthStore } from "../../state/auth-store";
import * as Location from "expo-location";
import { useEffect } from "react";
import CustomText from "../ui/custom-text";
import { Fonts } from "../../utils/constants";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { navigate } from "../../utils/navigationUtils";

type Props = {
  showNotice: () => void;
};

const TASK_NAME = "BG_LOCATION_TASK";

const startBackgroundLocation = async () => {
  await Location.startLocationUpdatesAsync(TASK_NAME, {
    accuracy: Location.Accuracy.Balanced,
    timeInterval: 10000,
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

const Header = ({ showNotice }: Props) => {
  const { setUser, user } = useAuthStore();

  const updateUserLocation = async () => {
    await Location.requestBackgroundPermissionsAsync();
    await Location.requestForegroundPermissionsAsync();
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();
  };

  useEffect(() => {
    updateUserLocation();
    startBackgroundLocation();
  }, []);

  return (
    <View style={styles.subContainer}>
      <TouchableOpacity activeOpacity={0.8}>
        <CustomText fontFamily={Fonts.Bold} variant="h8" style={styles.text}>
          Delivery in
        </CustomText>
        <View style={styles.flexRowGap}>
          <CustomText
            fontFamily={Fonts.SemiBold}
            variant="h2"
            style={styles.text}
          >
            15 minutes
          </CustomText>
          <TouchableOpacity style={styles.noticeBtn} onPress={showNotice}>
            <CustomText
              fontSize={RFValue(5)}
              fontFamily={Fonts.SemiBold}
              style={{ color: "#3b4886" }}
            >
              🌧️ Rain
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={styles.flexRow}>
          <CustomText
            variant="h8"
            numberOfLines={1}
            fontFamily={Fonts.Medium}
            style={styles.text2}
          >
            {user?.address || "Nowhere, Somewhere 😅"}
          </CustomText>
          <MaterialCommunityIcons
            name="menu-down"
            color="#fff"
            size={RFValue(20)}
            style={{ bottom: -1 }}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate("Profile")}>
        <MaterialCommunityIcons
          name="account-circle-outline"
          size={RFValue(36)}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  text: {
    color: "#fff",
  },
  text2: {
    color: "#fff",
    width: "90%",
    textAlign: "center",
  },
  flexRow: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 2,
    width: "70%",
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: Platform.OS === "android" ? 10 : 5,
    justifyContent: "space-between",
  },
  flexRowGap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  noticeBtn: {
    backgroundColor: "#e8eaf5",
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    bottom: -2,
  },
});
