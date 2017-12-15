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
export default class Zhibo_NBA extends React.PureComponent{
    // componentWillMount() {
    //     this.state = {
    //         listData: this.getData(),
    //     };
    // }

    getData2(){
        var list = [];
        list.push({"url":"http://nba.tmiaoo.com//n/100204100?classid=1&id=2597","firstImageUrl":"http://mat1.gtimg.com/sports/benchang/aoyun/team/yuan/URU.png","lastImageUrl":"http://mat1.gtimg.com/sports/benchang/aoyun/team/yuan/USA.png","first_name":"乌拉圭","time":"-","splitstr":"08-30 07:30","last_name":"美国"});
        list.push({"url":"http://nba.tmiaoo.com//po/qie.php?url=10014945&?classid=3&id=13460","firstImageUrl":"http://c.jrszhibo.com/img/ty.png","lastImageUrl":"http://c.jrszhibo.com/img/smr.png","first_name":"康涅狄格太阳","time":"-","splitstr":"08-30 07:30","last_name":"华盛顿神秘人"});
        return list;
    }
    /** 网络获取数据，获取成功后，通过设置loaded 为true，表示加载成功*/
    // getData(){
    //     var list = [];
    //     var responses = fetch('http://www.kuwantiyu.com/')
    //         .then((response) => response.text())
    //         //获得返回的html 文本
    //         .then((responseTexts) => {
    //             console.log(responseTexts);
    //             var pattern = new RegExp('<script src=\"(.*?)\">(.*?)<\/script>', 'i');
    //             var matchArr = responseTexts.match(pattern);
    //             var needStr = matchArr[1];
    //             return needStr;
    //         })
    //         .then((needStr)=>{
    //             var responses = fetch('http://a.tmiaoo.com/'+needStr)
    //                 .then((response)=>response.text())
    //                 .then((responseTexts) => {
    //                     var pattern = new RegExp('<a (data-action)[^>]*>(.*?)(<\/a>)', 'g');
    //                     var matchArr = responseTexts.match(pattern);
    //                     for(var i = 0; i < matchArr.length; i++){
    //                         //console.info("网络获取数据 匹配每场比赛："+JSON.stringify(this.getArrayList(matchArr[i])));
    //                         list.push(this.getArrayList(matchArr[i]));
    //                     }
    //                 }).then(()=>{
    //                     this.setState({
    //                         loaded:true,
    //                         listData:list
    //                     });
    //                     return list;
    //                 })
    //         })
    //         .catch((error) => {
    //             //console.error(error);
    //         });
    // }


    getData(){
        var list = [];
        var responses = fetch('http://192.168.100.104:8080/video/gameNBAlist.biz')
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
        return obj;
    }

    /** 解析每个比赛列表 如：*/
    // getArrayList(content){
    //     //console.log("每场比赛content："+content);
    //     var obj = {};
    //     var pattern = new RegExp('((https|http|ftp|rtsp|mms)?:\/\/)[\\S]*(")','g');
    //     var pattern_name = new RegExp('(<span>)(.*?)(?=<\/span>)','g');
    //     var matchArr = content.match(pattern);
    //     //console.log("每场比赛URL数组："+matchArr);
    //     //console.log("每场比赛URL数组长度："+matchArr.length);
    //     obj.url= matchArr[0].substr(0, matchArr[0].length-2);
    //     if(matchArr.length > 1){
    //         obj.firstImageUrl = matchArr[1].substr(0, matchArr[1].length-2);
    //     }
    //     if(matchArr.length > 2){
    //         obj.lastImageUrl = matchArr[2].substr(0, matchArr[2].length-2);
    //     }
    //
    //     var matchArr_name = content.match(pattern_name);
    //     obj.first_name= matchArr_name[0].replace('<span>', '');
    //     obj.first_name = this.fontFilter(obj.first_name);
    //     obj.splitstr= matchArr_name[1].replace('<span>', '');
    //     obj.splitstr = this.fontFilter(obj.splitstr);
    //     obj.time= matchArr_name[2].replace('<span>', '');
    //     obj.time = this.fontFilter(obj.time);
    //     obj.time = this.timeInvert(obj.time);
    //     obj.last_name= matchArr_name[3].replace('<span>', '');
    //     obj.last_name = this.fontFilter(obj.last_name);
    //     return obj;
    // }

    timeInvert(value){
        var i = 0;
        var test_name = new RegExp(".*(:).*(:)");
        if(test_name.test(value)){
            value = value.substr(0, value.lastIndexOf(":"));
            return value;
        } else {
            return value;
        }

    }

    fontFilter(value){
        var test_name = new RegExp("<font [^>]*>(.*)</font>");
        var match_name = new RegExp("<font [^>]*>(.*)</font>");
        if(test_name.test(value)){
            return value.match(match_name)[1];
        } else {
            return value;
        }
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
        NativeModules.WebviewRNModule.show("http://192.168.100.104:8080/video/getnbaurl.biz?url="+item.url+"&"+"mid="+item.mid);
    }

    renderItem = ({item, index}) => {
        // return (
        //     <View style={styles.listItem}>
        //             <View style={styles.container}>
        //                 <View style={[styles.flexDirections]}>
        //                     <View style={{flexDirection:'column',justifyContent:'space-between',marginRight:10}}>
        //                         <View >
        //                             <Image source={{uri:item.firstImageUrl}} style={styles.image} resizeMode='stretch'></Image>
        //                         </View >
        //                         <View >
        //                             <Image source={{uri:item.lastImageUrl}} style={styles.image} resizeMode='stretch'></Image>
        //                         </View>
        //                     </View>
        //                     <View style={{flexDirection:'column',justifyContent:'space-between'}}>
        //                         <View>
        //                             <Text style={styles.text}>{item.first_name}</Text>
        //                         </View>
        //                         <View>
        //                             <Text style={styles.text}>{item.last_name}</Text>
        //                         </View>
        //                     </View>
        //                 </View>
        //                 <View style={styles.time}>
        //                     <View style={{flexDirection:'row',alignItems:'center'}}>
        //                         <View style={{marginRight:5}}>
        //                             <Image source={require('../../../img/zhibo_icon/直播icon.png')} ></Image>
        //                         </View>
        //                         <View >
        //                             <Text style={[styles.text]}>视频直播</Text>
        //                         </View>
        //                     </View>
        //                     <View style={styles.text}>
        //                         <Text >{item.time}</Text>
        //                     </View>
        //                 </View>
        //             </View>
        //     </View>
        // );

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
                        <View style={{flexDirection:'column',justifyContent:'space-between'}}>
                            <View>
                                <Text style={styles.text}>{item.guest_team_score}</Text>
                            </View>
                            <View>
                                <Text style={styles.text}>{item.home_team_score}</Text>
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
                        <View >
                            {item.match_quarter != "" &&
                                <Text>{item.match_quarter}-{item.match_quarterTime}</Text>
                            }
                            {item.match_quarter == "" &&
                            <Text>未开始</Text>
                            }
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