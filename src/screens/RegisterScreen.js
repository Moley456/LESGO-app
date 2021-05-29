import React, { useState, useRef } from "react";
import { SafeAreaView, StyleSheet, Text, View, StatusBar, Button, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { useFonts, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { Roboto_900Black } from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";

export default ({ navigation }) => {
	const [user, setUser] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const passwordTextInput = useRef();
	const emailTextInput = useRef();

	let [fontsLoaded] = useFonts({
		Montserrat_700Bold,
		Roboto_900Black,
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.logo}>LESGO!</Text>
			<View style={styles.toggleContainer}>
				<Text style={styles.toggle} onPress={() => navigation.navigate("Login")}>
					Sign in
				</Text>
				<Text style={styles.toggle}>|</Text>
				<Text style={[styles.toggle, { fontWeight: "bold" }]} onPress={() => navigation.navigate("Register")}>
					Sign up
				</Text>
			</View>

			<TextInput
				style={styles.input}
				label="Username"
				theme={{ colors: { primary: "black" } }}
				onChangeText={setUser}
				returnKeyType="next"
				value={user}
				onSubmitEditing={() => emailTextInput.current.focus()}
				left={<TextInput.Icon name="account" color={"#5AA897"} />}
			/>

			<TextInput
				ref={emailTextInput}
				style={styles.input}
				label="Email"
				theme={{ colors: { primary: "black" } }}
				onChangeText={setEmail}
				returnKeyType="next"
				value={email}
				onSubmitEditing={() => passwordTextInput.current.focus()}
				left={<TextInput.Icon name="at" color={"#5AA897"} />}
			/>

			<TextInput
				ref={passwordTextInput}
				style={styles.input}
				label="Password"
				theme={{ colors: { primary: "black" } }}
				onChangeText={setPassword}
				secureTextEntry={!isPasswordVisible}
				left={<TextInput.Icon name="form-textbox-password" color={"#5AA897"} />}
				right={<TextInput.Icon name={isPasswordVisible ? "eye-off" : "eye"} onPress={() => setIsPasswordVisible((state) => !state)} />}
			/>

			<TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate("Home")}>
				<Text style={styles.submitText}>NEXT</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#5AA897",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
		paddingBottom: 30,
	},

	logo: {
		fontSize: 72,
		color: "black",
		fontFamily: "Montserrat_700Bold",
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 10,
	},

	toggleContainer: {
		flexDirection: "row",
	},

	toggle: {
		color: "#fff",
		fontSize: 15,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
	},

	misc: {
		flexDirection: "row",
		justifyContent: "flex-end",
		width: 365,
		marginTop: 10,
	},

	forgotPW: {
		textDecorationLine: "underline",
		color: "white",
	},

	input: {
		height: 52,
		width: 365,
		backgroundColor: "white",
		marginTop: 20,
		fontSize: 15,
	},

	submitButton: {
		backgroundColor: "black",
		width: 365,
		paddingVertical: 15,
		borderRadius: 15,
		marginTop: 30,
	},

	submitText: {
		fontFamily: "Roboto_900Black",
		color: "white",
		textAlign: "center",
	},
});
