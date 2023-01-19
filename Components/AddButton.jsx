import { View, Button, StyleSheet } from 'react-native'
import React from 'react'

export default function AddButton (props) {
  return (
    <View style={{ margin: 5 }}>
      <Button
        title={props.content}
        onPress={props.onButtonPress}
        color={props.buttonColor}
      />
    </View>
  )
}

