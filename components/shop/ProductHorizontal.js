import {View,StyleSheet, FlatList} from 'react-native'
import ProductItemBestSaler from './ProductItemBestSaler';
import HeaderProduct from '../HeaderProduct';

export default function ProductHorizontal({data,owners,navigation}){
    return(
        <View styles={styles.container}>
            <HeaderProduct title='Produk Terbaik' subtitle='Lainnya &#62;' />
            <View style={styles.containerMain}>
                <FlatList
                    data={data}
                    keyExtractor={(item,index) => index}
                    renderItem={(item,index) => <ProductItemBestSaler item={item} owners={owners} onViewDetail={() =>{
                        navigation.navigate('ProductDetailScreen',{
                          prodId : item.item.id
                        })
                    }}
                    />}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    containerMain:{
        marginTop:10,
        marginBottom:20,
        marginHorizontal:10
    },
})