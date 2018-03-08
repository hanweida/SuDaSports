'use strict';
import React, {Component} from 'react';
import {
    FlatList,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TouchableOpacity,
    NativeModules,
    Dimensions,
    SectionList
} from 'react-native';


export default class Zhibo_Match extends React.PureComponent{

    static navigationOptions = ({navigation}) => ({
        title: '标题',
        headerTitleStyle: {fontSize: 18, color: 'red'},
        headerStyle: {height: 40},
    });

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {data:null,loaded:false};
          const navi = this.props.navigation;
          const {navigate,goBack,state} = navi;
        //alert(state.params.item.guest_team);
      }

    componentDidMount() {
        this.getData();
    }

    render(){
        //赋值为navi

        //alert(navi.state.params.item.guest_team);

        //获取navigation的属性方法，navigate,goBack,state都是navigation的方法
        //const {navigate,goBack,state} = this.props.navigation;
        //alert(state.params.item.guest_team);

        return(
            <View>
                <Text>
                    Zhibo_Source
                </Text>
            </View>
        );
    }

    //请求数据
    getData(){
        var list = [];
        fetch('http://192.168.100.104:8080/video/gamenbalist.biz')
        //var responses = fetch('http://192.168.100.104:8080/video/gamenbalist.biz')
            .then((response) => response.json())
            //获得返回的json
            .then((responseJson)=>{
                if(this.mounted){
                    this.setState({
                        loaded:true,
                        listData:responseJson
                    });
                }
                //console.log(JSON.stringify(this.state.listData));
            })
            .catch((error) => {
                //console.error(error);
            });
    }
}