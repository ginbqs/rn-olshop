import {View,StyleSheet, Image} from 'react-native'

export default function BannerItem({item}){
    return (
        <View style={styles.containerIcon}>
            <Image source={{uri: item.item.imageUrl}}   style={{width: '100%', height: '100%',borderRadius:7}} />
        </View>
    )
}

const styles = StyleSheet.create({
    containerIcon:{
        backgroundColor:'white',
        height:150,
        width:300,
        marginTop:20,
        marginHorizontal:15,
        justifyContent:'center',
        alignItems:'center'
    }
})