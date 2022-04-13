import { View, TextInput,StyleSheet,Dimensions } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import {useSelector} from 'react-redux'

import Colors from '../../constants/Colors'
import { TextLittle } from '../Font';
import ButtonOpacity from '../ButtonOpacity';

export default function HeaderHome({data,onRedirectCart,openDrawer}) {
  const totalCart = useSelector(state => Object.keys(state.carts.items).length)
    return (
      <View style={styles.headerBackground}>
        <View style={styles.header}>
          <View style={styles.containerSlider}>
            <View style={styles.containerHeader}>
              <View style={styles.containerHeaderFirst}>
                <TextInput placeholder='Cari Product' style={styles.headerSearch} />
              </View>   
              <View style={styles.containerHeaderSecond}>
                <View style={styles.containerHeaderIcon}>
                  <Ionicons name='mail-outline' size={24}  style={styles.headerIcon} />
                  <View style={styles.headerIconContainerText}>
                    <TextLittle styleProps={styles.headerIconText}>{data.mail > 99 ? '99+' : data.mail}</TextLittle>
                  </View>
                </View>
                <View style={styles.containerHeaderIcon}>
                  <Ionicons name='notifications-outline' size={24} style={styles.headerIcon} />
                  <View style={styles.headerIconContainerText}>
                    <TextLittle styleProps={styles.headerIconText}>{data.notif > 99 ? '99+' : data.notif}</TextLittle>
                  </View>
                </View>
                <View style={styles.containerHeaderIcon}>
                 <ButtonOpacity onPress={onRedirectCart}>
                  <Ionicons name='ios-cart-outline' size={24}  style={styles.headerIcon} />
                  <View style={styles.headerIconContainerText}>
                    <TextLittle styleProps={styles.headerIconText}>{totalCart > 99 ? '99+' : totalCart}</TextLittle>
                  </View>
                  </ButtonOpacity>
                </View>
                <View style={styles.containerHeaderIcon}>
                  <ButtonOpacity onPress={() => openDrawer()}>
                    <Ionicons name='menu-sharp' size={24}  style={styles.headerIcon}  />
                  </ButtonOpacity>
                </View>
              </View>
            </View>
          </View> 
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  headerBackground:{
      height:'100%',
      alignItems:'center',
      width:'200%',
      left:'-50%',
      backgroundColor:Colors.background
    },
    header:{
      backgroundColor:Colors.primary500,
      borderBottomLeftRadius:100,
      borderBottomRightRadius:100,
      alignItems:'center',
      height:'100%',
      width:'60%',
    },
    containerSlider:{
      backgroundColor:Colors.primary500,
      height:'88%',
      width:Dimensions.get('window').width,
      position:'relative',
    },
    containerHeader:{
      flexDirection:'row',
      marginTop:'10%',
      marginHorizontal:10
    },
    containerHeaderFirst:{
      flex:4,
      height:40
    },
    containerHeaderSecond:{
      flex:3,
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center'
    },
    containerHeaderIcon:{
      position:'relative'
    },
    headerIconContainerText:{
      position:'absolute',
      right:-9,
      top:-5,
      backgroundColor:Colors.danger700,
      paddingVertical:2,
      paddingHorizontal:4,
      borderRadius:5
    },
    headerIconText:{
      color:Colors.white,
      textAlign:'center'
    },
    headerIcon:{
      // height:40,
      color:Colors.white
    },
    headerSearch:{
      backgroundColor:Colors.white,
      width:'100%',
      height:'100%',
      padding:10,
      borderRadius:7,
      borderWidth:1,
    }
})
  