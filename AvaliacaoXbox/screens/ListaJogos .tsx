import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';

type ProspsList = {
  id: number;
  name: string;
  brand: string;
  console: string;
  description: string;
  image: string;
};
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { globalStyles } from '../global/StylesGlobal';

export default function ListaJogos({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [jogos, setJogos] = useState<ProspsList[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const jogosFilter = jogos.filter(jogo =>
    jogo.name.toUpperCase().includes(search)
  );

  function navigationCadastro({ produtoId }: { produtoId: number }) {
    navigation.navigate('Sua opinião é importante para nós!', { productId: produtoId }); // Altere para corresponder ao nome da tela
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(process.env.EXPO_PUBLIC_API_URL + '/products')
      .then(response => {
        setTimeout(() => {
          setLoading(false);
          setJogos(response.data); // Acessando a propriedade "products"
        }, 3000);
      })
      .catch(() => {
        setLoading(false);
        Alert.alert('Houve um erro na listagem de jogos');
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#107C0F" />
      <View style={styles.container}>
        <View style={styles.ViewTile}>
          <Text style={styles.titleCabecalho}>Lista de jogos</Text>
          <TextInput
            style={globalStyles.textInput}
            placeholder="Pesquisar"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.ViewFlatList}>
          {loading ? (
           <LottieView
           autoPlay
           style={{ width: 300, height: 250 }}
           source={require('../assets/Animation - 1728223937271.json')}
         />
          ) : (
            <FlatList
              data={jogosFilter}
              keyExtractor={item => item.id.toString()}
              ListEmptyComponent={() => (
                // <Text style={styles.TextEmpty}>Não existem itens no Array</Text>
                <View style={styles.ViewImageEmpty}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.freepik.com/256/11329/11329073.png?semt=ais_hybrid',
                    }}
                    style={styles.ImageEmpty}
                  />
                </View>
              )}
              renderItem={({ item }) => (
                <View key={item.id} style={styles.Viewcontainer}>
                  <Image source={{ uri: item.image }} style={styles.imagem} />
                  <View style={styles.ViewTexts}>
                    <Text style={styles.TextTitle}>{item.name}</Text>
                    <Text style={styles.Text}>{item.brand}</Text>
                    <Text style={styles.Text}>{item.console}</Text>
                    <Text style={styles.Text}>{item.description}</Text>
                    <TouchableOpacity
                      style={globalStyles.stylishButton}
                      onPress={() => navigationCadastro({ produtoId: item.id })}
                    >
                      <Text style={styles.buttonText}>Clique Aqui</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}
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
    // justifyContent: 'center',
  },
  ViewTile: {
    marginTop: 10,
    gap: 10,
  },
  titleCabecalho: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  Viewcontainer: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#1A1B1E',
  },
  ViewFlatList: { flex: 1 },

  ViewTexts: {
    gap: 10,
    margin: 20,
  },
  TextTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 15,
  },
  Text: {
    color: 'white',
  },
  imagem: {
    marginTop: 10,
    width: 250,
    height: 400,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  // textInput: {
  //   height: 50,
  //   borderColor: '#ddd',
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   paddingHorizontal: 15,
  //   marginBottom: 20,
  //   backgroundColor: '#f9f9f9',
  //   fontSize: 16,
  //   color: '#333',
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 3,
  //   elevation: 2,
  // },
  TextEmpty: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  ImageEmpty: {
    width: 200,
    height: 200,
  },
  ViewImageEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // stylishButton: {
  //   marginTop: 30,
  //   backgroundColor: '#2f66df', // Cor de fundo do botão
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
