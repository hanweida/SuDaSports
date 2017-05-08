import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    Navigator,
    View
} from 'react-native'

import List from './src/component/list/List'
export default class App extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return( 
            <Navigator 
                initialRoute={{name:'list', component:List}}
                //配置场景
                configureScene={
                    (route)=>{
                        //页面之间跳转动画
                        //node_modules/react-native/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js
                        return({
                            ...Navigator.SceneConfigs.PushFromRight,
                                    gestures: null
                        });
                    }
                }
                renderScene={
                    (route, navigator)=>{
                        let Component = route.component;
                        return <Component {...route.params} navigator={navigator} />
                    }
                }
            />
        );
    }
}