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

import Zhibo_Source from './Zhibo_Source'

/** 全部直播页面*/
export default class Zhibo_NBA extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            listData: this.getData(),
            myindex: 1,
            loaded:false
        };
    }

    getData(){
        var list = [];
        var responses = fetch('http://120.78.150.194:8080/video/gamenbalist.biz')
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
    componentWillMount(){
        this.mounted = true;
        this.getData();
    }

    componentWillUnmount() {
        this.mounted = false;
    }
    /** 解析每个比赛列表 如：*/
    // getArrayList(matchJson){
    //     //console.log("每场比赛content："+content);
    //     var obj = {};
    //     obj.url= matchJson.match_url;
    //     obj.firstImageUrl = matchJson.guest_logo_url;
    //     obj.lastImageUrl = matchJson.home_logo_url;
    //     obj.first_name= matchJson.guest_team;
    //     obj.time= matchJson.match_time;
    //     obj.last_name = matchJson.home_team;
    //     obj.home_team_score = matchJson.home_team_score;
    //     obj.guest_team_score = matchJson.guest_team_score;
    //     obj.match_quarter = matchJson.match_quarter;
    //     obj.match_quarterTime = matchJson.match_quarterTime;
    //     obj.mid = matchJson.mid;
    //     obj.match_desc = matchJson.match_desc;
    //     obj.start_time = matchJson.start_time;
    //     return obj;
    // }


    onTabPress(item,index){
        this.props.prop.navigation.navigate('Zhibo_Source',{item:item})

        //NativeModules.WebviewRNModule.show("http://192.168.1.13:8080/video/getnbaurl.biz?url="+item.match_url+"&"+"mid="+item.mid);
    }

    renderItem = ({item, index}) => {
        return (
            <TouchableOpacity style={styles.listItem}
                              onPress={this.onTabPress.bind(this,item,index)}
            >
                <View style={styles.container}>
                    <View style={styles.teamLogo}>
                        <View >
                            <Image source={{uri:item.guest_logo_url}} style={styles.image} resizeMode='stretch'></Image>
                        </View >
                        <View>
                            <Text style={styles.text}>{item.guest_team}</Text>
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
                            <Image source={{uri:item.home_logo_url}} style={styles.image} resizeMode='stretch'></Image>
                        </View>
                        <View>
                            <Text style={styles.text}>{item.home_team}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }



    _sectionComp = ({section, index}) => {
        var txt = section.key;
        return (
            <View style={[styles.compView,{backgroundColor:"#E5E6EC"}]}>
                <Text
                    style={{textAlign: 'center', textAlignVertical: 'center', fontSize: 14 }}>{txt}
                </Text>
            </View>
        )

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

    _extraUniqueKey(item ,index){
        console.log("index"+index);
        return "index"+index;
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <View style={styles.view}>
                <SectionList
                    keyExtractor={this._extraUniqueKey}
                    renderSectionHeader={this._sectionComp}
                    renderItem={this.renderItem}
                    sections={this.state.listData}
                    initialNumToRender={8}
                    refreshing={false}
                    onRefresh={() => {

                     //console.log("onRefresh=" + this.state.listData.length);
                    }}
                    onEndReached={()=>{
                      console.log("onEndReached= myindex：" + this.state.myindex);
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
                />
            </View>
        )

        // return (
        //     <View style={styles.view}>
        //         <SectionList
        //             keyExtractor={this._extraUniqueKey}
        //             renderSectionHeader={this._sectionComp}
        //             renderItem={this.renderItem}
        //             sections={this.state.listData}
        //             ItemSeparatorComponent={() => <View style={{backgroundColor:"#E7E7E7",height:1}}></View>}
        //         />
        //
        //
        //         <FlatList
        //             keyExtractor={this._keyExtractor}
        //             data={this.state.listData}
        //             renderItem={this.renderItem}
        //             onEndReached={()=>{
        //               console.log("onEndReached= myindex：" + this.state.myindex);
        //                 if(this.state.myindex<2){
        //                   // 到达底部，加载更多列表项
        //                   if(null != this.getData()){
        //                       this.setState({
        //                         listData: this.state.listData.concat(this.getData()),
        //                       });
        //                   }
        //                 }
        //               console.log("onEndReached=" + this.state.listData.length);
        //             }}
        //             refreshing={false}
        //             onRefresh={() => {
        //                   console.log("onRefresh= myindex：" + this.state.myindex);
        //                     this.setState({
        //                         listData: this.getData(),
        //                   });
        //              //console.log("onRefresh=" + this.state.listData.length);
        //             }}
        //             debug={false}
        //             numColumns={1}
        //             ListFooterComponent={this.footerView}
        //         />
        //     </View>
        // )
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