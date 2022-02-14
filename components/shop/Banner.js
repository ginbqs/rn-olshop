import {FlatList} from 'react-native'
import BannerItem from './BannerItem'

export default function Banner({data}){
    return (
        <FlatList
            data={data}
            keyExtractor={(item,index) => index}
            renderItem={(item,index) => <BannerItem item={item} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />
    )
}