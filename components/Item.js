import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    console.log("Item")

    this.styles = StyleSheet.create({
        text: { fontSize: 48, alignSelf: 'center', color: "white"}
      
      });
  }

  render() {
    return (
      <TouchableOpacity style={{flex:1,backgroundColor: this.props.bg }} onPress={() => {window.alert('color: ' + this.props.bg + '\nid: ' + this.props.txt)}}>
        <Text style={this.styles.text}> {this.props.txt} </Text>
      </TouchableOpacity>
    );
  }
}



export default Item;