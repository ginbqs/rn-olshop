import {View,StyleSheet,Image} from 'react-native'
import { Label } from '../Font'
export default function ShortcutItem({item}){
    return (
        <View style={styles.containerIcon}>
            <View style={styles.icon}>
                <Image source={{uri:item.item.imageUrl}} style={{width:'100%',height:'100%'}} />
            </View>
            <View style={styles.text}>
                <Label style={{textAlign:'center'}}>{item.item.title}</Label>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    containerIcon:{
        height:100,
        width:80,
        marginTop:20,
        marginHorizontal:15,
    },
    icon:{
        padding:10,
        height:65,
        width:65,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:7,
    },
    text:{
       width:'100%',
    }
})