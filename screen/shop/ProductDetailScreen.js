import { StyleSheet, View, Image, TouchableWithoutFeedback,Animated, Easing } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import {useSelector,useDispatch} from 'react-redux'
import {addToCart} from '../../store/actions/cart'

import { Heading, Label, Title,TextLittle, SubLabel } from '../../components/Font';
import { Currency } from '../../utils/Number';
import Colors from '../../constants/Colors';
import ButtonOpacity from '../../components/ButtonOpacity';
import Card from '../../components/Card';

export default function ProductDetailScreen({ route, navigation }) {
  const { prodId } = route.params;
  const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === prodId))
  const selectedOwner = useSelector(state => state.owners.owners.find(own => own.id == selectedProduct.ownerId))
  const price = selectedProduct.price - (selectedProduct.price/100*selectedProduct.discount)
  console.log(selectedProduct)
  const dispatch = useDispatch();
  const animatedButtonScale = new Animated.Value(1);

  // When button is pressed in, animate the scale to 1.5
  const onPressIn = () => {
      Animated.spring(animatedButtonScale, {
          toValue: 1.5,
          useNativeDriver: true,
      }).start();
  };

  // When button is pressed out, animate the scale back to 1
  const onPressOut = () => {
      Animated.spring(animatedButtonScale, {
          toValue: 1,
          useNativeDriver: true,
      }).start();
  };

  // The animated style for scaling the button within the Animated.View
  const animatedScaleStyle = {
      transform: [{scale: animatedButtonScale}]
  };

  return (
    <View style={styles.container}>
      <View style={styles.slideShow}>
        <Image source={{uri:selectedProduct.imageUrl}} style={{width:'100%',height:'100%'}} />
      </View>
      <Card>
        <View style={styles.containerPrice}>
          <View style={styles.price}>
            <Heading styleProps={{fontSize:25}}>{Currency(price,'rp')}</Heading>
            {
                selectedProduct.freeShipping && (
                    <View style={styles.containerButton}>
                        <ButtonOpacity><Image source={{uri:'https://freepikpsd.com/file/2019/10/gratis-ongkir-png-5-Transparent-Images.png'}} style={{height:31,width:31}} /></ButtonOpacity>
                    </View>
                )
            }
          </View>
          {/* <ButtonOpacity onPress={() =>{
            dispatch(addToCart(selectedProduct))
          }}><Ionicons name='ios-cart-outline' size={30} color={Colors.primary500} /></ButtonOpacity> */}
          <TouchableWithoutFeedback
            onPress={() =>{
              dispatch(addToCart(selectedProduct))
            }}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
          >
              <Animated.View style={[styles.iconContainer, animatedScaleStyle]}>
              <Ionicons name='ios-cart-outline' size={30} color={Colors.primary500} />
              </Animated.View>
          </TouchableWithoutFeedback>
        </View>  
        <View style={styles.containerTitle}>
            <View style={styles.containerDiscount}>
                <TextLittle styleProps={styles.discount}>{selectedProduct.discount}%</TextLittle>
            </View>
            <View  style={styles.containerOriginPrice}>
                <TextLittle styleProps={styles.priceOrigin}>{Currency(selectedProduct.price,'rp')}</TextLittle>
            </View>
        </View>
        <View style={styles.containerMargin}>
          <Label>{selectedProduct.title}</Label>
          <SubLabel styleProps={{marginTop:5}}>Sisa stok {selectedProduct.stock}</SubLabel>
        </View>
      </Card>
      <Card stylesProps={{marginTop:10,paddingHorizontal:10,paddingVertical:10}}>
        <View style={styles.containerOwner}>
          <View>
            <View style={{}}><Image source={{uri:selectedOwner.ownerLogo}} style={{width:50,height:50,borderRadius:50}} /></View>
          </View>
          <View style={{paddingLeft:20}}>
            <Title styleProps={{paddingTop:10}}>{selectedOwner.ownerName}</Title>
            <SubLabel>Online {selectedOwner.lastLogin} | {selectedOwner.address}</SubLabel>
          </View>
        </View>
        <View style={{...styles.containerOwner,justifyContent:'space-between',paddingTop:10}}>
          <View>
            <View style={styles.containerOwner}>
              <Ionicons name='star-outline' />
              <Label styleProps={{paddingLeft:10}}>{selectedOwner.rating}</Label> 
              <SubLabel> rating toko</SubLabel> 
            </View>
            <View style={styles.containerOwner}>
              <Ionicons name='time-outline' />
              <Label styleProps={{paddingLeft:10}}>{selectedOwner.orderProcess} Jam</Label> 
              <SubLabel> pesanan diproses</SubLabel> 
            </View>
          </View>
          <View>
            <ButtonOpacity outline variant='primary'><Label styleProps={{color:Colors.primary600}}>Follow</Label></ButtonOpacity>
          </View>
        </View>
      </Card>
      <Card stylesProps={{marginTop:10,paddingHorizontal:10,paddingVertical:10}}>
        <Title>Detail Produk</Title>
        <View style={{borderColor:Colors.gray,borderBottomWidth:1,paddingBottom:5,paddingTop:10}}>
          <Label>Kondisi : {selectedProduct.description.condition}</Label>
        </View>
        <View style={{borderColor:Colors.gray,borderBottomWidth:1,paddingBottom:5,paddingTop:10}}>
          <Label>Etalase : {selectedProduct.description.group}</Label>
        </View>
        <View style={{borderColor:Colors.gray,borderBottomWidth:1,paddingBottom:5,paddingTop:10}}>
          <Label>Minimal Pesan : {selectedProduct.description.minOrder}</Label>
        </View>
        <View style={{paddingBottom:5,paddingTop:10}}>
          <Label>{selectedProduct.description.detail}</Label>
        </View>
      </Card>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideShow:{
    width:'100%',
    height:300
  },
  containerMargin:{
    marginHorizontal:10,
  },
  productDetail:{
    backgroundColor:Colors.background,
  },
  containerPrice:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical:5,
    paddingHorizontal:10,
  },
  price:{
    flexDirection:'row',
  },
  containerButton:{
    marginLeft:10
  },
  containerTitle:{
      marginHorizontal:10,
      flexDirection:'row'
  },
  containerDiscount:{
    backgroundColor:Colors.danger100,
    padding:3,
    borderRadius:3,
    marginVertical:5
  },
  containerOriginPrice:{
      
  },
  priceOrigin:{
      color:Colors.black,
      marginVertical:5,
      paddingHorizontal:10,
      paddingVertical:2,
      textDecorationLine: 'line-through', 
      textDecorationStyle: 'solid'
  },
  containerOwner:{
   flexDirection:'row',
  },
  iconContainer: {
    
  },
});
