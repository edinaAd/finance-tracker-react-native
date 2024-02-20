import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, Image, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Button, IconButton, TextInput } from 'react-native-paper';
import { UserAuth } from '../../context/AuthContext';
import { MessageType } from '../../types/MessageType.enum';
import InfoDialog from '../InfoDialog/InfoDialog';

const SignUp = () => {
	const { createUser } = UserAuth();
	const navigation: any = useNavigation();

	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState('');
	const [name, setName] = useState("");
	const [error, setError] = useState('');
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleNameChange = (text: string) => {
		setName(text);
		setError('');
	};

	const handleEmailChange = (text: string) => {
		setRegisterEmail(text);
		setError('');
	};

	const handlePasswordChange = (text: string) => {
		setRegisterPassword(text);
		setError('');
	};

	const handleConfirmPasswordChange = (text: string) => {
		setConfirmPassword(text);
		setError('');
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setError('');
		try {
			if (!name || !registerEmail || !registerPassword || !confirmPassword) {
				setError('All fields are required!');
				return;
			}

			if (registerPassword.length < 6) {
				setError('Password cannot be less than 6 characters');
				return;
			}

			if (registerPassword !== confirmPassword) {
				setError('Passwords do not match');
				return;
			}

			await createUser(registerEmail, registerPassword, name);
			setName('');
			setRegisterEmail('');
			setRegisterPassword('');
			setConfirmPassword('');
			setShowSuccessMessage(true);

		} catch (error: any) {
			if (error.code === "ERR_BAD_REQUEST") setError("Invalid username or password");
			else setError("Error: Request failed");
		}
	};


	useEffect(() => {
		if (showSuccessMessage) {
			setTimeout(() => {
				setShowSuccessMessage(false);
			}, 3000);
		}
	}, [showSuccessMessage]);

	return (
		<SafeAreaView style={styles.container}>
			{error && <InfoDialog type={MessageType.ERROR} message={error} open={true} ></InfoDialog>}
			{showSuccessMessage && <InfoDialog type={MessageType.SUCCESS} message="User created successfully!" open={true} />}
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
								label="Name"
								value={name}
								onChangeText={handleNameChange}
								style={styles.emailInput}
							/>
						</View>
						<View style={styles.emailContainer}>
							<TextInput
								label="Email"
								value={registerEmail}
								onChangeText={handleEmailChange}
								style={styles.emailInput}
							/>
						</View>
						<View style={styles.inputContainer}>
							<TextInput
								label="Password"
								value={registerPassword}
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
						<View style={styles.confirmPassword}>
							<TextInput
								label="Confirm Password"
								value={confirmPassword}
								onChangeText={handleConfirmPasswordChange}
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
						<Button textColor="white" labelStyle={{ fontWeight: 'bold' }} style={styles.button} onPress={handleSubmit}>
							SIGN UP
						</Button>
					</View>
					<View style={styles.registerText}>
						<Text style={styles.newTo}>Go To <Text style={styles.register} onPress={() => navigation.navigate('login')}>Login</Text></Text>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

export default SignUp

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
		marginLeft: -215,
	},
	newTo: {
		color: 'rgba(0, 0, 0, 0.4)'
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		paddingBottom: 20

	},
	confirmPassword: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		paddingBottom: 0
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