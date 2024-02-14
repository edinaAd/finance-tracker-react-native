import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Dashboard from "../components/Dashboard/Dashboard";

const Stack = createNativeStackNavigator();


export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="dashboard" component={Dashboard}/>
    </Stack.Navigator>
  );
}