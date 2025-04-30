import { View, Text } from "react-native";

type Props = {
  showNotice: () => void;
};

const Header = (props: Props) => {
  return (
    <View>
      <Text>Header</Text>
    </View>
  );
};

export default Header;
