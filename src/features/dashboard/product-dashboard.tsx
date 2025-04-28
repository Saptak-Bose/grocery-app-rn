import { View, StyleSheet, Platform } from "react-native";
import { NoticeHeight, screenHeight } from "../../utils/scaling";
import { withCollapsibleContext } from "@r0b0t3d/react-native-collapsible";
import { useEffect } from "react";
import * as Location from "expo-location";
import { reverseGeocode } from "../../services/map-service";
import { useAuthStore } from "../../state/auth-store";

type Props = {};

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboard = (props: Props) => {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const updateUser = async () => {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      reverseGeocode(latitude, longitude, setUser);
    };

    updateUser();
  }, []);

  return <View></View>;
};

export default withCollapsibleContext(ProductDashboard);

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
  },
  transparent: {
    backgroundColor: "transparent",
  },
  backToTopButton: {
    position: "absolute",
    alignSelf: "center",
    top: Platform.OS === "ios" ? screenHeight * 0.18 : 100,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "black",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 99,
  },
});
