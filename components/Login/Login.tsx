import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, StyleSheet, KeyboardAvoidingView } from "react-native";
import { UserAuth } from "../../context/AuthContext";
import { TextInput, Button, IconButton } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import InfoDialog from "../InfoDialog/InfoDialog";
import { MessageType } from "../../types/MessageType.enum";

function LoginScreen() {
	const { login, user } = UserAuth();
	const navigation: any = useNavigation();

	useEffect(() => {
		if (user) {
			navigation.navigate('dashboard');
		}
	}, [user]);

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [error, setError] = useState('');

	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleEmailChange = (text: string) => {
		setLoginEmail(text);
		setError('');
	};

	const handlePasswordChange = (text: string) => {
		setLoginPassword(text);
		setError('');
	};

	const handleLogin = async (e: any) => {
		e.preventDefault();
		setError('')
		try {
			if (!loginEmail || !loginPassword) {
				setError('Username and password are required');
				return;
			}

			const response: any = await login(loginEmail, loginPassword);

			if (response && response.data) {
				const authToken = response.data.idToken;
				AsyncStorage.setItem('authToken', authToken);
				navigation.navigate('dashboard');

			} else {
				setError('Response data is empty');
			}

		} catch (error: any) {
			if (error.code === "ERR_BAD_REQUEST") setError("Invalid username or password");
			else setError("Error: Request failed");
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			{error && <InfoDialog type={MessageType.ERROR} message={error} open={true} ></InfoDialog>}
			<KeyboardAvoidingView behavior="padding">
				<View style={styles.container}>
					<View >
						<Image
							source={require('../../images/welcome.jpg')}
							style={{ width: 200, height: 200 }}
						/>
					</View>
					<View>
						<Text style={styles.title}>Welcome to SpendWise</Text>
					</View>
					<View>
						<View style={styles.emailContainer}>
							<TextInput
								label="Email"
								value={loginEmail}
								onChangeText={handleEmailChange}
								style={styles.emailInput}
							/>
						</View>
						<View style={styles.inputContainer}>
							<TextInput
								label="Password"
								value={loginPassword}
								onChangeText={handlePasswordChange}
								secureTextEntry={!showPassword}
								style={styles.input}
							/>
							<IconButton
								icon={showPassword ? 'eye-off' : 'eye'}
								onPress={handleClickShowPassword}
								style={styles.iconButton}
							/>
						</View>
					</View>
					<View style={styles.buttonContainer}>
						<Button textColor="white" labelStyle={{ fontWeight: 'bold' }} style={styles.button} onPress={handleLogin}>
							LOG IN
						</Button>
					</View>
					<View style={styles.registerText}>
						<Text style={styles.newTo}>New to SpendWise? <Text style={styles.register} onPress={() => navigation.navigate('signUp')}>Sign Up</Text></Text>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10,
		backgroundColor: "white"
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		color: '#D94297'
	},
	buttonContainer: {
		flexDirection: 'row',
		width: '100%',
		marginBottom: 10,
		marginLeft: 60
	},
	button: {
		width: '80%',
		backgroundColor: '#D94297',
		borderRadius: 5,
		padding: 10,
		marginTop: 20,
		marginLeft: 7

	},
	register: {
		fontWeight: 'bold',
		color: '#D94297',
	},
	registerText: {
		marginLeft: -120,
	},
	newTo: {
		color: 'rgba(0, 0, 0, 0.4)'
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
	},
	emailContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: 20
	},
	input: {
		borderWidth: 1,
		borderColor: 'lightgray',
		backgroundColor: 'white',
		borderRadius: 5,
		width: '80%'
	},
	emailInput: {
		width: '80%',
		borderWidth: 1,
		borderColor: 'lightgray',
		backgroundColor: 'white',
		borderRadius: 5,
	},
	iconButton: {
		marginLeft: -50,
	},
});