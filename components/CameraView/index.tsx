import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'

type OwnProps = {
onClose: Function
}
const CameraView = (props: OwnProps) => {
  const { onClose } = props

  const [type, setType] = React.useState(Camera.Constants.Type.back)

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row'
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.5,
              alignSelf: 'flex-end',
              alignItems: 'center'
            }}
            onPress={ () => onClose(true) }
          >
            <Text
              style={{
                fontSize: 22,
                marginBottom: 15,
                color: 'white'
              }}>
              Close
              </Text>
            </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center'
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )
            }}
          >
            <Text
              style={{
                fontSize: 22,
                marginBottom: 15,
                color: 'white'
              }}
            >
              {' '}
              Flip{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  )
}
export default CameraView
