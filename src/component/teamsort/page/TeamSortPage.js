import React, {Component} from 'react'
import {
    Image,
    View,
    StyleSheet,
    Button
} from 'react-native'

import TencentApi from '../../../common/http/api/tencent/TencentApi'

export default class TeamSortPage extends Component{
    static navigationOptions = {
        tabBarLabel: 'TeamSortPage',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../../../img/tab_icon_home_sel@2x.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }

    componentWillMount() {
        this.getData();
    }

    getData(){
        console.log("TeamsRankUrl："+TencentApi.api.TeamsRankUrl);
        let responses = fetch(TencentApi.api.TeamsRankUrl)
            .then((res)=>res.json())
            .then((resJson)=>{
                console.log(JSON.stringify(resJson));
            })
    }


    render() {
        return (
            <Button
                onPress={() => this.props.navigation.goBack()}
                title="Go back home Back"
            />
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    tab:{
        flexDirection:'row',
        height: 48,
        justifyContent:'center',
        borderBottomColor:'#F66A85',
        backgroundColor:'#F66A85'
    },
    tabViewText: {
        color: '#444444',
        fontWeight: 'bold',
        marginTop: 50,
        fontSize: 18
    },
    titleText: {
        color: '#444444',
        padding: 20,
        fontSize: 14,
        fontWeight: '500'
    },
    headerText: {
        padding: 8,
        fontSize: 14,
        color: '#444444'
    },
    tabContent: {
        backgroundColor: '#000000',
        flexGrow:1
    },
    Seperator: {
        marginHorizontal: -10,
        alignSelf: 'stretch',
        borderTopWidth: 1,
        borderTopColor: '#888888',
        marginTop: 24
    }
})
