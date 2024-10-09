import React, { useState } from 'react';
import {
  SafeAreaView,StyleSheet,Text,TextInput,TouchableOpacity,View,Button,Alert,ActivityIndicator,} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { globalStyles } from '../global/StylesGlobal';
import { Checkbox } from 'react-native-paper';
import axios from 'axios';
type ButtonType = 'Ótima' | 'Boa' | 'Mediana' | 'Ruim';
export default function CadastrarFeedBack({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: any;
}) {
  const [selectButton, setSelectButton] = useState(''); // Corrigido nome da variável
  const ArrayButton: ButtonType[] = ['Ótima', 'Boa', 'Mediana', 'Ruim'];
  const [isDone, setIsDone] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState(''); // Adicionando feedback ao estado
  const [loading, setLoading] = useState(false);

  const listForm = {
    productId: route.params.productId,
    name: name,
    email: email,
    feedback: feedback,
    experience: selectButton, // Enviando o botão selecionado
    recomendet: isDone,
  };

  const buttonColors: { [key in ButtonType]: string } = {
    Ótima: '#02ff02', // Cor para o botão "TOP"
    Boa: '#24a3ca', // Cor para o botão "Bom"
    Mediana: 'orange', // Cor para o botão "Médio"
    Ruim: 'red', // Cor para o botão "Péssimo"
  };

  function handleSave() {
    setLoading(true);
    if (!name || !email || !feedback) {
      Alert.alert('Aviso', 'Todos os campos são obrigatórios');
      return;
    }
    setTimeout(() => {
      axios
        .post(process.env.EXPO_PUBLIC_API_URL + '/evaluations', listForm) // Verifique se a variável de ambiente está correta
        .then(() => {
          Alert.alert('Aviso', 'Cadastro com sucesso');
          navigation.navigate('Lista dos games');
        })
        .catch(error => {
          console.log(error);
          Alert.alert('Erro', 'Não foi possível enviar o cadastro.');
        });
    }, 2000);
  }

  function navigationBack() {
    navigation.navigate('Lista dos games');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity style={styles.styleButton} onPress={navigationBack}>
          <Text style={styles.TextButton}>Voltar</Text>
        </TouchableOpacity>
      </View>

      {/* Agrupando o restante dos componentes dentro de um novo View */}
      <View>
        <View style={styles.cabecalhoText}>
          <Text style={styles.TextHeader}>Nos dê seu feedback!</Text>
          <Text style={styles.textPrincipalCabecalho}>
            Sua opinião é importante para nós. Por favor, compartilhe sua
            experiência.
          </Text>
        </View>

        <TextInput
          value={name}
          onChangeText={setName}
          style={globalStyles.textInput}
          placeholder="Nome:"
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={globalStyles.textInput}
          placeholder="E-mail:"
        />
        <TextInput
          value={feedback}
          onChangeText={setFeedback} // Adicionando a captura do feedback
          style={[globalStyles.textInput, styles.TextArea]}
          placeholder="Descreva a sua experiência:"
        />

        <View style={styles.viewCompartilhe}>
          <Text style={styles.TextCompartilhe}>
            Avalie sua experiência:
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          {ArrayButton.map(button => (
            <TouchableOpacity
              key={button}
              style={[
                styles.buttonButton,
                selectButton === button && styles.ratingButtonSelected,
                { backgroundColor: buttonColors[button] },
              ]}
              onPress={() => setSelectButton(button)} // Corrigido para capturar o botão selecionado
            >
              <Text style={styles.TextButtonSize}>{button}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.viewCheck}>
          <Checkbox
            color="#2f66df"
            status={isDone ? 'checked' : 'unchecked'}
            onPress={() => setIsDone(!isDone)}
          />
          <Text>Recomendaria para outras pessoas?</Text>
        </View>

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.styleButtonView}
            onPress={handleSave}
            disabled={loading} // Desabilita o botão enquanto está carregando
          >
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" /> // Indicador de carregamento
            ) : (
              <Text style={styles.textButtonView}>Enviar relatório</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#107C0F',
  },
  styleButton: {
    width: 60,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  TextHeader: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cabecalhoText: {
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  textPrincipalCabecalho: {
    textAlign: 'center',
  },
  TextButton: {
    fontSize: 15,
    color: 'white',
  },
  TextArea: {
    height: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#e2dcdc',
    borderRadius: 8,
    backgroundColor: '#ece8e8',
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingButtonSelected: {
    backgroundColor: '#ddd',
  },
  TextButtonSize: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  viewCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  styleButtonView: {
    alignItems: 'center',
    backgroundColor: '#000000',
    justifyContent: 'center',
    height: 50,
    borderRadius: 10,
  },
  textButtonView: {
    color: '#FFF',
    fontSize: 15,
  },
  viewCompartilhe: {
    marginBottom: 10,
  },
  TextCompartilhe: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
