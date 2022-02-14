import { View,StyleSheet, Image } from "react-native";
import Colors from "../../constants/Colors";
import { Currency } from "../../utils/Number";
import { SubHeading, SubLabel } from "../Font";

export default function FlashSaleItem({item}){
    const widthSlider = (item.item.sale/item.item.stock*150)-2 > 0 ? (item.item.sale/item.item.stock*150)-2 : 0 
    return(
        <View style={styles.container}>
            <View style={styles.containerImage}>
                <Image source={{uri:item.item.imageUrl}} style={{width:'100%',height:'100%',borderRadius:8}} />
            </View>
            <View style={styles.containerDesc}>
                <View style={styles.containerTitle}>
                    <SubHeading styleProps={{color:Colors.primary500}}>{Currency(item.item.price,'rp')}</SubHeading>
                </View>
                <View style={styles.containerTitle}>
                    <View style={styles.containerSlide}>
                    <View style={{...styles.stok,width:widthSlider}}></View>
                    <View style={styles.containerSale}>
                        <SubLabel styleProps={{...styles.totalSale,color:Colors.white}}>{item.item.title} {item.item.sale} Terjual</SubLabel>
                    </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        marginBottom:20,
        height:250,
        width:150,
        marginHorizontal:10
    },
    containerImage:{
        height:200,
        width:'100%',
    },
    containerDesc:{
        paddingTop:10,
        alignItems:'center',
    },
    containerTitle:{
    },  
    containerSlide:{
        position:'relative',
        marginTop:5,
        width:150,
        borderWidth:1,
        borderRadius:5,
        borderColor:Colors.primary100,
        backgroundColor:Colors.gray
    },
    containerSale:{
        position:'absolute',
        top:-1,
        width:'100%'
    },
    totalSale:{
        textAlign:'center',
    },  
    stok:{
        backgroundColor:Colors.primary500,
        borderRadius:5,
        height:13,
    }
})