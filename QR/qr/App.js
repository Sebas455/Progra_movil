import { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity 
} from "react-native";

import { CameraView, useCameraPermissions } from "expo-camera";

import { auth } from "./firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";

export default function App() {
  const [screen, setScreen] = useState("login"); // login | register | scanner
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState("");

  // ------------------ AUTENTICACIÓN ------------------

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Usuario registrado");
      setScreen("login");
    } catch (e) {
      alert(e.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login exitoso");
      setScreen("scanner");
    } catch (e) {
      alert(e.message);
    }
  };



  if (!permission) return <View />;

  if (!permission.granted && screen === "scanner") {
    return (
      <View style={styles.permissionsContainer}>
        <Text style={styles.permissionText}>
          Necesitas dar permiso a la cámara.
        </Text>

        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Dar permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }



  if (screen === "login") {
    return (
      <View style={styles.authContainer}>
        <Text style={styles.title}>Iniciar sesión</Text>

        <TextInput 
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput 
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen("register")}>
          <Text style={styles.link}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
    );
  }


  if (screen === "register") {
    return (
      <View style={styles.authContainer}>
        <Text style={styles.title}>Registro</Text>

        <TextInput 
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput 
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen("login")}>
          <Text style={styles.link}>Ya tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    );
  }



  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={(result) => {
          if (!scanned) {
            setScanned(true);
            setQrData(JSON.stringify(result));
          }
        }}
      />

      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>Resultado:</Text>
        <Text style={styles.resultText}>{qrData || "Escanea un código"}</Text>

        {scanned && (
          <TouchableOpacity
            style={[styles.button, { marginTop: 15 }]}
            onPress={() => {
              setScanned(false);
              setQrData("");
            }}
          >
            <Text style={styles.buttonText}>Escanear de nuevo</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 2 },

  authContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
  },

  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#007AFF",
    fontSize: 16,
  },

  resultContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  resultText: { fontSize: 16, color: "#333" },

  permissionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  permissionText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});
