import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Image, TouchableWithoutFeedback } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function IMC() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState('');

  const calcularIMC = () => {
    const p = parseFloat(peso);
    const a = parseFloat(altura);

    if (!p || !a || a <= 0) {
      setResultado('Por favor ingresa valores válidos.');
      return;
    }

    if (p < 20 || p > 300) {
      setResultado('El peso debe estar entre 20 kg y 300 kg.');
      return;
    }
    if (a < 0.5 || a > 2.5) {
      setResultado('La altura debe estar entre 0.5 m y 2.5 m.');
      return;
    }

    const imc = p / (a * a);
    let mensaje = '';

    if (imc < 18.5) mensaje = 'Bajo peso';
    else if (imc < 25) mensaje = 'Peso normal';
    else if (imc < 30) mensaje = 'Sobrepeso';
    else mensaje = 'Obesidad';

    setResultado(`Tu IMC es ${imc.toFixed(2)} (${mensaje}).`);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Calculadora de IMC</Text>

        <TextInput
          style={styles.input}
          placeholder="Peso (kg)"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />

        <TextInput
          style={styles.input}
          placeholder="Altura (m)"
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
        />

        <TouchableOpacity style={styles.boton} onPress={calcularIMC}>
          <Text style={styles.botonTexto}>Calcular</Text>
        </TouchableOpacity>

        <Text style={styles.resultado}>{resultado}</Text>

        <Image
          source={require('./assets/fondo.jpg')}
          style={styles.imagen}
          resizeMode="contain"
        />

        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A8BBA3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: '600',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    backgroundColor: '#F7F1DE',
    borderColor: '#B87C4C',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    textAlign: 'center',
  },
  boton: {
    backgroundColor: '#B87C4C',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  imagen: {
    width: 200,
    height: 200,
    marginTop: 30,
    borderRadius: 15,
  },
});
