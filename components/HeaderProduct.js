import {View,StyleSheet} from 'react-native'
import { Heading, Title } from './Font';
import Colors from '../constants/Colors';

export default function HeaderProduct({title,subtitle}){
    return(
        <View style={styles.containerTitle}>
            <Heading>{title}</Heading>
            <Title styleProps={styles.detail}>{subtitle}</Title>
        </View>
    )
}

const styles = StyleSheet.create({
    containerTitle:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:20,
        marginBottom:10,
        marginHorizontal:13
    },
    detail:{
        color:Colors.primary500,
        paddingTop:3,
    }
})
