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
import FlatList_All from './src/component/home/homepage/FlatList_All';

export default class App extends Component {
    constructor(props){
        super(props);
    }
    render(){
        // return(
        //     <View style={styles.container}>
        //         <FlatList_All></FlatList_All>
        //     </View>
        // );

        return(
            <View style={styles.container}>
                <Header></Header>
                <Footer></Footer>
            </View>
        );

}}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
});
