import { StyleSheet, Text, View,Button } from 'react-native';
import * as Notification from 'expo-notifications'
import { useEffect } from 'react';

export default function OficialStoreScreen() {
  const trigerNotificationHandler = () => {
    Notification.scheduleNotificationAsync({
      content:{
        title:'notif',
        body:'Percobaan notifikasi ini. Muncl gak bro',
        data:{
          special:'martabak kacang'
        }
      },
      trigger:{
        seconds:5
      }
    })
  }
  useEffect(() => {
    const background = Notification.addNotificationResponseReceivedListener((res) => {
      console.log('res background')
      console.log(res)
    })

    const subscription = Notification.addNotificationReceivedListener(notif => {
      console.log('notif forground')
      console.log(notif)
    })
    return () => {
      subscription.remove()
    }
  },[])
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <Button title="notification" onPress={trigerNotificationHandler}/>
      </View>
    );
  }