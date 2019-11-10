/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {List} from 'native-base';
import {FlatList} from 'react-native';
export default class ListItems extends Component {
  render() {
    const {renderFooter, renderList} = this.props;
    return (
      <List style={{marginTop: 10}}>
        <FlatList
          data={this.props.data.data}
          keyExtractor={(item, index) => item._id}
          ListFooterComponent={renderFooter()}
          renderItem={({item, index}) => renderList(item, index)}
        />
      </List>
    );
  }
}
