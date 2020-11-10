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
  RefreshControl
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Video from 'react-native-video';
import { api } from './api';

class Card extends Component {
  render() {
    return (
      <View style={[styles.sectionContainer, { backgroundColor: Colors.lighter }]}>
        <Image style={{ height: 200 }} source={{ uri: 'http://127.0.0.1:8080/video?name=download/cover/Oct20_30_2217029.jpg' }}>
          {/* source={{ uri: api.videoPlay + this.props.coverPath }} */}
        </Image>
        <Text style={[styles.sectionTitle, styles.centers]}>
          {this.props.description}
        </Text>
      </View>
    );
  }
}

class App extends Component {
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

            {/* <Video source={require('./background.mp4')}
            style={styles.backgroundVideo}
            rate={1} volume={1} muted={true}
            resizeMode="cover" repeat={true} key="video1" /> */}
            {
              this.state && this.state.dataSource ?
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                  {this.state.dataSource.map((value, index) => {
                    return <Card key={index} description={value["description"]} cover={value["coverPath"]}></Card>
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
