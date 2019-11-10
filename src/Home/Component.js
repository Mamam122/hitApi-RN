/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Alert, StyleSheet, View, StatusBar, FlatList} from 'react-native';
import {Fab, Spinner, Text, Left, Thumbnail, Body} from 'native-base';
import {Icon, ListItem} from 'react-native-elements';
import axios from 'axios';
import ListItems from './ListItem';
export default class Homescreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
  }

  makeRemoteRequest = () => {
    axios
      .get('http://ec2-3-81-168-96.compute-1.amazonaws.com/api/materi')
      .then(res => {
        const data = res.data.data;
        console.log(data);
        this.setState({data});
      });
  };
  componentDidMount() {
    this.makeRemoteRequest();
  }
  handlePostClick = (nama, email, nomor) => {
    axios
      .post('http://192.168.0.23:5000/contact', {
        nama,
        email,
        nomor,
      })
      .then(response => {
        const newData = this.state.data.concat(response.data);
        this.setState({
          data: newData,
        });
        this.props.navigation.popToTop();
      })
      .catch(error => {
        throw error;
      });
  };

  handleEdit = (nama, email, nomor, id) => {
    axios
      .put('http://192.168.0.23:5000/app/edit/${id}', {
        nama,
        email,
        nomor,
      })
      .then(response => {
        this.setState({
          data: response.data,
        });
        this.props.navigation.popToTop();
      })
      .catch(error => {
        throw error;
      });
  };

  handleDelete = (id, index) => {
    axios
      .delete('http://192.168.0.23:5000/app/${id}')
      .then(res => {
        const newData = this.state.data.concat();
        newData.splice(index, 1);
        this.setState({
          data: newData,
        });
      })
      .catch(err => {
        throw err;
      });
  };

  renderFooter = () => {
    if (this.state.loading === false) {
      return null;
    }
    return (
      <View>
        <Spinner color="#1e88e5" />
        <Text
          style={{
            color: '#aaa',
            fontSize: 12,
            textAlign: 'center',
            bottom: 10,
          }}>
          Load more data
        </Text>
      </View>
    );
  };

  keyExtractor = (item, index) => index.toString();

  renderList = (item, index) => {
    return (
      <ListItem
        title={item.title}
        subtitle={item.content}
        leftAvatar={{source: {uri: item.thumbnail}}}
        nLongPress={() =>
          Alert.alert(
            'Are you sure',
            'you want to delete this List ?',
            [
              {text: 'Cancel', onPress: () => null},
              {text: 'OK', onPress: () => this.handleDelete(item._id, index)},
            ],
            {cancelable: false},
          )
        }
      />
      //   <Left>
      //     <Thumbnail
      //       style={{backgroundColor: '#1e88e5'}}
      //       source={{
      //         uri:
      //           'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Gnome-stock_person.svg/1024px-Gnome-stock_person.svg.png',
      //       }}
      //     />
      //   </Left>
      //   <Body>
      //     <Text>{item.title}</Text>
      //     <Text note>{item.content}</Text>
      //     <Text note>{item.nomor}</Text>
      //   </Body>
      // </ListItem>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#1e88e5" barStyle="light-content" />
        <View style={{flex: 1}}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.materi}
            renderItem={this.renderItem}
          />
        </View>
        <Fab
          style={{backgroundColor: '#1e88e5'}}
          position="bottomRight"
          onPress={() =>
            this.props.navigation.navigate('Add', {
              handlePostClick: this.handlePostClick,
            })
          }>
          <Icon raised type="ionicon" name="create" />
        </Fab>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
