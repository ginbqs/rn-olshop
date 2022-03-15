import {useState} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import CheckBox from "expo-checkbox";
import Card from '../Card';

const CartItem = ({data}) => {
  const [isSelected, setSelection] = useState(false);
  return(
        <Card stylesProps={{marginBottom:10,padding:10,flexDirection:'row'}}>
            <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
            />
            <View>
                <Text>asy</Text>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    checkbox: {
    //   alignSelf: "center",
    
    },
});
export default CartItem;