'use strict';
import React, {Component} from 'react';
import {
    View,
    StyleSheet, Dimensions,
} from 'react-native';

import CityList from './IndexListView';

// 下面是数据部分
import DATA_JSON from '../test-react-native-indexlist/data.json';

/*const NOW_CITY_LIST = [
    {
        "name": "上海",
        "spellName": "shanghai",
        "id": 3100,
        "fullname": "上海/上海",
        "sortLetters": "s"
    }
];*/


export default class SimpleSelectCity extends Component {
    static navigationOptions={
        title:'索引定位列表页'
    }
    constructor(props) {
        super(props);
        this.state = {
            showSearchResult: false,
            keyword: '',
            searchResultList: [],
            allCityList: this.props.param.allData,
            hotCityList: this.props.param.hotCityList,
            lastVisitCityList: this.props.param.lastVisitCityList,
            //nowCityList: NOW_CITY_LIST,
            data:this.props.param,
        };

        console.log("title:",this.props.param.hotCityList);
    }

    onPressBack() {
        alert('你选择了返回====》header back');
    }

    onChanegeTextKeyword(newVal) {
        if (newVal === '') {
            this.setState({showSearchResult: false});
        } else {
            // 在这里过滤数据结果
            let dataList = this.filterCityData(newVal);

            this.setState({keyword: newVal, showSearchResult: true, searchResultList: dataList});
        }
    }

    filterCityData(text) {
        console.log('search for list', text);

        let rst = [];
        for (let idx = 0; idx < this.state.allCityList.length; idx++) {
            let item = this.state.allCityList[idx];
            if (item.name.indexOf(text) === 0 || item.spellName.indexOf(text) === 0) {
                rst.push(item);
            }
        }
        return rst;
    }

    onSelectCity(cityJson) {
        if (this.state.showSearchResult) {
            this.setState({showSearchResult: false, keyword: ''});
        }

        this.props.Show!==undefined&&this.props.Show(cityJson);
    }

    render() {
        return (
            <View style={styles.container}>
{/*
                <Header onPressBack={this.onPressBack.bind(this)} title="城市列表"/>
*/}
                        <CityList
                            onSelectCity={this.onSelectCity.bind(this)}
                            allCityList={this.state.allCityList}

                            Data={this.state.data}
                            style={this.props.style!==undefined?this.props.style:{}}
                            //nowCityList={this.state.nowCityList}
                        />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

        height:Dimensions.get('window').height-90,
        flex:1,
        // paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏
    },
    currentCity: {
        backgroundColor: '#ffffff',
        height: 20,
        margin: 5
    },
    currentCityText: {
        fontSize: 16
    }
});
