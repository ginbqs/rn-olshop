import { View,StyleSheet, Image } from "react-native";
import Colors from "../../constants/Colors";
import { Currency } from "../../utils/Number";
import ButtonOpacity from "../ButtonOpacity";
import { SubHeading, SubLabel } from "../Font";

export default function FlashSaleItem({item,onViewDetail}){
    const widthSlider = (item.item.sold/item.item.stock*150)-2 > 0 ? (item.item.sold/item.item.stock*150)-2 : 0 
    return(
        <View style={styles.container}>
        <ButtonOpacity onPress={onViewDetail}>
            <View style={styles.flashItem}>
                <View style={styles.containerImage}>
                    <Image source={{uri:item.item.imageUrl}} style={{width:'100%',height:'100%',borderTopLeftRadius:8,borderTopRightRadius:8}} />
                </View>
                <View style={styles.containerDesc}>
                    <View style={styles.containerTitle}>
                        <SubHeading styleProps={{color:Colors.primary500}}>{Currency(item.item.price,'rp')}</SubHeading>
                    </View>
                    <View style={styles.containerTitle}>
                        <View style={styles.containerSlide}>
                        <View style={{...styles.stok,width:widthSlider}}></View>
                        <View style={styles.containerSale}>
                            <SubLabel styleProps={{...styles.totalSale,color:Colors.white}}>{item.item.title} {item.item.sold} Terjual</SubLabel>
                        </View>
                        </View>
                    </View>
                </View>
            </View>
        </ButtonOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        marginBottom:20,
        borderRadius:5,
        marginHorizontal:10,
        backgroundColor:Colors.background,
        shadowColor:Colors.black,
        shadowOffset:{width:0,height:10},
        shadowRadius:10,
        elevation:5,
    },
    flashItem:{
        height:260,
        width:170,
    },
    containerImage:{
        height:200,
        width:'100%',
    },
    containerDesc:{
        paddingTop:5,
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