import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.click = this.click.bind(this);
    }
    click = () => {
        this.props.btClick(this.props.val)
    }
    render() {
        return (
            <TouchableOpacity style={{ flex: this.props.height, flexDirection: "column", backgroundColor: this.props.bg, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }} onPress={this.click}>
                <Text style={styles.text} > {this.props.val} </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    text: { fontSize: 55, color: 'white' }
});

export default Button;