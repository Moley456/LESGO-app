import React from "react";
import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import BottomBar from "../components/BottomBar";

export default ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
    <ScrollView>
			<Text style={styles.header}>Welcome,{"\n"}Jane!</Text>
			<Text style={[styles.subHeader, { paddingTop: 50 }]}>Upcoming Events</Text>

			<View style={styles.boxAlign}>
				<TouchableOpacity style={styles.tab} onPress={() => {}}>
					<Text style={{ fontWeight: "bold" }}>Girl's Night</Text>
					<Text>1 June, 12.30pm</Text>
					<Text>Beach at Sentosa</Text>
				</TouchableOpacity>
				<Text style={styles.info}>@kate</Text>

				<TouchableOpacity style={styles.tab} onPress={() => {}}>
					<Text style={{ fontWeight: "bold" }}>ROLL OUT</Text>
					<Text>6 June, 10.30am</Text>
					<Text>Bowling at Kallang</Text>
				</TouchableOpacity>
				<Text style={styles.info}>@jane</Text>
			</View>

			<Text style={[styles.subHeader, { paddingTop: 50 }]}>Invitations</Text>

			<View style={styles.boxAlign}>
				<TouchableOpacity style={styles.tab} onPress={() => {}}>
					<Text style={{ fontWeight: "bold" }}>TGIF</Text>
					<Text>9 June, 6.30pm</Text>
					<Text>Movie at Serangoon NEX</Text>
				</TouchableOpacity>

				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<Text style={{ alignSelf: "flex-start", paddingLeft: 20 }}>Time remaining: 10 hours</Text>
					<Text style={styles.info}>@jim</Text>
				</View>
			</View>

			<BottomBar />
      </ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#5AA897",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
		paddingBottom: 30,
	},

	boxAlign: {
		alignSelf: "center",
	},

	header: {
		fontSize: 40,
		color: "#F8F5F1",
		fontFamily: "Montserrat_700Bold",
		paddingTop: 40,
		paddingLeft: 40,
	},

	subHeader: {
		fontSize: 24,
		color: "black",
		fontFamily: "Montserrat_700Bold",
		paddingLeft: 40,
	},

	tab: {
		backgroundColor: "#F8F5F1",
		fontFamily: "Roboto_900Black",
		alignItems: "center",
		justifyContent: "center",
		height: 100,
		width: 350,
		margin: 15,
		borderRadius: 20,
	},

	info: {
		alignSelf: "flex-end",
		paddingRight: 20,
	},
});
