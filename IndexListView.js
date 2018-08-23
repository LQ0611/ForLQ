'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ListView,
    Dimensions,
    Image,
    ScrollView,
} from 'react-native';

import Toast, {DURATION} from './ToastUtil'

var totalheight = []; //每个字母对应的城市和字母的总高度

const {width, height} = Dimensions.get('window');

var that;

export default class CityIndexListView extends Component {


    constructor(props) {
        super(props);

        console.log("props:",this.props.style.letterMarginTop)
        var getSectionData = (dataBlob, sectionID) => {
            return sectionID;
        };
        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID][rowID];
        };

        let ALL_CITY_LIST = this.props.allCityList;

        const SECTIONHEIGHT = this.props.style.SECTIONHEIGHT===undefined?30:this.props.style.SECTIONHEIGHT;//分组名  高
        const ROWHEIGHT = this.props.style.ROWHEIGHT===undefined?60:this.props.style.ROWHEIGHT;// 列表   高
        const ROWHEIGHT_BOX = this.props.style.ROWHEIGHT_BOX===undefined?50:this.props.style.ROWHEIGHT_BOX;// 三个一行的小块的高
        const boxNumEveryRow = this.props.style.boxNumEveryRow===undefined?3:this.props.style.boxNumEveryRow;//每一行有几个小块

        let dataBlob = {};

        ALL_CITY_LIST.map(cityJson => {
            let key = cityJson.sortLetters.toUpperCase();

            if (dataBlob[key]) {
                let subList = dataBlob[key];
                subList.push(cityJson);
            } else {
                let subList = [];
                subList.push(cityJson);
                dataBlob[key] = subList;
            }
        });

        let sectionIDs = Object.keys(dataBlob);

        let ds = new ListView.DataSource({
            getRowData: getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });



        let rowIDs = sectionIDs.map(sectionID => {
            let thisRow = [];
            let count = dataBlob[sectionID].length;
            for (let ii = 0; ii < count; ii++) {
                thisRow.push(ii);
            }

            /*计算没一个的高度*/
            let eachheight = SECTIONHEIGHT + ROWHEIGHT * thisRow.length;

            //if (sectionID === key_hot || sectionID === key_now || sectionID === key_last_visit) {
            if (!(sectionID>='A'&&sectionID<='Z')) {
                let rowNum = (thisRow.length % boxNumEveryRow === 0)
                    ? (thisRow.length / boxNumEveryRow)
                    : parseInt(thisRow.length / boxNumEveryRow) + 1;


                eachheight = SECTIONHEIGHT + ROWHEIGHT_BOX * rowNum;
            }

            totalheight.push(eachheight);

            return thisRow;
        });

        console.log("totalheight",totalheight);

        this.state = {

            dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
            letters: sectionIDs,

            /*分组的组名高度*/
            SECTIONHEIGHT : SECTIONHEIGHT,

            /*分组的组名背景颜色*/
            sectionBackgroundColor:this.props.style.sectionBackgroundColor===undefined?'#F4F4F4':this.props.style.sectionBackgroundColor,

            /*分组组名字体大小*/
            sectionFontSize:this.props.style.sectionFontSize===undefined?20:this.props.style.sectionFontSize,

            /*分组组名字体颜色*/
            sectionFontColor:this.props.style.sectionFontColor===undefined?'black':this.props.style.sectionFontColor,

            /*分组组名左边距*/
            sectionMarginLeft:this.props.style.sectionMarginLeft===undefined?5:this.props.style.sectionMarginLeft,

            /*当组名不为字母时，方块所在行的高度*/
            ROWHEIGHT_BOX : ROWHEIGHT_BOX,

            /*组名不为字母时，一行有几个*/
            boxNumEveryRow:this.props.style.boxNumEveryRow===undefined?3:this.props.style.boxNumEveryRow,

            /*组名不为字母时，每个方块的左右边距*/
            boxMarginLeft:this.props.style.boxMarginLeft===undefined?10:this.props.style.boxMarginLeft,
            boxMarginRight:this.props.style.boxMarginRight===undefined?10:this.props.style.boxMarginRight,

            /*组名不为字母时，每个方块的上下边距*/
            boxMarginTop:this.props.style.boxMarginTop===undefined?5:this.props.style.boxMarginTop,
            boxMarginBottom:this.props.style.boxMarginBottom===undefined?5:this.props.style.boxMarginBottom,

            /*组名不为字母时，方块内名字的字体大小*/
            boxFontSize:this.props.style.boxFontSize===undefined?15:this.props.style.boxFontSize,

            /*组名不为字母时，方块内名字的字体颜色*/
            boxFontColor:this.props.style.boxFontColor===undefined?'black':this.props.style.boxFontColor,

            /*组名不为字母时，方块边框宽度*/
            boxBorderWidth:this.props.style.boxBorderWidth===undefined?1:this.props.style.boxBorderWidth,

            /*组名不为字母时，方块边框宽度*/
            boxBorderColor:this.props.style.boxBorderColor===undefined?'#DBDBDB':this.props.style.boxBorderColor,

            /*组名不为字母时，方块所在行的北京颜色*/
            boxRowBackgroundColor:this.props.style.boxRowBackgroundColor===undefined?'#ffffff':this.props.style.boxRowBackgroundColor,

            /*列表每一行的高度*/
            ROWHEIGHT :ROWHEIGHT,

            /*图片、标题左边距*/
            imgMarginLeft:this.props.style.imgMarginLeft===undefined?10:this.props.style.imgMarginLeft,
            textMarginLeft:this.props.style.textMarginLeft===undefined?10:this.props.style.textMarginLeft,

            /*主标题字体大小及颜色*/
            headTitleColor:this.props.style.headTitleColor===undefined?'black':this.props.style.headTitleColor,
            headTitleFontSize:this.props.style.headTitleFontSize===undefined?25:this.props.style.headTitleFontSize,

            /*索引的字体大小及颜色*/
            letterFontSize:this.props.style.letterFontSize===undefined?height * 1.1 / 50:this.props.style.letterFontSize,
            letterFontColor:this.props.style.letterFontColor===undefined?'#D0D0D0':this.props.style.letterFontColor,

            /*索引的右边距*/
            letterMarginRight:this.props.style.letterMarginRight===undefined?10:this.props.style.letterMarginRight,

            /*索引的上边距*/
            letterMarginTop:this.props.style.letterMarginTop===undefined?10:this.props.style.letterMarginTop,

            /*索引列表高度*/
            letterHeight:this.props.style.letterHeight===undefined?(height-100) * 4 / 100:this.props.style.letterMarginTop,
            /*索引列表宽度*/
            letterWidth:this.props.style.letterWidth===undefined?width * 4 / 50:this.props.style.letterWidth,

            /*图片的高度、宽度，在主体代码中设置，imageHeight，imageWidth*/
        };

        console.log("state",this.state)
        that = this;
    }

/*选中事件*/
    _cityNameClick(cityJson) {
        // alert('选择了城市====》' + cityJson.id + '#####' + cityJson.name);
        this.props.onSelectCity(cityJson);
    }
/*滚动*/
    _scrollTo(index, letter) {
        this.refs.toast.close();
        let position = 0;
        for (let i = 0; i < index; i++) {
            position += totalheight[i]
        }
        console.log("position:",position);
        this._listView.scrollTo({y: position});
        this.refs.toast.show(letter, DURATION.LENGTH_SHORT);
    }
/*右侧索引*/
    _renderRightLetters(letter, index) {
        return (
            <TouchableOpacity key={'letter_idx_' + index} activeOpacity={0.6} onPress={() => {
                this._scrollTo(index, letter)
            }}>
                <View style={{
                    height: this.state.letterHeight,
                    width: this.state.letterWidth,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: this.state.letterFontSize,
                        color: this.state.letterFontColor,
                    }}>{letter}</Text>
                </View>
            </TouchableOpacity>
        );
    }


/*主体数据列表*/
    _renderListRow(cityJson, rowId) {
        //if (rowId === key_now || rowId === key_hot || rowId === key_last_visit) {

        /*关键字是否为字母*/
        return (

            !(rowId >='A'&&rowId<='Z') ?
/*关键字不是字母*/
                <TouchableOpacity key={'list_item_' + cityJson.id}
                                  style={ {
                                      height: this.state.ROWHEIGHT_BOX,
                                      width: (width - this.state.letterWidth) / this.state.boxNumEveryRow,
                                      flexDirection: 'row',
                                      backgroundColor: this.state.boxRowBackgroundColor,
                                      alignItems:"center",
                                  }}
                                  onPress={() => {that._cityNameClick(cityJson)}}>
                    <View style={{
                        borderWidth: this.state.boxBorderWidth,
                        borderColor: this.state.boxBorderColor,
                        flex:1,
                        marginTop:this.state.boxMarginTop,
                        marginBottom:this.state.boxMarginBottom,
                        marginLeft: this.state.boxMarginLeft,
                        marginRight: this.state.boxMarginRight,
                        height:this.state.ROWHEIGHT_BOX-this.state.boxMarginTop-this.state.boxMarginBottom,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize:this.state.boxFontSize,
                            color:this.state.boxFontColor,
                        }}>{cityJson.name}</Text>
                    </View>
                </TouchableOpacity>

                :
/*关键字是字母*/
            <TouchableOpacity key={'list_item_' + cityJson.id} style={{
                height: this.state.ROWHEIGHT,
                borderBottomColor: '#F4F4F4',
                borderBottomWidth: 0.5,
                flexDirection:'row',
                alignItems:'center',
            }} onPress={() => {
                that._cityNameClick(cityJson)
            }}>
                <View style={{
                    flexDirection:"row",
                    alignItems: 'center',
                }}>
                    {/*照片*/}
                    <View style={{marginLeft:this.state.imgMarginLeft,}}>
                        <Image
                            source={cityJson.image}
                            style={{
                                width:this.props.style.imageWidth===undefined?
                                    this.state.ROWHEIGHT-15:this.props.style.imageWidth,
                                height:this.props.style.imageHeight===undefined?
                                    this.state.ROWHEIGHT-15:this.props.style.imageHeight,
                            }}
                        />
                    </View>
                    {/*标题*/}
                    <View style={{
                        marginLeft:this.state.textMarginLeft,
                        flexDirection:'row',
                        alignItems:"center",
                    }}>
                        <Text style={{
                            color: this.state.headTitleColor,
                            width: width,
                            fontSize:this.state.headTitleFontSize,
                        }}>{cityJson.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
/*分组的组名*/
    _renderListSectionHeader(sectionData, sectionID) {
        return (
            <View style={ {

                height:this.state.SECTIONHEIGHT,
                paddingLeft: this.state.sectionMarginLeft,
                width: width,
                backgroundColor: this.state.sectionBackgroundColor,
                flexDirection:'row',
                alignItems:'center',
            }}>
                <Text style={{
                    color: this.state.sectionFontColor,
                    fontSize:this.state.sectionFontSize,
                }}>
                    {sectionData}
                </Text>
            </View>
        );
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={{height:height-70}}>
                    {/*数据*/}
                    <ListView ref={listView => this._listView = listView}
                              contentContainerStyle={styles.contentContainer}
                              dataSource={this.state.dataSource}
                              renderRow={this._renderListRow.bind(this)}
                              renderSectionHeader={this._renderListSectionHeader.bind(this)}
                              enableEmptySections={true}
                              initialListSize={500}/>
                    {/*索引*/}
                    <View style={{
                        position: 'absolute',
                        height: height,
                        top: this.state.letterMarginTop,
                        bottom: 0,
                        right: this.state.letterMarginRight,
                        backgroundColor: 'transparent',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end'
                        // alignItems: 'center',
                        //justifyContent: 'center'
                    }}>
                        {this.state.letters.map((letter, index) => this._renderRightLetters(letter, index))}
                    </View>
                </View>
                <Toast ref="toast" position='top' positionValue={200} fadeInDuration={750} fadeOutDuration={1000}
                       opacity={0.8}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // paddingTop: 50,
        paddingBottom:50,
    },
    listContainner: {


    },
    contentContainer: {
        flexDirection: 'row',
        width: width,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },

});
