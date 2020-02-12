import React from 'react'
import { Text, View, Button, Linking } from 'react-native'
import { WebView } from 'react-native-webview'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import CameraView from './components/CameraView'

// PLEASE CHANGE ME to your ip
const URI = 'http:192.168.100.11:3000'
export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = React.useState(null)
  const [isCameraClosed, setIsCameraClosed] = React.useState(true)
  const webViewRef = React.useRef()

  React.useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasCameraPermission(status === 'granted')
    })()
  }, [])
  const toBeInjected = uri => `
        setTimeout(() => {
          var im = document.getElementById("pictureSource");
          im.src='${uri}'
         }, 500)
        `

  const performAction = async action => {
    if (action === 'OPEN_CAMERA') {
      setIsCameraClosed(false)
    } else if (action === 'MAKE_A_CALL') {
      const number = '695468927'
      Linking.openURL(`tel:${number.replace(/ /g, '')}`)
    } else if (action === 'OPEN_GALLERY') {
      const {
        status: cameraRollStatus
      } = await ImagePicker.requestCameraRollPermissionsAsync()

      if (!cameraRollStatus) {
        alert('No tienes permiso para acceder a la galería')
      }
      const response = await ImagePicker.launchImageLibraryAsync({
        base64: true
      })

      // You can also display the image using data:
      const source = `data:image/jpg;base64,${response.base64}`
      // Source contains the selected image from ImagePicker. This is also encoded.
      // This image should use some external service in order to be uploaded. The uri obtained afterwards will be sent to webview through injectJavaScript

      webViewRef.current.injectJavaScript(toBeInjected(source))

    }
  }

  if (hasCameraPermission === null) {
    return <View />
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>
  }
  return (
    <View style={{ flex: 1 }}>
      {isCameraClosed ? (
        <WebView
          ref={webViewRef}
          style={{ marginTop: 24 }}
          source={{ uri: URI }}
          originWhitelist={['*']}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          geolocationEnabled={true}
          onMessage={event => {
            performAction(event.nativeEvent.data)
          }}
        />
      ) : (
        <CameraView onClose={setIsCameraClosed} />
      )}
    </View>
  )
}
