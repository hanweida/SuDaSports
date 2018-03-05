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
    NativeModules
} from 'react-native';

/** 全部直播页面*/
export default class FlatList_All extends React.PureComponent{
    getData(){
        var list = [];
        var responses = fetch('http://120.78.150.194:8080/video/gamelist.biz')
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
        obj.firstImageUrl = matchJson.home_logo_url;
        obj.lastImageUrl = matchJson.guest_logo_url;
        obj.first_name= matchJson.home_team;
        obj.time= matchJson.match_time;
        obj.last_name = matchJson.guest_team;
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
        NativeModules.WebviewRNModule.show("http://120.78.150.194:8080/video/geturl.biz?url="+item.url);
    }

    renderItem = ({item, index}) => {

        return (
            <TouchableOpacity style={styles.listItem}
                              onPress={this.onTabPress.bind(this,item,index)}
            >
                    <View style={styles.container}>
                        <View style={[styles.flexDirections]}>
                            <View style={{flexDirection:'column',justifyContent:'space-between',marginRight:10}}>
                                <View >
                                    <Image source={{uri:item.firstImageUrl}} style={styles.image} resizeMode='stretch'></Image>
                                </View >
                                <View >
                                    <Image source={{uri:item.lastImageUrl}} style={styles.image} resizeMode='stretch'></Image>
                                </View>
                            </View>
                            <View style={{flexDirection:'column',justifyContent:'space-between'}}>
                                <View>
                                    <Text style={styles.text}>{item.first_name}</Text>
                                </View>
                                <View>
                                    <Text style={styles.text}>{item.last_name}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.time}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <View style={{marginRight:5}}>
                                    <Image source={require('../../../img/zhibo_icon/直播icon.png')} ></Image>
                                </View>
                                <View >
                                    <Text style={[styles.text]}>视频直播</Text>
                                </View>
                            </View>
                            <View >
                                <Text >{item.time}</Text>
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
                    Loading movies...
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
                      console.log("onEndReached= this.state.myindex");
                        if(this.state.myindex<2){
                          // 到达底部，加载更多列表项
                          if(null != this.getData()){
                              this.setState({
                                listData: this.state.listData.concat(this.getData()),
                              });
                          }
                        }
                      console.log("onEndReached=" + this.state.listData.length);
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
        return <View style={{flex:1,height:70,justifyContent:'center',alignItems:'center'}}>
            <Text>到底啦</Text>
        </View>
    }
}

const itemHeight = 90;
const contentHeight = 50;
const contentWeight = 340;
const styles = StyleSheet.create({
    view: {
        flex: 1
    },
    container:{
        height: contentHeight,
        width: contentWeight,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    listItem: {
        flexDirection: 'row',
        flex: 1,
        height: itemHeight,
        borderBottomWidth: 1,
        borderBottomColor: '#E7E7E7',
        justifyContent:'center',
        alignItems:'center'
    },
    image: {
        height: 24,
        width: 24,
    },
    text: {
        fontSize:15
    },
    time:{
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'flex-end'
    },
    flexDirections:{
        flexDirection:'row',
    }
});