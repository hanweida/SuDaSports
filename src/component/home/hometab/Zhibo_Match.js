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
    SectionList,
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
        this.state = {matchdata:null,loaded:false};

      }

    componentWillMount(){
        this.mounted = true;
    }

    componentDidMount() {
        this.getData();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    onTabPress(item, mid){
        NativeModules.WebviewRNModule.show("http://192.168.1.13:8080/video/getnbaurl.biz?url="+item.sourceValue+"&"+"mid="+mid+"&"+"sourceName="+item.sourceName);
        //NativeModules.WebviewRNModule.show("http://120.78.150.194:8080/biz/test.html");
    }
    /** 渲染视图数据*/
    renderLoadingView(){
        return (
            <View >
                <Text>
                    正在加载...
                </Text>
            </View>
        );
    }
    render(){
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        let arr = [];
        const matchData = this.state.matchdata.data;
        //console.log(this.state.matchdata.data.matchSourceList[0].liveSource);
        for(let i in this.state.matchdata.data.matchSourceList){
            let customComponent = (
                <View  key={i}>
                    <TouchableOpacity onPress={this.onTabPress.bind(this, matchData.matchSourceList[i],matchData.mid)}
                    >
                        <Text>{matchData.matchSourceList[i].sourceName}</Text>
                    </TouchableOpacity>
                </View>
            );
            arr.push(customComponent);
            //console.log(this.state.matchdata.data.matchSourceList[i].liveSource);
        }
        return(
            <View>
                <View>{arr}</View>
            </View>
        );
    }

    //请求数据
    getData(){
        const navi = this.props.navigation;
        const {state} = navi;

        var list = [];
        const matchStatUrl = "http://192.168.1.13:8080/gamedata/matchStat.biz?mid="+state.params.item.mid+"&tabType=2&homeTeamName="+state.params.item.home_team+"&guestTeamName="+state.params.item.guest_team;
        //const matchStatUrl = "http://192.168.1.13:8080/gamedata/matchStat.biz?mid="+state.params.item.mid+"&tabType=2&homeTeamName=独行侠&guestTeamName=灰熊";
        fetch(matchStatUrl)
        //var responses = fetch('http://192.168.100.104:8080/video/gamenbalist.biz')
            .then((response) => response.json())
            //获得返回的json
            .then((responseJson)=>{
                if(this.mounted){
                    //alert(JSON.stringify(responseJson));
                    this.setState({
                        loaded:true,
                        matchdata:responseJson
                    });
                }
                //console.log(JSON.stringify(data));
            })
            .catch((error) => {
                //console.error(error);
            });
    }
}