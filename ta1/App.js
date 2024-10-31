import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [tasks, setTasks] = useState([]); //La lista de tareas al principio está vacía.
  const [task, setTask] = useState(""); //Tarea que voy a cargar
  const [cont, setCont] = useState(0);

  const addTask = () => {
    setTasks([...tasks, task]);
    setTask("");

    setCont((prevCont) => prevCont + 1);
  };

  //Acá me ayudó ChatGPT
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));

    if (cont != 0) {
      setCont((prevCont) => prevCont - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarea de Aplicación 1:</Text>
      <Text>Lista de tareas:</Text>

      <View style={styles.viewInput}>
        <TextInput
          style={styles.input}
          onChangeText={setTask}
          placeholder="Escribe tu nueva tarea:"
          value={task}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButton}>Agregar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item}</Text>
            <TouchableOpacity onPress={() => deleteTask(index)}>
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <StatusBar style="auto" />

      <View style={styles.contView}>
        <Text style={styles.contador}>Tareas pendientes: {cont}</Text>
      </View>
    </View>
  );
}

//Me ayudé con videos de Youtube
const styles = StyleSheet.create({
  container: {
    flex: 1, //Ocupo todo el espacio
    backgroundColor: "pink", //Color rosado de fondo
    alignItems: "center", //Centra horizontalmente
    paddingTop: 150, //150 pixeles en la parte de arriba de espacio
    paddingHorizontal: 60, //60 pixeles a los costados
  },

  title: {
    fontSize: 30, //Tamaño del título
    fontWeight: "bold",
    color: "black",
  },

  //Mi input
  viewInput: {
    flexDirection: "row", //Fila horizontal
    alignItems: "center", //Centra verticalmente
    marginBottom: 10,
  },

  input: {
    flex: 0.8,
    padding: 15,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 4, //Grosor del borde
    borderRadius: 80, //Esquinas
  },

  addButton: {
    backgroundColor: "green",
    fontWeight: "bold",
    padding: 5,
    borderRadius: 5,
    marginBottom: 20,
  },

  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  taskContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },

  deleteButtonText: {
    color: "red",
  },

  contador: {
    fontSize: 18,
  },

  //Me ayudé con ChatGPT para
  contView: {
    backgroundColor: "white",
    borderBottomLeftRadius: 40, // Radio reducido
    borderBottomRightRadius: 40, // Radio simétrico
    padding: 5, // Menos espacio interno
    paddingHorizontal: 10, // Mantener un poco de espacio a los lados
    width: "80%", // Ajustar el ancho
    alignItems: "center", // Centrar el texto
  },
});
