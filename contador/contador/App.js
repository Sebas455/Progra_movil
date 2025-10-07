import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Contador() {
  const [contador, setContador] = useState(0);

  const incrementar = () => setContador(contador + 1);
  const decrementar = () => setContador(contador - 1);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contador en React Native</Text>
      <Text style={styles.numero}>{contador}</Text>
      <View style={styles.botones}>
        <Button title="+" onPress={incrementar} />
        <Button title="-" onPress={decrementar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#96A78D",
  },
  titulo: {
    fontSize: 50,
    marginBottom: 20,
    fontFamily: "Roboto",
  },
  numero: {
    fontSize: 48,
    marginBottom: 20,
    fontFamily: "Times New Roman",
  },
  botones: {
    flexDirection: "row",
    width: "40%",
    justifyContent: "space-between",
  },
});



