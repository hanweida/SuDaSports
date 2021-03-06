/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
export default class foot_custom extends Component {
    static propTypes = {
        goToPage: React.PropTypes.func, // 跳转到对应tab的方法
		activeTab: React.PropTypes.number, // 当前被选中的tab下标
		tabs: React.PropTypes.array, // 所有tabs集合
		tabNames: React.PropTypes.array, // 保存Tab名称
    };  // 注意这里有分号


    render() {
        return (
			<View style={styles.tabs}>
				{this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
			</View>
		);
    }


    setAnimationValue({value}) {
		console.log('动画值：'+value);
	}


    renderTabOption(tab, i) {
		let color = this.props.activeTab == i ?  "#FC4035": "#999999" ; // 判断i是否是当前选中的tab，设置不同的颜色
		return (
			<View style={{flex:1,flexDirection: 'row',}}>
				<View style={{flex:1}}>
					<TouchableOpacity onPress={()=>this.props.goToPage(i)} style={styles.tab} >
						<View style={styles.tabItem}>
							<Text style={{color: color, fontSize :15}}>
								{this.props.tabNames[i]}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View style={{backgroundColor:'#E7E7E7',width:1,height:22,alignSelf: 'center'}}></View>
			</View>
		);
	}


}

const styles = StyleSheet.create({
    tabs: {
		height:40,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	tiao:{
		flex:1,
		justifyContent: 'center',
		alignItems:'center',
	},
	tab: {
		flex:1,
		justifyContent: 'center',
		alignItems:'center',
		borderBottomWidth:1,
		borderBottomColor:'#E7E7E7',
		backgroundColor:'#FFFFFF',

	},

});

