import Navigation from "./src/navigation";
import { useFonts } from "expo-font";

type Props = {};

const App = (props: Props) => {
  const [fontsLoaded] = useFonts({
    Regular: require("./src/assets/fonts/Okra-Regular.ttf"),
    Medium: require("./src/assets/fonts/Okra-Medium.ttf"),
    MediumLight: require("./src/assets/fonts/Okra-MediumLight.ttf"),
    Bold: require("./src/assets/fonts/Okra-Bold.ttf"),
    ExtraBold: require("./src/assets/fonts/Okra-ExtraBold.ttf"),
  });

  if (!fontsLoaded) return null;

  return <Navigation />;
};

export default App;
