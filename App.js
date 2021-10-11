import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, View, Button, TextInput, DatePickerIOS} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SQLite from 'expo-sqlite';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  center: {
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#dcb8cb',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  bigInput: {
    height: 400,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
})

const db = SQLite.openDatabase('tasks.db')//returns Database object

const App = () => {
  db.transaction(tx => {
    tx.executeSql('CREATE TABLE IF NOT EXISTS tasks (date TEXT, title TEXT, description TEXT)',
      null,
      () => {console.log('success1')},
      () => {console.log('fail')}
    )},
    () =>{ console.log('fail')},
    () => {console.log('success2')}
  )
  const[currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      month + '/' + date + '/' + year
      + ' ' + hours + ':' + min + ':' + sec
    );
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor:'#0471a6'
            },
            headerTintColor:'#D5C9DF'
          }}
        />
        <Stack.Screen name="Add" component={AddScreen}
          options={{
            title: 'Add',
            headerStyle: {
              backgroundColor:'#0471a6'
            },
            headerTintColor:'#D5C9DF'
          }}
        />
        <Stack.Screen name="Calendar" component={CalendarScreen}
          options={{
            title: 'Calendar',
            headerStyle: {
              backgroundColor:'#0471a6'
            },
            headerTintColor:'#D5C9DF'
          }}
        />
        <Stack.Screen name="Today" component={TodayScreen}
          options={{
            title: 'Today',
            headerStyle: {
              backgroundColor:'#0471a6'
            },
            headerTintColor:'#D5C9DF'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={[styles.center, {flex: 1}, {backgroundColor: '#CEEAF7'}]}>
      <View style={{flex: 1, alignSelf: 'stretch', backgroundColor: '#CEEAF7'}}>
        <View style={[styles.button,{justifyContent: 'flex-end'}, {alignSelf: 'flex-end'}]}>
          <Button
            color="#8e5572"
            title="Add a task"
            onPress={() =>
              navigation.navigate('Add')
            }
          />
        </View>
      </View>
      <View style={{flex: 1, alignSelf: 'stretch', backgroundColor: '#CEEAF7'}}>
        <Greeting name='Brandon'/>
      </View>
      <View style={{flex: 1, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-around', backgroundColor: '#CEEAF7'}}>
        <View style={[styles.button,{justifyContent: 'flex-end'}, {alignSelf: 'flex-start'}]}>
          <Button
            color="#8e5572"
            title="Calendar"
            onPress={() =>
              navigation.navigate('Calendar')
            }
          />
        </View>
        <View style={[styles.button,{justifyContent: 'flex-start'}, {alignSelf: 'flex-start'}]}>
          <Button
            color="#8e5572"
            title="Today"
            onPress={() =>
              navigation.navigate('Today')
            }
          />
        </View>
      </View>
    </View>
  )
}

const AddScreen = ({ navigation, route }) => {
  const [chosenDate, setChosenDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  function test(){
    console.log('hello')
    navigation.navigate('Today')
  }
  return (
    <SafeAreaView style={[{flex: 1}, {backgroundColor: '#CEEAF7'}]}>
    <ScrollView>
      <DatePickerIOS
        date={chosenDate}
        onDateChange={setChosenDate}
      />
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder="New Task Title"
      />
      <View style={styles.bigInput}>
        <TextInput
        multiline
        numberOfLines={10}
        maxLength = {80}
        onChange={text => setDescription(text)}
        value = {description}
        placeholder="Description"
        editable
        />
      </View>
      <Button
        onPress={test}
        title="Submit"
      />
    </ScrollView>
    </SafeAreaView>
  )
};



const CalendarScreen = ({ navigation, route }) => {
  return <Text>Hello this is the calendar screen</Text>;
};

const TodayScreen = ({ navigation, route }) => {
  return <Text>Hello this is the today screen</Text>;
};

const Greeting = (props) => {
  return (
    <View style={styles.center}>
      <Text style={{color: '#D5C9DF'}}>Hello {props.name}!</Text>
    </View>
  );
}


export default App;
