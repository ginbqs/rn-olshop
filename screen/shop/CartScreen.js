import {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {useSelector} from 'react-redux'
import Checkbox from 'expo-checkbox';
import { Heading, Label,Title } from '../../components/Font';
import Colors from '../../constants/Colors';

export default function CartScreen() {
  const [isSelected, setSelection] = useState(false);

  
  const selectedCart = useSelector(state => state.carts)
  return (
    <View style={styles.container}>
      <View style={styles.choice}>
      <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Title>Pilih</Title>
        <Label>Pilih</Label>
      </View>
      <Text>Open up CartScreen.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkbox: {
    alignSelf: "center",
  },
  choice:{
    padding:10,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:Colors.background
  }
});
