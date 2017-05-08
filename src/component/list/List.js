import React ,{Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    ListView,
    ListViewDataSource,
    TouchableOpacity,
    Image,
    WebView
} from 'react-native'

import Video from 'react-native-video';
import Header from '../header';
import Footer from '../foot';
WEBVIEW_REF = 'webview';
import px2dp from '../../util/px2dp'
export default class List extends Component{
 constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            dataSource:new ListView.DataSource({
                rowHasChanged:(row1,row2)=> row1 !== row2,
            }),
            isLoadingTail:false,
            isRefreshing:false,
        };
    }

      _sel_detail(url){
                console.log(url);
            var responses = fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        console.log(responseText);
        return responseText;
      })
      .catch((error) => {
        console.error(error);
      });
            } 


 _loadPage(url){
     console.log(url);
        //解构 与 模式匹配
        let {navigator} = this.props;
        if(navigator){
            navigator.push({
                name:'detail',
                component:Detail,
                params:{
                    rowData:url
                }
            })
        }

    }

   goBack(){
        this.refs[WEBVIEW_REF].goBack();
    }
    
    _renderRow=(rowData, sectionID, rowID)=> {
          //    console.log(josnArray[0].prename);
        //    console.log(josnArray[0].prePic);
        //    console.log(josnArray[0].time);
        //    console.log(josnArray[0].lastname);
        //    console.log(josnArray[0].lastPic);
        //    console.log(josnArray[0].videourl);
    
    return (
        <TouchableOpacity onPress={()=>this._loadPage(rowData.videourl)}>
          <View>
            <View style={styles.row}>
              <Image style={styles.thumb} source={{uri:rowData.prePic}} />
              <Text style={{flex:1,fontSize:16,color:'blue'}}>
                {rowData.prename}
              </Text>
              <Text style={{flex:1,fontSize:16,color:'blue'}}>
                {rowData.time}
              </Text>
              <Text style={{flex:1,fontSize:16,color:'blue'}}>
                {rowData.lastname}
              </Text>
              <Image style={styles.thumb} source={{uri:rowData.lastPic}} />
            </View>
          </View>
        </TouchableOpacity>
    );
   }

    render(){
        //使用stirng 字符串截取，获得地址，方法不可行
        /*return (
            //onEndReached={this._fetchMoreData}
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}

                    style={styles.listView}
                />
            </View>
        );*/

        //采用webview方式
        return (
            //onEndReached={this._fetchMoreData}
            <View style={styles.container}>
                <Header></Header>
                {/*<TouchableOpacity
                    onPress={this.goBack.bind(this)}
                    >
                    <Text >
                    返回
                    </Text>
                </TouchableOpacity>*/}
                <WebView
                 ref={WEBVIEW_REF}
                 injectedJavaScript="(function(){document.getElementsByClassName('mv_head')[0].style.display='none'; document.getElementsByClassName('mv_app')[0].style.display='none';var divs =document.getElementsByTagName('div');var divAd = divs[divs.length-4].innerHTML; if(divAd.indexOf('广告') >-1 ){divs[divs.length-4].style.display='none';divAd='';}}()) "
                 //document.getElementsByClassName('mv_head')[0].style.display='none';}
                //injectedJavaScript="document.getElementsByClassName('mv_head').innerHTML=''"
                //injectedJavaScript="document.getElementsByTagName('mv_head')[0].innerHTML=''"
                source={{uri: 'http://nba.tmiaoo.com'}}
                    //source={{uri: 'http://nba.tmiaoo.com//le/lexl.php?leid=1020170429214037&?classid=3&id=9883'}}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    automaticallyAdjustContentInsets={true}
                    style={styles.webViewstyle}
                />
                <Footer></Footer>
            </View>
        );
    }

    componentDidMount() {
        //http://s.tmiaoo.com/ipad.html
        //http://nba.tmiaoo.com/nba.html
      var responses = fetch('http://s.tmiaoo.com/ipad.html')
      .then((response) => response.text())
      //获得返回的html 文本
      .then((responseText) => {
       // console.log(responseText);
         this.jiexi(responseText);
        return responseText;
      })
      .catch((error) => {
        console.error(error);
      });
    //  responses.then((successMessage)=>{
    //    this.jiexi(successMessage);
    //  });
    }
    
    jiexi=(successMessage)=>{
         let zuobiao = successMessage.indexOf('<script src="/d/js/js/');
         let zuobiaoEnd = successMessage.indexOf('"></script>');
         let str = successMessage.substring(zuobiao+'<script src="'.length, zuobiaoEnd);
        // console.log(str);
         this.getByJsFile(str);
    }

    getByJsFile=(str)=>{
        //console.log('http://nba.tmiaoo.com'+str);
         var responses = fetch('http://nba.tmiaoo.com'+str)
      .then((response) => response.text())
      .then((responseText) => {
       // console.log(responseText);
        this.getJSAddressByJsFile(responseText);
        return responseText;
      })
      .catch((error) => {
        console.error(error);
      });
    }

    getJSAddressByJsFile=(str)=>{
        let startIndex = 0;
         let endIndex = 0;
         let array = [];
         //console.log(str);
        while((startIndex = str.indexOf('<a data-action='))!=-1){
            endIndex= str.indexOf('</a>')+"</a>".length;
            let sub = str.substring(startIndex, endIndex);
            array.push(sub);
            str=str.substr(endIndex);
            //console.log(sub);
            //console.log("----------------------------------");
        }
 //a data-action=\"相关比赛\" href=\"http://nba.tmiaoo.com//n/100202900?classid=1&id=2098\" class=\"boss\">		
            //<div class=\"team-left\">			
            //<img src=\"http://img1.gtimg.com/bj2022fr/pics/hv1/48/131/2149/139772178.png\"><span>瓦基弗银行</span>		
            //</div>		<div class=\"team-score\">			<p class=\"score-num gray\">				
            //<span>-</span>			</p>			
            //<p class=\"score-content\">				
            //<span>03-30 23:55:00</span>			</p>		</div>		
            //<div class=\"team-right\">			
            //<img src=\"http://img1.gtimg.com/sports/pics/hv1/88/238/2155/140189653.png\"><span>贝西克塔斯</span>		
            //</div>		</a>
            this.textToJson(array);
    }

        textToJson=(arrays)=>{
             let startIndex = 0;
             let endIndex = 0;
             let startPreNameIndex = 0;
             let endPreNameIndex = 0;
             let startPrePicIndex = 0;
             let endPrePicIndex = 0;
             let startLastPicIndex = 0;
             let endLastPicIndex = 0;
             let startLastNameIndex = 0;
             let endLastNameIndex = 0;
             let startTimeIndex = 0;
             let endTimeIndex = 0;
            let text;
            var josnArray=[];
            for(i = 0; i < arrays.length ; i++){
                var josnData={};
                 text=arrays[i];
                 startIndex = text.indexOf('http://');
                 endIndex = text.indexOf('" class');
                 josnData['videourl']=text.substring(startIndex,endIndex);

                startPreNameIndex=text.indexOf('<span>');
                endPreNameIndex = text.indexOf('</span>');
                josnData['prename']=text.substring(startPreNameIndex+"<span>".length,endPreNameIndex);

                startPrePicIndex=text.indexOf('<img src=\\"');
                endPrePicIndex = text.indexOf('\\"><span>');
                josnData['prePic']=text.substring(startPrePicIndex+'<img src=\\"'.length,endPrePicIndex);

                
                text = text.substr(text.indexOf('score-content'));
                startTimeIndex=text.indexOf('<span>');
                endTimeIndex = text.indexOf('</span>');
                josnData['time']=text.substring(startTimeIndex+"<span>".length,endTimeIndex);

                text = text.substr(endTimeIndex+'</span>'.length);
                startLastNameIndex=text.indexOf('<span>');
                endLastNameIndex = text.indexOf('</span>');
                josnData['lastname']=text.substring(startLastNameIndex+"<span>".length,endLastNameIndex);

                startLastPicIndex=text.indexOf('<img src=\\"');
                endLastPicIndex = text.indexOf('\\"><span>');
                josnData['lastPic']=text.substring(startLastPicIndex+'<img src=\\"'.length,endLastPicIndex);
                josnArray.push(josnData);
            }     

        //console.log(josnArray[0].videourl +":"+josnArray[0].prename +":"+josnArray[i].prePic+":"+josnArray[i].time+":"+josnArray[i].lastname+":"+josnArray[i].lastPic);
        //    console.log(josnArray[0].prename);
        //    console.log(josnArray[0].prePic);
        //    console.log(josnArray[0].time);
        //    console.log(josnArray[0].lastname);
        //    console.log(josnArray[0].lastPic);
        //    console.log(josnArray[0].videourl);
            for( i in josnArray){
                console.log(josnArray[i].videourl +":"+josnArray[i].prename +":"+josnArray[i].prePic+":"+josnArray[i].time+":"+josnArray[i].lastname+":"+josnArray[i].lastPic);
            }
             this.setState({
                    // dataSource: this.state.dataSource.cloneWithRows([
                    //     {
                    //         "lastname":"lastname"
                    //     },
                    //     {
                    //         "lastname":"firtst"
                    //     }
                    // ])   
                     dataSource: this.state.dataSource.cloneWithRows(josnArray)   
            });
            // for( i in josnArray){
            //    // this._data = this._data.concat(josnArray[i]);
                
            // }
            
    }
    
}

class Detail extends Component{
constructor(props) {
        super(props);
        this.state = {
            url: "",
            hosturl:"",
            videourl:""
        };
    }

    componentDidMount(){
        this.setState({url:this.props.rowData});
        console.log(this.state.url);
        let reurl = this.state.url;
        //var responses = fetch(this.props.rowData)
         
    var responses = fetch(this.props.rowData)
      .then((response) => response.text())
      .then((responseText) => {
          //两种情况，一种是 有iframe  ，另一种没有ifram
          console.log(responseText);
        let startIndex = 0;
             let endIndex = 0;
             let srcJs = "";
             let host="";
        startIndex = responseText.indexOf('<iframe width="100%" height="100%" src="')+('<iframe width="100%" height="100%" src="').length;
                        endIndex = responseText.indexOf('" frameborder="0"');
                        srcJs=responseText.substring(startIndex,endIndex);
        startIndex = srcJs.lastIndexOf("/")+1;        
        host = srcJs.substr(0,startIndex);
        this.setState({
            hosturl:host
        });
        console.log(this.state.hosturl);
        return srcJs;
      }).then(
        (srcJs)=>{
            fetch(srcJs)
             .then((response) => response.text())
            .then((responseText) => {
            let startIndex = 0;
             let endIndex = 0;
             let srcJs = "";
            
            startIndex = responseText.indexOf("</script>")+"</script>".length;
            srcJs=responseText.substr(startIndex);
            
             startIndex = srcJs.indexOf('src="')+('src="').length;
                        endIndex = srcJs.indexOf('" charset="utf-8">');
                        console.log(startIndex);
                        console.log(endIndex);
                        srcJs=srcJs.substring(startIndex,endIndex);
                        console.log(srcJs);
                        srcJs=this.state.hosturl+srcJs
                        console.log(srcJs);
                        return srcJs;
      }).then((srcJs)=>{
           fetch(srcJs)
            .then((response) => response.text())
            .then((responseText) => {
            let startIndex = 0;
             let endIndex = 0;
             let  srcJss= "";
            
            startIndex = responseText.indexOf("var video=['")+"var video=['".length;
            endIndex = responseText.indexOf("',", startIndex);
            srcJss=responseText.substring(startIndex, endIndex);
            this.setState({
                videourl:srcJss
            });
            console.log(srcJss);
            })
      })
    }).catch((error) => {
        console.error(error);
      });

    }

 _pressButton() {
        const { navigator } = this.props;
        if (navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:了
            navigator.pop();
        }
    }
    render() {
        return (
         <Video source={{uri: this.state.videourl, mainVer: 1, patchVer: 0}} // Looks for .mp4 file (background.mp4) in the given expansion version.
       ref={(ref) => {
         this.player = ref
       }}
       rate={1.0}                   // 0 is paused, 1 is normal. 速率
       volume={1.0}                 // 0 is muted, 1 is normal.
       muted={false}                // Mutes the audio entirely.
       paused={false}               // Pauses playback entirely.
       resizeMode="contain"           // Fill the whole screen at aspect ratio.
       repeat={true}                // Repeat forever.
       onLoadStart={this.loadStart} // Callback when video starts to load
       onLoad={this.setDuration}    // Callback when video loads
       onProgress={this.setTime}    // Callback every ~250ms with currentTime
       onEnd={this.onEnd}           // Callback when playback finishes
       onError={this.videoError}    // Callback when video cannot be loaded
       style={styles.backgroundVideo} ></Video>
        );


    }
}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    container:{
        flex:1
    },
    listView: {
        paddingTop: 20,
        backgroundColor: 'white',
    },
    webViewstyle:{
        height: 500,
    },
    thumb: {
        width: 50,
        height: 50,
    },
   row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  }, 
});