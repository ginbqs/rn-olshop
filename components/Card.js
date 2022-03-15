import { View,StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export default function Card({children,stylesProps}){
    return (
        <View style={{...styles.card,...stylesProps}}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        backgroundColor:Colors.background,
    }
})