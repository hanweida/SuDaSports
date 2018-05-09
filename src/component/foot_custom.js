/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// noinspection JSAnnotator
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import px2dp from '../util/px2dp'
export default class foot_custom extends Component {
    static propTypes = {
        goToPage: React.PropTypes.func, // 跳转到对应tab的方法
		activeTab: React.PropTypes.number, // 当前被选中的tab下标
		tabs: React.PropTypes.array, // 所有tabs集合

		tabNames: React.PropTypes.array, // 保存Tab名称
		tabIconNames: React.PropTypes.array, // 保存Tab图标

    };  // 注意这里有分号


    render() {
        return (
			<View style={styles.tabs}>
				{this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
			</View>
		);
    }

    componentDidMount() {
		// Animated.Value监听范围 [0, tab数量-1]
		//this.props.scrollValue.addListener(this.setAnimationValue);
        console.log(this.props.tabIconNames[1]);
	}

    setAnimationValue({value}) {
		console.log('动画值：'+value);
	}


    renderTabOption(tab, i) {
		let pic = this.props.activeTab == i ?  this.props.tabIconNamesSelect[i] : this.props.tabIconNames[i] ; // 判断i是否是当前选中的tab，设置不同的颜色
		let color = this.props.activeTab == i ?  "#FC4035": "#999999" ; // 判断i是否是当前选中的tab，设置不同的颜色
		return (
			<TouchableOpacity onPress={()=>this.props.goToPage(i)} style={styles.tab} key={tab}>
				<View style={styles.tabItem}>
                    <Image
                        source={pic}
                    ></Image>
					<Text style={{color: color, fontSize :px2dp(30)}}>
						{this.props.tabNames[i]}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}


}

const styles = StyleSheet.create({
    tabs: {
		borderTopWidth:px2dp(2),
		height:px2dp(147),
		flexDirection: 'row',
		borderTopColor:'#CCCCCC',
		
	},

	tab: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	tabItem: {
		flexDirection: 'column',
		alignItems: 'center',
	},
});

