import { ComponentProps, ReactNode } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors, Fonts } from "../../utils/constants";

type Props = {
  left: Readonly<ReactNode>;
  onClear?: () => void;
  right?: boolean;
};

const CustomInput = ({
  left,
  onClear,
  right,
  ...props
}: Props & ComponentProps<typeof TextInput>) => {
  return (
    <View style={styles.flexRow}>
      {left}
      <TextInput
        {...props}
        style={styles.inputContainer}
        placeholderTextColor="#ccc"
      />
      <View style={styles.icon}>
        {props?.value?.length !== 0 && right && (
          <TouchableOpacity onPress={onClear}>
            <Ionicons
              name="close-circle-sharp"
              size={RFValue(16)}
              color="#ccc"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  icon: {
    width: "5%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  inputContainer: {
    width: "70%",
    fontFamily: Fonts.SemiBold,
    fontSize: RFValue(12),
    paddingVertical: 12,
    paddingBottom: 15,
    height: "100%",
    color: Colors.text,
    bottom: -1,
  },
  text: {
    width: "10%",
    marginLeft: 10,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 0.5,
    width: "100%",
    marginVertical: 10,
    backgroundColor: "#fff",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowColor: Colors.border,
    borderColor: Colors.border,
  },
});
