import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

export default function App() {
  //Links a imagenes aleatorias.
  const images = [
    {
      source: { uri: "https://picsum.photos/200/301" },
      description: "Descripción de imagen 1.",
    },
    {
      source: { uri: "https://picsum.photos/200/302" },
      description: "Descripción de imagen 2.",
    },
    {
      source: { uri: "https://picsum.photos/200/303" },
      description: "Descripción de imagen 3.",
    },
    {
      source: { uri: "https://picsum.photos/200/304" },
      description: "Descripción de imagen 4.",
    },
    {
      source: { uri: "https://picsum.photos/200/305" },
      description: "Descripción de imagen 5.",
    },
  ];

  // Con este useRef realizo la última parte, me ayudé con ChatGPT
  const scrollViewRef = useRef(null); //Referencia para ScrollView
  //Estado de que imagen estamos viendo.
  const [image, setImage] = useState(0);

  //Cambiamos la imagen
  const changeImage = () => {
    const nextImage = (image + 1) % images.length;
    setImage(nextImage);

    scrollViewRef.current.scrollTo({
      x: Dimensions.get("window").width * nextImage,
      animated: true,
    });
  };

  //Usé ScrollView horizontal pagingEnabled para que se vea de a una foto.
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.appTitle}>Tus imágenes:</Text>
        <StatusBar style="auto" />
      </View>

      <ScrollView horizontal pagingEnabled ref={scrollViewRef}>
        {images.map((item, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={item.source} style={styles.image} />
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View>
        <TouchableOpacity style={styles.button} onPress={changeImage}>
          <Text style={styles.button}>Otra foto.</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //Contenedor ocupa todo el espacio de la pantalla.
    //EL color lo saqué de "https://htmlcolorcodes.com/es/".
    backgroundColor: "#FFA07A",
    alignItems: "center", //Eje central horizontal
    paddingTop: 120, //Aleja de arriba del todo
  },

  appTitle: {
    color: "black",
    fontSize: 33, //Tamaño del título
    backgroundColor: "red",
    borderRadius: 69,
    padding: 15, //Aleja el título del borde de color (relleno)
  },

  //EL color lo saqué de "https://htmlcolorcodes.com/es/".
  imageContainer: {
    backgroundColor: "#FFA07A",
    width: Dimensions.get("window").width, // Hace que cada contenedor ocupe todo el ancho de la pantalla.
    alignItems: "center",
  },

  image: {
    width: 200, // Ajusta el tamaño según sea necesario
    height: Dimensions.get("window").height * 0.4, // 40% del tamaño de la pantalla.
    borderRadius: 0,
  },

  description: {
    marginTop: 50, //Margen con respecto a la imagen
    fontSize: 16, //Tamaño de letra
    color: "#333",
  },

  button: {
    alignItems: "center",
    fontSize: 40,
    backgroundColor: "red",
  },
});
