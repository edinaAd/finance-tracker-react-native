import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import { UserAuth } from "../context/AuthContext";
import MainStack from "./MainStack";

const Stack = createNativeStackNavigator();

function AppStack() {

	return (
		<Stack.Navigator initialRouteName="login"   screenOptions={{
			headerShown: true,
			headerTitle:'',
			headerTransparent: true
		}}>
			<Stack.Screen name="login" component={Login} />
			<Stack.Screen name="signUp" component={SignUp} />
			<Stack.Screen name="dashboard" component={Dashboard} />
		</Stack.Navigator>
	)
}

export default AppStack;