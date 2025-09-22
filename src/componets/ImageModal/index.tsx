import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import ImagePicker from 'react-native-image-crop-picker';
import { useTheme } from '../../theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

function ImageModal(props) {
  const { colors } = useTheme();
  const {
    modalVisibleImage,
    setModalVisibleImage,
    image,
    setImage,
    imageUri,
    setImageUri,
    cameraVisable,
    galleryVisable,
    documentVisable,
    videoVisable,
    onPress,
  } = props;

  const [fileType, setFileType] = useState("image");

  //////////////////// Camera Permission ////////////////////
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'This app needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        pic_camera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  //////////////////// Camera ////////////////////
  const pic_camera = () => {
    setFileType("image");
    ImagePicker.openCamera({
      cropping: true,
      compressImageQuality: 0.5,
    })
      .then(image => {
        setModalVisibleImage(false);
        setImageUri(image.path);
        let name = new Date().getTime() + '.png';
        setImage(name);
        onPress(name, image.path, "image");
      })
      .catch(() => setModalVisibleImage(false));
  };

  //////////////////// Gallery ////////////////////
  const pic_gallery = () => {
    setFileType("image");
    ImagePicker.openPicker({
      cropping: true,
      compressImageQuality: 0.5,
    })
      .then(image => {
        if (image.size / 1000 > 5120 || image.size / 1000 < 10) {
          Toast.show({
            type: 'error',
            text2: 'Please select an image between 10 KB and 5 MB',
          });
        } else {
          setModalVisibleImage(false);
          setImageUri(image.path);
          let name = new Date().getTime() + '.png';
          setImage(name);
          onPress(name, image.path, "image");
        }
      })
      .catch(() => setModalVisibleImage(false));
  };

  //////////////////// Video ////////////////////
  const handleVideoSelection = () => {
    setFileType("video");
    ImagePicker.openPicker({ mediaType: 'video' })
      .then(video => {
        setModalVisibleImage(false);
        setImageUri(video.path);
        let name = new Date().getTime() + '.mp4';
        setImage(name);
        onPress(name, video.path, "video");
      })
      .catch(() => setModalVisibleImage(false));
  };

  //////////////////// Document ////////////////////
  const handleDocumentSelection = async () => {
    setFileType("document");
    // try {
    //   const response = await DocumentPicker.pick({
    //     presentationStyle: 'pageSheet',
    //     type: [types.pdf, types.doc, types.docx, types.csv]
    //   });
    //   setModalVisibleImage(false);
    //   setImageUri(response[0].uri);
    //   let name = new Date().getTime() + '.pdf';
    //   setImage(name);
    //   onPress(name, response[0].uri, "document");
    // } catch (err) {
    //   console.warn(err);
    //   setModalVisibleImage(false);
    // }
  };

  return (
    <View style={[styles.container, ]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleImage}
        onRequestClose={() => setModalVisibleImage(false)}
      >
        <TouchableOpacity
          onPress={() => setModalVisibleImage(false)}
          style={styles.modalWrapper}
        >
          <View style={[styles.modalBox,{backgroundColor:colors.surface}]}>
            <View style={styles.optionRow}>
              {cameraVisable && (
                <TouchableOpacity
                  onPress={() =>
                    Platform.OS === 'android'
                      ? requestCameraPermission()
                      : pic_camera()
                  }>
                  <MaterialIcons name="camera" size={40} color={colors.text} />

                  <Text style={styles.optionText}>Camera</Text>
                </TouchableOpacity>
              )}

              {galleryVisable && (
                <TouchableOpacity onPress={pic_gallery}>
                  <MaterialIcons name="image" size={40} color={colors.text} />

                  <Text style={styles.optionText}>Gallery</Text>
                </TouchableOpacity>
              )}

              {documentVisable && (
                <TouchableOpacity onPress={handleDocumentSelection}>
                  <MaterialIcons name="arrow-forward" size={24} color={colors.background} />

                  <Text style={styles.optionText}>Document</Text>
                </TouchableOpacity>
              )}

              {videoVisable && (
                <TouchableOpacity onPress={handleVideoSelection}>
                  <MaterialIcons name="arrow-forward" size={24} color={colors.background} />

                  <Text style={styles.optionText}>Video</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

//////////////////// Styles ////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#00000090'
  },
  modalBox: {
    width: "90%", 
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 20,
  

  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: "100%",
    marginTop: 20,
  },
  optionIcon: {
    height: 40,
    width: 40,
    resizeMode: 'contain', 
    alignSelf: 'center',
  },
  optionText: { 
    textAlign: 'center',
    marginTop: 5,
  },
});

export default ImageModal;
