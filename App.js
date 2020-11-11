import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Video from 'react-native-video';
import { api } from './api';

const Stack = createStackNavigator();

class VideoPlayPage extends Component {
  componentDidMount() {
    console.log(api.videoPlay + this.props.route.params.videoPath);
  }
  render() {
    return (
      <>
        <Video source={{ uri: api.videoPlay + this.props.route.params.videoPath }}
          style={styles.backgroundVideo}
          rate={1} volume={1} muted={true}
          resizeMode="cover" repeat={true} key="video1" />
      </>
    );
  }
}

class Card extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
      tabBarVisible: false,
    }
  };
  componentDidMount() {
    console.log(this.props.videoPath);
    console.log(this.props.coverPath);
    console.log(this.props.description);
  }
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          this.props.navigation.navigate('Video', {
            videoPath: this.props.videoPath
          })
        }}
      >
        <View style={[styles.sectionContainer, { backgroundColor: Colors.lighter }]}>
          <Image style={{ height: 200 }} source={{ uri: 'http://127.0.0.1:8080/video?name=download/cover/Oct20_30_2217029.jpg' }}>
            {/* source={{ uri: api.videoPlay + this.props.coverPath }} */}
          </Image>
          <Text style={[styles.sectionTitle, styles.centers]}>
            {this.props.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchData()
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(api.videoRecommend).then((response) => response.json())
      .then((data) => {
        console.log(data);
        for (let item in data) {
          console.log(item);
          console.log(data[item]);
        }
        this.setState({
          dataSource: data,
          refreshing: false
        });
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            style={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
            }
          >
            {
              this.state && this.state.dataSource ?
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                  {this.state.dataSource.map((value, index) => {
                    return <Card key={index} navigation={this.props.navigation} description={value["description"]} coverPath={value["coverPath"]} videoPath={value["videoPath"]}></Card>
                  })}
                </View> :
                <View style={styles.indicatorStyle}>
                  <ActivityIndicator size='large' color='#398DEE' />
                </View>
            }
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}


class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Video" component={VideoPlayPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

// Later on in your styles..
const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  centers: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: Colors.black,
  },
});

export default App;
