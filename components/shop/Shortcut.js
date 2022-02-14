import {FlatList} from 'react-native'
import ShortcutItem from './ShortcutItem'

export default function Shortcut({data}){
    return (
        <FlatList
            data={data}
            keyExtractor={(item,index) => index}
            renderItem={(item,index) => <ShortcutItem item={item} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />
    )
}