import { StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Colors, Fonts } from "../../utils/constants";
import CustomText from "./custom-text";

type Props = {
  onPress: () => void;
  title: string;
  loading: boolean;
  disabled: boolean;
};

const CustomButton = ({ disabled, loading, onPress, title }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.btn,
        {
          backgroundColor: disabled ? Colors.disabled : Colors.secondary,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <CustomText
          variant="h6"
          fontFamily={Fonts.SemiBold}
          style={styles.text}
        >
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    marginVertical: 15,
    width: "100%",
  },
  text: {
    color: "#fff",
  },
});
