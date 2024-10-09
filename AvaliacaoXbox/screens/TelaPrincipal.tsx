import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { globalStyles } from '../global/StylesGlobal';

export default function TelaPrincipal({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  function navigationCadastro() {
    navigation.navigate('Lista dos games'); // Altere para corresponder ao nome da tela
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewImages}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://seeklogo.com/images/X/xbox-logo-0DAE30CE6A-seeklogo.com.png',
          }}
        />
      </View>
      <View style={styles.viewCabecalho}>
        <Text style={styles.textCabecalho}>Avaliações de jogos exclusivos! </Text>
      </View>
      <View style={styles.viewTextPrincipal}>
        <Text style={styles.textPrincipal}>
          Avalie os melhores games exclusivos do xbox aqui! 
        </Text>
      </View>
      <TouchableOpacity
        style={globalStyles.stylishButton}
        onPress={navigationCadastro}
      >
        <Text style={styles.buttonText}>CLIQUE AQUI</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#107C0F', // Fundo azul semelhante à imagem
    alignItems: 'center',
    paddingTop: 60,
  },
  viewCabecalho: {
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 40,
  },
  textCabecalho: {
    fontSize: 24,
    color: '#fff', // Texto branco
    fontWeight: 'bold',
  },
  viewTextPrincipal: {
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  textPrincipal: {
    textAlign: 'center',
    color: '#fff', // Texto branco
  },
  viewImages: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 60,
  },
  image: {
    width: 450,
    height: 450,
  },
  // stylishButton: {
  //   marginTop: 30,
  //   backgroundColor: '#8BD80A', // Cor de fundo do botão
  //   paddingVertical: 15,
  //   paddingHorizontal: 30,
  //   borderRadius: 30, // Arredondamento das bordas
  //   shadowColor: '#000', // Cor da sombra
  //   shadowOffset: { width: 0, height: 2 }, // Posição da sombra
  //   shadowOpacity: 0.8, // Opacidade da sombra
  //   shadowRadius: 8, // Distância da sombra
  //   elevation: 5, // Para funcionar no Android
  // },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
