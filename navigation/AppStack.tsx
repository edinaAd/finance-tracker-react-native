import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import MainView from "../components/MainView/MainView";

const Stack = createNativeStackNavigator();

function AppStack() {
	return (
		<Stack.Navigator initialRouteName="login" screenOptions={{
			headerShown: false,
			headerTitle: '',
			headerTransparent: true
		}}>
			<Stack.Screen name="login" component={Login} />
			<Stack.Screen name="signUp" component={SignUp} />
			<Stack.Screen name="dashboard" component={MainView} />
		</Stack.Navigator>
	)
}

export default AppStack;