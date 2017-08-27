import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native'

import List from './src/component/list/List'
import Header from './src/component/header';
import Footer from './src/component/foot';

export default class App extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return( 
            <View style={styles.container}>
                <Header></Header>
                 <Footer></Footer>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
});