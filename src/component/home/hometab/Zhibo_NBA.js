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
    Dimensions
} from 'react-native';

/** 全部直播页面*/
export default class Zhibo_NBA extends React.PureComponent{
    getData(){
        var list = [];
        var responses = fetch('http://120.78.150.194:8080/video/gamenbalist.biz')
            .then((response) => response.json())
            //获得返回的json
            .then((responseJson) => {
                //console.log(JSON.stringify(responseJson));
                for(var i=0,l=responseJson.length;i<l;i++){
                    //console.log(JSON.stringify(responseJson[i]));
                    list.push(this.getArrayList(responseJson[i]));
                }
            })
            .then(()=>{
                this.setState({
                    loaded:true,
                    listData:list
                });
                //console.log(JSON.stringify(this.state.listData));
                return list;
            })
            .catch((error) => {
                //console.error(error);
            });
    }

    /** 解析每个比赛列表 如：*/
    getArrayList(matchJson){
        //console.log("每场比赛content："+content);
        var obj = {};
        obj.url= matchJson.match_url;
        obj.firstImageUrl = matchJson.guest_logo_url;
        obj.lastImageUrl = matchJson.home_logo_url;
        obj.first_name= matchJson.guest_team;
        obj.time= matchJson.match_time;
        obj.last_name = matchJson.home_team;
        obj.home_team_score = matchJson.home_team_score;
        obj.guest_team_score = matchJson.guest_team_score;
        obj.match_quarter = matchJson.match_quarter;
        obj.match_quarterTime = matchJson.match_quarterTime;
        obj.mid = matchJson.mid;
        obj.match_desc = matchJson.match_desc;
        obj.start_time = matchJson.start_time;
        return obj;
    }

    constructor(props) {
        super(props);
        this.state = {
            listData: this.getData(),
            myindex: 1,
            loaded:false
        };
    }

    onTabPress(item,index){
        NativeModules.WebviewRNModule.show("http://192.168.1.13:8080/video/getnbaurl.biz?url="+item.url+"&"+"mid="+item.mid);
    }

    renderItem = ({item, index}) => {
        return (
            <TouchableOpacity style={styles.listItem}
                              onPress={this.onTabPress.bind(this,item,index)}
            >
                <View style={styles.container}>
                    <View style={styles.teamLogo}>
                        <View >
                            <Image source={{uri:item.firstImageUrl}} style={styles.image} resizeMode='stretch'></Image>
                        </View >
                        <View>
                            <Text style={styles.text}>{item.first_name}</Text>
                        </View>
                    </View>
                    <View style={styles.scoreInfo}>
                        <View>
                            <Text style={styles.text}>{item.guest_team_score}</Text>
                        </View>
                        <View>
                            <View>
                                {item.match_quarter != "" &&
                                <Text>{item.match_quarter}-{item.match_quarterTime}</Text>
                                }
                                {item.match_quarter == "" &&
                                <Text>{item.start_time}</Text>
                                }
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                                <Image source={require('../../../img/zhibo_icon/直播icon.png')} ></Image>
                                <Text style={[styles.text]}>视频直播</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.text}>{item.home_team_score}</Text>
                        </View>
                    </View>
                    <View style={styles.teamLogo}>
                        <View >
                            <Image source={{uri:item.lastImageUrl}} style={styles.image} resizeMode='stretch'></Image>
                        </View>
                        <View>
                            <Text style={styles.text}>{item.last_name}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    /** 渲染视图数据*/
    renderLoadingView(){
        return (
            <View style={styles.container}>
                <Text>
                    正在加载...
                </Text>
            </View>
        );
    }


    _keyExtractor = (item, index) => 'Manufacturer' + index;
    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <View style={styles.view}>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    data={this.state.listData}
                    renderItem={this.renderItem}
                    onEndReached={()=>{
                        if(this.state.myindex<2){
                          // 到达底部，加载更多列表项
                          if(null != this.getData()){
                              this.setState({
                                listData: this.state.listData.concat(this.getData()),
                              });
                          }
                        }
                      //console.log("onEndReached=" + this.state.listData.length);
                    }}
                    refreshing={false}
                    onRefresh={() => {
                            this.setState({
                                listData: this.getData(),
                          });
                     //console.log("onRefresh=" + this.state.listData.length);
                    }}
                    debug={false}
                    numColumns={1}
                    ListFooterComponent={this.footerView}
                />
            </View>
        )
    }

    footerView() {
        return <View style={{flex:1,height:30,justifyContent:'center',alignItems:'center'}}>
            <Text>到底啦</Text>
        </View>

    }
}

const itemHeight = 90;
const contentHeight = Dimensions.get('window').height;
const contentWeight = Dimensions.get('window').width;
const styles = StyleSheet.create({
    view: {
        flex: 1
    },
    container:{
        height: itemHeight,
        width: contentWeight,
        flexDirection:'row',

    },
    listItem: {
        flex: 1,
        height: itemHeight,
        borderBottomWidth: 1,
        borderBottomColor: '#E7E7E7',
    },
    image: {
        height: 40,
        width: 60,
    },
    text: {
        fontSize:15
    },
    teamLogo: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        alignContent:'space-around'
    },
    scoreInfo: {
        flex:2,
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems:'center',
    }
});