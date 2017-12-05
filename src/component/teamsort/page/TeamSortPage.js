import React, {Component} from 'react'
import {
    Image,
    View,
    StyleSheet,
    Button,
    Text,
    SectionList,
    ListItem,
    H1
} from 'react-native'

import TencentApi from '../../../common/http/api/tencent/TencentApi'

export default class TeamSortPage extends Component{
    static navigationOptions = {
        tabBarLabel: 'NBA排名',
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
        this.state = {
            listData:[],
            loaded:false
        };
      }

    componentWillMount() {
        this.getData();
    }

    replaceAll(str)
    {
        if(str!=null)
            str = str.replace(/word/g,"Excel")
        return str;
    }

    getData(){
        let responses = fetch(TencentApi.api.TeamsRankUrl)
            .then((res)=>res.text())
            .then((resJson)=>{
                 var a = resJson;
                 a = a.replace(new RegExp("rows","gm"),"data");
                 var obj = JSON.parse(a);
                 //console.log(JSON.stringify(obj.data));
                this.setState({
                    listData:obj,
                    loaded:true
                });
            })
            .then(()=>{
                //console.log("ListData："+JSON.stringify(this.state.listData));
            });
    }

    /** 渲染视图数据*/
    renderLoadingView(){
        return (
            <View style={styles.container}>
                <Text>
                    Loading Data...
                </Text>
            </View>
        );
    };

    _renderSectionHeader = ({ section }) => (
        <View style={{ flex: 1, height: 25 }}>
            <Text >{section.title}</Text>
        </View>
    );

    _renderItem = ({item, index}) => {
        var txt = '  ' + item[0].name;
        var txt2 = '  ' + item[1];
        return <Text
            style={{ height: 60, textAlignVertical: 'center', backgroundColor: "#ffffff", color: '#5C5C5C', fontSize: 15 }}>{txt}{txt2}</Text>
    }

    _sectionComp = ({section, index}) => {
        console.log("section：" +section.title);
        var txt = section.title;
        return <Text
            style={{ height: 50, textAlign: 'center', textAlignVertical: 'center', backgroundColor: '#9CEBBC', color: 'white', fontSize: 30 }}>{txt}</Text>
    }

    _keyExtractor = (item, index) => 'Manufacturer' + index;

    _extraUniqueKey(item ,index){
        return "index"+item.name;
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        // var sections = [
        //     { key:"1",title: "A", data: [[{ name: "阿童木" },"20"], [{ name: "阿玛尼" },"20"], [{ name: "爱多多" },"20"]] },
        //     { key:"2",title: "B", data: [[{ name: "表哥" },"20"], [{ name: "贝贝" },"20"], [{ name: "表弟" },"20"]] },
        //     { key:"3",title: "C", data: [[{ name: "阿童木" },"20"], [{ name: "阿童木" },"20"], [{ name: "阿童木" },"20"]]},
        //     { key:"4",title: "W", data: [[{ name: "阿童木" },"20"], [{ name: "阿童木" },"20"], [{ name: "阿童木" },"20"]]},
        // ];
        var sections = [
            { title: "A", data: [[{ name: "阿童木" },"20"], [{ name: "阿玛尼" },"20"], [{ name: "爱多多" },"20"]] },
            { title: "B", data: [[{ name: "表哥" },"20"], [{ name: "贝贝" },"20"], [{ name: "表弟" },"20"]] },
            { title: "C", data: [[{ name: "阿童木" },"20"], [{ name: "阿童木" },"20"], [{ name: "阿童木" },"20"]]},
            { title: "W", data: [[{ name: "阿童木" },"20"], [{ name: "阿童木" },"20"], [{ name: "阿童木" },"20"]]},
        ];
        return (
            <View style={styles.container}>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Go back home Back"
                />
                <SectionList
                    keyExtractor={this._extraUniqueKey}
                    renderSectionHeader={this._sectionComp}
                    renderItem={this._renderItem}
                    sections={this.state.listData.data}
                    ItemSeparatorComponent={() => <View><Text></Text></View>}
                    ListHeaderComponent={() => <View style={{ backgroundColor: '#25B960', alignItems: 'center', height: 30 }}><Text style={{ fontSize: 18, color: '#ffffff' }}>通讯录</Text></View>}
                />
            </View>

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
