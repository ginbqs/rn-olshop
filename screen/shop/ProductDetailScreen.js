import { StyleSheet, View, Image, Button } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import {useSelector,useDispatch} from 'react-redux'
import {addToCart} from '../../store/actions/cart'

import { Heading, Label, SubHeading, Title,TextLittle, SubLabel } from '../../components/Font';
import { Currency } from '../../utils/Number';
import Colors from '../../constants/Colors';
import ButtonOpacity from '../../components/ButtonOpacity';

export default function ProductDetailScreen({ route, navigation }) {
  const { prodId } = route.params;
  const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === prodId))
  const price = selectedProduct.price - (selectedProduct.price/100*selectedProduct.discount)
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.slideShow}>
        <Image source={{uri:selectedProduct.imageUrl}} style={{width:'100%',height:'100%'}} />
      </View>
      <View style={styles.containerPrice}>
        <View style={styles.price}>
          <Heading styleProps={{fontSize:25}}>{Currency(price,'rp')}</Heading>
          {
              selectedProduct.ongkir === 1 && (
                  <View style={styles.containerButton}>
                      <ButtonOpacity><Image source={{uri:'https://freepikpsd.com/file/2019/10/gratis-ongkir-png-5-Transparent-Images.png'}} style={{height:31,width:31}} /></ButtonOpacity>
                  </View>
              )
          }
        </View>
        <ButtonOpacity onPress={() =>{
          dispatch(addToCart(selectedProduct))
        } }><Ionicons name='ios-cart-outline' size={30} color={Colors.primary500} /></ButtonOpacity>
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
      <View style={styles.containerMargin}>
        <Title styleProps={{marginTop:25}}>Detail Produk</Title>
        <Label styleProps={{marginTop:5}}>{selectedProduct.description}</Label>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slideShow:{
    width:'100%',
    height:300
  },
  containerMargin:{
    marginHorizontal:10,
  },
  containerPrice:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical:5,
    marginHorizontal:10
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
  }
});
