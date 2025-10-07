import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Calculadora() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [resultado, setResultado] = useState(null);

  const sumar = () => setResultado(parseFloat(num1) + parseFloat(num2));
  const restar = () => setResultado(parseFloat(num1) - parseFloat(num2));
  const multiplicar = () => setResultado(parseFloat(num1) * parseFloat(num2));
  const dividir = () => {
    if (parseFloat(num2) === 0) {
      setResultado("Error: división entre 0");
    } else {
      setResultado(parseFloat(num1) / parseFloat(num2));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa el primer número"
        keyboardType="numeric"
        value={num1}
        onChangeText={setNum1}
      />

      <TextInput
        style={styles.input}
        placeholder="Ingresa el segundo número"
        keyboardType="numeric"
        value={num2}
        onChangeText={setNum2}
      />

      <View style={styles.botones}>
        <Button title="+" onPress={sumar} />
        <Button title="-" onPress={restar} />
        <Button title="×" onPress={multiplicar} />
        <Button title="÷" onPress={dividir} />
      </View>

      {resultado !== null && (
        <Text style={styles.resultado}>Resultado: {resultado}</Text>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7DD",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#80A1BA",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
  },
  botones: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginVertical: 15,
    color: "#91C4C3",
  },
  resultado: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
});
