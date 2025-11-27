import React, { useState, useRef } from "react";
import { View, TextInput, Button, Text, Image } from "react-native";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [mensaje, setMensaje] = useState("");

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Necesitas permitir acceso a la cámara</Text>
        <Button title="Dar permiso" onPress={requestPermission} />
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync();
      setPhoto(result.uri);
    }
  };

  const registrar = () => {
    createUserWithEmailAndPassword(auth, email, pass)
      .then(() => setMensaje("Usuario creado"))
      .catch((e) => setMensaje(e.message));
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, pass)
      .then(() => setMensaje("Login exitoso"))
      .catch((e) => setMensaje(e.message));
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Cámara */}
      <View style={{ flex: 1 }}>
        {!photo ? (
          <>
            <CameraView ref={cameraRef} style={{ flex: 1 }} />
            <Button title="Tomar foto" onPress={takePhoto} />
          </>
        ) : (
          <>
            <Image source={{ uri: photo }} style={{ flex: 1 }} />
            <Button title="Tomar otra" onPress={() => setPhoto(null)} />
          </>
        )}
      </View>

      {/* Formulario */}
      <View style={{ marginTop: 40, padding: 20 }}>
        <TextInput
          placeholder="Email"
          onChangeText={setEmail}
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={setPass}
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        />

        <Button title="Registrar" onPress={registrar} />
        <Button title="Login" onPress={login} />

        <Text style={{ marginTop: 20 }}>{mensaje}</Text>
      </View>
    </View>
  );
}
