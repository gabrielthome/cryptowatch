import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';
import useWebSocket from 'react-use-websocket' ;
import { useState } from 'react';


export default function App() {
  
  const [data, setData] = useState({}); // area da memoria para guardar informacoes

  const { lastJsonMessage } = useWebSocket(`wss://stream.binance.com:9443/ws/btcusdt@ticker`,  {
      onMessage: () => {
        if(lastJsonMessage){
          setData(lastJsonMessage);
        }
      },
      onError: (event) => alert(event),
      shouldReconnect: () => true,
      reconnectInterval: 3000
  })
  
// all data : <Text>{JSON.stringify(data)}</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>CryptoWatch</Text>
      <Text style={styles.label}>Symbol: {data.s}</Text>
      <Text style={styles.label}>Price: {data.c}</Text>
      <Text style={styles.label}>Variation: {data.P}%</Text>
      <Text style={styles.label}>Volume: {data.v}</Text>
      
      <Button
        style={styles.button1}
        title="Press me"
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 40,
    margin: 20,
    alignContent: 'center'
  },
  titulo: {
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
    fontSize: 40
  },
  label: {
    
    fontWeight: "bold",
    fontSize: 20
  },
  content: {
    fontWeight: "bold",
    fontSize: 24
  },
  button1: {
    
    fontWeight: "bold",
    fontSize: 24
  }
});
