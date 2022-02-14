import { View,StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export default function Card({children}){
    return (
        <View style={styles.card}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        backgroundColor:Colors.background,
        marginBottom:10
    }
})