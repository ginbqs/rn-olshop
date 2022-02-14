import {Text,StyleSheet} from 'react-native'

function Heading({children,styleProps}){
    return <Text style={{...styles.heading,...styleProps}}>{children}</Text>
}
function SubHeading({children,styleProps}){
    return <Text style={{...styles.subheading,...styleProps}}>{children}</Text>
}
function Title({children,styleProps}){
  return <Text style={{...styles.title,...styleProps}}>{children}</Text>
}
function Label({children,styleProps}){
    return <Text style={{...styles.label,...styleProps}}>{children}</Text>
}
function SubLabel({children,styleProps}){
  return <Text style={{...styles.sublabel,...styleProps}}>{children}</Text>
}
function TextLittle({children,styleProps}){
  return <Text style={{...styles.textlittle,...styleProps}}>{children}</Text>
}

export {
    Heading,
    SubHeading,
    Title,
    Label,
    SubLabel,
    TextLittle
}

const styles = StyleSheet.create({
  heading:{
    fontSize:20,
    fontWeight:'bold'
  },
  subheading:{
    fontSize:18,
    fontWeight:'bold'
  },
  title:{
    fontSize:16,
    fontWeight:'bold'
  },
  label:{
      fontSize:14
  },
  sublabel:{
    fontSize:12
  },
  textlittle:{
    fontSize:9
  }
})