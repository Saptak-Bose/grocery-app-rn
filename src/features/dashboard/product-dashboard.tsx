import {
  StyleSheet,
  Platform,
  Animated,
  TouchableOpacity,
  View,
} from "react-native";
import { NoticeHeight, screenHeight } from "../../utils/scaling";
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  withCollapsibleContext,
} from "@r0b0t3d/react-native-collapsible";
import { useEffect, useRef } from "react";
import * as Location from "expo-location";
import { reverseGeocode } from "../../services/map-service";
import { useAuthStore } from "../../state/auth-store";
import NoticeAnimation from "./notice-animation";
import Visuals from "./visuals";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import CustomText from "../../components/ui/custom-text";
import { Fonts } from "../../utils/constants";
import AnimatedHeader from "./animated-header";
import Content from "../../components/dashboard/content";
import StickySearchBar from "./sticky-search-bar";

type Props = {};

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboard = (props: Props) => {
  const { user, setUser } = useAuthStore();
  const noticePosition = useRef(new Animated.Value(NOTICE_HEIGHT)).current;
  const { expand, scrollY } = useCollapsibleContext();
  const previousScroll = useRef<number>(0);

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollY.value < previousScroll.current && scrollY.value > 180;
    const opacity = withTiming(isScrollingUp ? 1 : 0, {
      duration: 300,
    });
    const translateY = withTiming(isScrollingUp ? 0 : 10, {
      duration: 300,
    });

    previousScroll.current = scrollY.value;

    return {
      opacity,
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  const slideUp = () => {
    Animated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    const updateUser = async () => {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      reverseGeocode(latitude, longitude, setUser);
    };

    updateUser();
  }, []);

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView />
        {/* <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
          <TouchableOpacity
            onPress={() => {
              scrollY.value = 0;
              expand();
            }}
            style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
          >
            <Ionicons
              name="arrow-up-circle-outline"
              color="white"
              size={RFValue(12)}
            />
            <CustomText
              variant="h9"
              style={{ color: "white" }}
              fontFamily={Fonts.SemiBold}
            >
              Back to Top
            </CustomText>
          </TouchableOpacity>
        </Animated.View> */}
        <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader
              showNotice={() => {
                slideDown();

                const timeoutId = setTimeout(() => {
                  slideUp();
                }, 3500);

                return () => clearTimeout(timeoutId);
              }}
            />
            <StickySearchBar />
          </CollapsibleHeaderContainer>
          <CollapsibleScrollView
            nestedScrollEnabled
            style={styles.panelContainer}
            showsVerticalScrollIndicator={false}
          >
            <Content />
            <View style={{ backgroundColor: "#f8f8f8", padding: 20 }}>
              <CustomText
                fontSize={RFValue(32)}
                fontFamily={Fonts.Bold}
                style={{ opacity: 0.2 }}
              >
                Grocery Delivery App🛒
              </CustomText>
              <CustomText
                fontFamily={Fonts.Bold}
                style={{ marginTop: 10, paddingBottom: 100, opacity: 0.2 }}
              >
                Developed by 🤍 Saptak Bose
              </CustomText>
            </View>
          </CollapsibleScrollView>
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
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
