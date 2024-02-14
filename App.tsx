import {NavigationContainer} from "@react-navigation/native";
import { AuthContextProvider } from "./context/AuthContext";
import AppStack from "./navigation/AppStack";

export default function App() {

  return (
    <NavigationContainer >
      <AuthContextProvider>
        <AppStack />
      </AuthContextProvider>
    </NavigationContainer>
  );
}

