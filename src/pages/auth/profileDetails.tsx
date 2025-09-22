import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import AppTextInput from '../../componets/textInput';
import AppButton from '../../componets/appButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAppNavigation } from '../../utils/functions';
import { useNavigation } from '@react-navigation/native';
import ImageModal from '../../componets/ImageModal'; // ✅ modal
import Header from '../../componets/header';

const ProfileDetails = () => {
  const navigation = useNavigation();
  const { goToMainApp } = useAppNavigation();

  const [aadhaar, setAadhaar] = useState('');
  const [aadhaarFront, setAadhaarFront] = useState<string | null>(null);
  const [aadhaarBack, setAadhaarBack] = useState<string | null>(null);

  const [pan, setPan] = useState('');
  const [panImg, setPanImg] = useState<string | null>(null);

  const [bankName, setBankName] = useState('');
  const [account, setAccount] = useState('');
  const [ifsc, setIfsc] = useState('');

  // 🔹 Modal state
  const [modalVisibleImage, setModalVisibleImage] = useState(false);
  const [uploadType, setUploadType] = useState<"aadhaarFront" | "aadhaarBack" | "pan" | null>(null);

  // 🔹 Handle selected file from modal
  const handleFileSelect = (name: string, uri: string, type: string) => {
    if (uploadType === "aadhaarFront") {
      setAadhaarFront(uri);
    } else if (uploadType === "aadhaarBack") {
      setAadhaarBack(uri);
    } else if (uploadType === "pan") {
      setPanImg(uri);
    }
  };

  return (
    <>
    <Header
    title={'Profile Details'}
    onBack={()=>navigation.goBack()}
    />
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {/* Aadhaar Card */}
          <View style={styles.card}>
            <Text style={styles.title}>Aadhaar Card</Text>
            <AppTextInput
              value={aadhaar}
              onChangeText={setAadhaar}
              placeholder="Enter Aadhaar Number"
              keyboardType="numeric"
            />

            {/* Aadhaar Front Upload */}
            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={() => {
                setUploadType("aadhaarFront");
                setModalVisibleImage(true);
              }}
            >
              <MaterialIcons name="upload-file" size={20} color="#388e3c" />
              <Text style={styles.uploadText}> Upload Aadhaar Front Image</Text>
            </TouchableOpacity>
            {aadhaarFront && <Image source={{ uri: aadhaarFront }} style={styles.preview} />}

            {/* Aadhaar Back Upload */}
            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={() => {
                setUploadType("aadhaarBack");
                setModalVisibleImage(true);
              }}
            >
              <MaterialIcons name="upload-file" size={20} color="#388e3c" />
              <Text style={styles.uploadText}> Upload Aadhaar Back Image</Text>
            </TouchableOpacity>
            {aadhaarBack && <Image source={{ uri: aadhaarBack }} style={styles.preview} />}
          </View>

          {/* PAN Card */}
          <View style={styles.card}>
            <Text style={styles.title}>PAN Card</Text>
            <AppTextInput
              value={pan}
              onChangeText={setPan}
              placeholder="Enter PAN Number"
              autoCapitalize="characters"
            />
            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={() => {
                setUploadType("pan");
                setModalVisibleImage(true);
              }}
            >
              <MaterialIcons name="upload-file" size={20} color="#388e3c" />
              <Text style={styles.uploadText}> Upload PAN Image</Text>
            </TouchableOpacity>
            {panImg && <Image source={{ uri: panImg }} style={styles.preview} />}
          </View>

          {/* Bank Details */}
          <View style={styles.card}>
            <Text style={styles.title}>Bank Details</Text>
            <AppTextInput
              value={bankName}
              onChangeText={setBankName}
              placeholder="Bank Name"
            />
            <AppTextInput
              value={account}
              onChangeText={setAccount}
              placeholder="Account Number"
              keyboardType="numeric"
            />
            <AppTextInput
              value={ifsc}
              onChangeText={setIfsc}
              placeholder="IFSC Code"
              autoCapitalize="characters"
            />
          </View>

          <AppButton label="Save Details" onPress={() => goToMainApp()} />
        </View>
      </ScrollView>

      {/* 🔹 Image Upload Modal */}
      <ImageModal
        modalVisibleImage={modalVisibleImage}
        setModalVisibleImage={setModalVisibleImage}
        image={""}
        setImage={() => {}}
        imageUri={""}
        setImageUri={() => {}}
        cameraVisable={true}
        galleryVisable={true}
        documentVisable={false}
        videoVisable={false}
        onPress={handleFileSelect}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  card: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 12 },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
  },
  uploadText: { fontSize: 15, color: '#388e3c', marginLeft: 6 },
  preview: { width: '100%', height: 120, marginTop: 10, borderRadius: 8 },
});

export default ProfileDetails;
