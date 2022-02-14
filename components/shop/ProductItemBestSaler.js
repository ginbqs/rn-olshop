import { View,StyleSheet, Image } from "react-native";
import {Ionicons} from '@expo/vector-icons'
import Colors from "../../constants/Colors";
import { Label, SubHeading, SubLabel, Title, TextLittle } from "../Font";
import { Currency } from "../../utils/Number";

export default function ProductItemBestSaler({item}){
    const price = item.item.price - (item.item.price/100*item.item.discount)
    return(
        <View style={styles.container}>
            <View style={styles.containerImage}>
                <Image source={{uri:item.item.imageUrl}} style={{width:'100%',height:'100%',borderTopLeftRadius:8,borderTopRightRadius:8}} />
            </View>
            <View style={styles.containerDesc}>
                <View style={styles.containerTitle}>
                    <View style={styles.containerCategory}><SubLabel>#{item.index+1}</SubLabel></View>
                </View>
                <View style={styles.containerTitle}>
                    <Title>{item.item.title}</Title>
                </View>
                <View style={styles.containerTitle}>
                    <SubHeading styleProps={{marginTop:5}}>{Currency(price,'rp')}</SubHeading>
                </View>
                <View style={styles.containerTitle}>
                    <View style={styles.containerDiscount}>
                        <TextLittle styleProps={styles.discount}>{item.item.discount}%</TextLittle>
                    </View>
                    <View  style={styles.containerOriginPrice}>
                        <TextLittle styleProps={styles.price}>{Currency(item.item.price,'rp')}</TextLittle>
                    </View>
                </View>
                <View style={styles.containerTitle}>
                    <View style={{marginTop:3}}>
                        <Ionicons name="map-outline" color={Colors.info500}  />
                    </View>
                    <View  style={{marginLeft:5}}>
                        <Label> {item.item.address}</Label>
                    </View>
                </View>
                <View style={styles.containerTitle}>
                    <View style={{marginTop:3}}>
                        <Ionicons name="star" color='orange' />
                    </View>
                    <View  style={{marginLeft:5,marginTop:3}}>
                        <Label> {item.item.rating}</Label>
                    </View>
                    <View  style={{marginLeft:15,marginTop:3}}>
                        <Label>Terjual {item.item.sale}</Label>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        marginBottom:20,
        height:350,
        width:150,
        marginHorizontal:10,
    },
    containerImage:{
        height:150,
        width:'100%',
    },
    containerDesc:{
        paddingTop:10,
    },
    containerTitle:{
        flexDirection:'row'
    },  
    containerCategory:{
        backgroundColor:Colors.gray,
        borderTopRightRadius:8,
        borderBottomRightRadius:8,
        paddingVertical:3,
        paddingHorizontal:5,
        marginVertical:3
    },
    containerDiscount:{
        backgroundColor:Colors.danger100,
        padding:3,
        borderRadius:3,
        marginVertical:5
    },
    discount:{
        color:Colors.danger700
    },
    containerOriginPrice:{
        
    },
    price:{
        color:Colors.black,
        marginVertical:5,
        paddingHorizontal:10,
        paddingVertical:2,
        textDecorationLine: 'line-through', 
        textDecorationStyle: 'solid'
    }
    
})