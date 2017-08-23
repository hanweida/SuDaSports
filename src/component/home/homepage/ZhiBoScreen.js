import React,{Component} from 'react'
import {
    Text,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Alert} from 'react-native'

export default class ZhiBoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressStatus: false,
            button_index:0
        };
    }

    componentDidMount() {
        this._onHideUnderlay(0);
    }
    _onHideUnderlay(index){
        if(index == this.state.button_index){
            this.setState({
                pressStatus: true,
                button_index:index
            });
        } else {
            this.setState({
                pressStatus: false,
                button_index:index
            });
        }
    }

    _onShowUnderlay(index){
        this.setState({
            pressStatus: true,
            button_index:index
        });
    }

    _onPress(){
        Alert.alert('Button has been pressed!');
    };


    static navigationOptions = {
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../../../img/tab_icon_home_default@2x.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    onHideUnderlay={this._onHideUnderlay.bind(this, 0)}
                    onShowUnderlay={this._onShowUnderlay.bind(this, 0)}
                    onPress={this._onPress.bind(this, 0)}
                    underlayColor='#FFFFFF'
                    style={[styles.button_tab,styles.button_left_tab,(this.state.pressStatus && 0 == this.state.button_index) ? styles.press_button:styles.unpress_button]}>
                    <View style={styles.button_text_view}>
                        <Text style={[styles.button_text, (this.state.pressStatus && 0 == this.state.button_index) ? styles.press_button_text:styles.unpress_button_text]}>
                            直播
                        </Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    onHideUnderlay={this._onHideUnderlay.bind(this, 1)}
                    onShowUnderlay={this._onShowUnderlay.bind(this, 1)}
                    onPress={this._onPress.bind(this, 1)}
                    underlayColor='#FFFFFF'
                    style={[styles.button_tab,styles.button_center_tab,(this.state.pressStatus && 1 == this.state.button_index) ? styles.press_button:styles.unpress_button]}>
                    <View style={styles.button_text_view}>
                        <Text style={[styles.button_text, (this.state.pressStatus && 1 == this.state.button_index) ? styles.press_button_text:styles.unpress_button_text]}>
                            新闻
                        </Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    onHideUnderlay={this._onHideUnderlay.bind(this, 2)}
                    onShowUnderlay={this._onShowUnderlay.bind(this, 2)}
                    onPress={this._onPress.bind(this, 2)}
                    underlayColor='#FFFFFF'
                    style={[styles.button_tab,styles.button_right_tab,(this.state.pressStatus && 2 == this.state.button_index) ? styles.press_button:styles.unpress_button]}>
                    <View style={styles.button_text_view}>
                        <Text style={[styles.button_text, (this.state.pressStatus && 2 == this.state.button_index) ? styles.press_button_text:styles.unpress_button_text]}>
                            狂言NBA
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
    viewScreen:{
        width: 200,
        height: 200,
        backgroundColor: '#000000'
    },
    container:{
        flexDirection:'row',
        height: 48,
        justifyContent:'center',
        borderBottomColor:'#F66A85',
        backgroundColor:'#F66A85'
    },
    button_tab:{
        height:30,
        width:86,
        borderColor:'#FFFFFF',
        borderStyle :'solid',
        backgroundColor: '#F66A85',
        borderWidth:1,
        alignSelf:'center'
    },
    button_left_tab:{
        borderTopLeftRadius:8,
        borderBottomLeftRadius:8,
    },
    button_right_tab:{
        borderTopRightRadius:8,
        borderBottomRightRadius:8,
    },
    button_center_tab:{
        borderLeftWidth:0,
        borderRightWidth:0
    },
    button_text_view:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
    },
    button_text:{
        fontSize:15,
        fontFamily:'PingFangSC-Regular',
        color:'#FFFFFF'
    },
    unpress_button_text:{
        fontSize:15,
        fontFamily:'PingFangSC-Regular',
        color:'#FFFFFF'
    },
    press_button_text:{
        fontSize:15,
        fontFamily:'PingFangSC-Regular',
        color:'#F66A85'
    },
    press_button:{
        backgroundColor: '#FFFFFF'
    },
    unpress_button:{
        backgroundColor: '#F66A85',
    },
    app_name:{

    },
    statusbar:{
        flex:1,
    },
    pic_suda:{

    }
});