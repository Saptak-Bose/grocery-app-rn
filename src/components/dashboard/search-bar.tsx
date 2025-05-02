import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, Fonts } from "../../utils/constants";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import RollingBar from "react-native-rolling-bar";
import CustomText from "../ui/custom-text";

type Props = {};

const SearchBar = (props: Props) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <Ionicons name="search" color={Colors.text} size={RFValue(20)} />
      <RollingBar
        interval={3000}
        defaultStyle={false}
        customStyle={styles.textContainer}
      >
        <CustomText variant="h6" fontFamily={Fonts.Medium}>
          Search "sweets"
        </CustomText>
        <CustomText variant="h6" fontFamily={Fonts.Medium}>
          Search "milk"
        </CustomText>
        <CustomText variant="h6" fontFamily={Fonts.Medium}>
          Search for flour, pulses, soft drinks
        </CustomText>
        <CustomText variant="h6" fontFamily={Fonts.Medium}>
          Search "chips"
        </CustomText>
        <CustomText variant="h6" fontFamily={Fonts.Medium}>
          Search "pooja thali"
        </CustomText>
      </RollingBar>
      <View style={styles.divider} />
      <Ionicons name="mic" color={Colors.text} size={RFValue(20)} />
    </TouchableOpacity>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f4f7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: Colors.border,
    marginTop: 15,
    overflow: "hidden",
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  textContainer: {
    width: "90%",
    paddingLeft: 10,
    height: 50,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: "#ddd",
    marginHorizontal: 10,
  },
});
