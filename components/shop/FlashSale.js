import {View, FlatList} from 'react-native'
import HeaderProduct from '../HeaderProduct';
import FlashSaleItem from './FlashSaleItem';

export default function FlashSale({data}){
    return(
        <View>
            <HeaderProduct title='Flash Sale' subtitle='Lainnya &#62;' />
            <View>
                <FlatList
                    data={data}
                    keyExtractor={(item,index) => index}
                    renderItem={(item,index) => <FlashSaleItem item={item} />}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
            />
            </View>
        </View>
    )
}
