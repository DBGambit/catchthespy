
import React, { Component } from 'react';
import { ScrollView, StyleSheet, StatusBar, Text, View, TouchableOpacity, FlatList } from 'react-native';

import { Armenian, English, Russian } from './languages';
import { deepCopy } from './tools';
import { responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';

import AnimatedButton from './components/AnimatedButton/AnimatedButton';
import ArmenianSvg from './assets/languageSvg/ArmenianSvg';
import EnglishSvg from './assets/languageSvg/EnglishSvg';
import RussianSvg from './assets/languageSvg/RussianSvg';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import MakeSpy from './components/MakeSpy/MakeSpy';
import Timer from './components/Timer/Timer';

import { clickS } from './assets/sounds';

export default class App extends Component {
    state = {
        players: 3,
        spies: 1,
        minutes: 5,
        language: deepCopy(Armenian),
        themeIndex: 0,
        playing: false,
        persons: [],
        timer: false,
        showRules: false,
        l: 'arm'
    }

    componentDidMount() {
        // console.log(responsiveWidth(100), responsiveHeight(100), responsiveFontSize(100))
    }

    componentDidUpdate() {
        // console.log(this.state.showRules)
    }

    showRulesToggler = () => {
        if (!this.state.showRules) {
            clickS()
        }
        this.setState(prevState => {
            return {
                showRules: !prevState.showRules
            }
        })
    }

    plusMinusHandler = (type) => {
        if (type === 'minus' && this.state.players > 3) {
            clickS()
            if (this.state.players > this.state.spies + 2) {
                this.setState({players: this.state.players - 1})
            }else {
                this.setState({
                    players: this.state.players - 1,
                    spies: this.state.spies - 1
                })
            }
        }
        if (type === 'plus' && this.state.players < 15) {
            clickS()
            this.setState({players: this.state.players + 1})
        }
        if (type === 'minusspy' && this.state.spies > 1) {
            clickS()
            this.setState({spies: this.state.spies - 1})
        }
        if (type === 'plusspy' && this.state.spies < (this.state.players - 2)) {
            clickS()
            this.setState({spies: this.state.spies + 1})
        }
        if (type === 'minusminute' && this.state.minutes > 1) {
            clickS()
            this.setState({minutes: this.state.minutes - 1})
        }
        if (type === 'plusminute' && this.state.minutes < 10) {
            clickS()
            this.setState({minutes: this.state.minutes + 1})
        }
        return
    }

    ConfirmHandler = () => {
        clickS()
        let theme = [...this.state.language.themes[this.state.themeIndex].slice(1)]
        let word = theme[Math.round(Math.random() * (theme.length - 1))]
        let updtLang = deepCopy(this.state.language)
        updtLang.themes[this.state.themeIndex] = updtLang.themes[this.state.themeIndex].filter(w => w !== word)
        if (updtLang.themes[this.state.themeIndex].length === 1) {
            switch(this.state.l) {
                case 'arm':
                    updtLang.themes[this.state.themeIndex] = deepCopy(Armenian.themes[this.state.themeIndex])
                    break;
                case 'eng':
                    updtLang.themes[this.state.themeIndex] = deepCopy(English.themes[this.state.themeIndex])
                    break;
                case 'rus':
                    updtLang.themes[this.state.themeIndex] = deepCopy(Russian.themes[this.state.themeIndex])
                    break;
            }
        }
        let persons = []
        for (let i=0; i<this.state.players-this.state.spies; i++) {
            persons.push(word)
        }
        for (let i=0; i<this.state.spies; i++) {
            persons.push('լրտես')
        }
        for (let i = persons.length - 1; i>0; i--) {
          let j = Math.floor(Math.random() * ( i+1 ))
          let tmp = persons[i]
          persons[i] = persons[j]
          persons[j] = tmp
        }
        this.setState({
            persons: persons,
            playing: true,
            language: updtLang
        })
    }

    startTimerHandler = () => {
        this.setState({timer: true})
    }

    restartHandler = () => {
        this.ConfirmHandler()
        this.setState({
            timer: false
        })
    }

    changeHandler = () => {
        this.setState({
            playing: false,
            persons: [],
            timer: false
        })
    }

    render() {
        const {players, spies, minutes, showRules, language, playing, persons, timer, themeIndex} = this.state
        return (
            timer ?
            <Timer restart={this.restartHandler} change={this.changeHandler} minutes={minutes} uiLang={language.ui} />
            :
            playing ?
            <MakeSpy t={this.state.language.themes[this.state.themeIndex]} persons={persons} players={players} startTimer={this.startTimerHandler} uiLang={language.ui} />

            : <View style={styles.Container}>
                <StatusBar hidden />
                <LinearGradient
                    colors={['white', 'grey']}
                    style={styles.Background}
                />
                <Text onPress={() => clickS()} style={styles.Logo} >{language.ui.logo}</Text>
                <Modal
                    isVisible={showRules}
                    animationIn='slideInDown'
                    animationInTiming={300}
                    animationOut='slideOutUp'
                    animationOutTiming={300}
                    coverScreen={true}
                    onBackdropPress={this.showRulesToggler}
                    useNativeDriver={true}
                    >
                    <View style={styles.RulesView} >
                        <View style={{width: '90%', height: '85%', alignSelf: 'center'}} >
                            <ScrollView showsVerticalScrollIndicator={false} >
                                <Text style={{fontSize: responsiveFontSize(2), color: '#7a0c02'}} >{language.ui.rulesTxt}</Text>
                            </ScrollView>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.setState({showRules: false})}
                            style={{
                                position: 'absolute',
                                alignSelf: 'center',
                                top: '90%'
                            }} >
                            <Text style={{textAlign: 'center', fontSize: responsiveFontSize(3), color: 'green', fontStyle: 'italic'}} >{language.ui.closeRules}</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <View style={styles.UpperSettings} >
                    <View style={styles.Languages} >
                        <TouchableOpacity onPress={() => [this.setState({language: deepCopy(Armenian), l: 'arm'}), clickS()]} style={styles.Language} >
                            <ArmenianSvg />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => [this.setState({language: deepCopy(English), l: 'eng'}), clickS()]} style={styles.Language} >
                            <EnglishSvg />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => [this.setState({language: deepCopy(Russian), l: 'rus'}), clickS()]} style={styles.Language} >
                            <RussianSvg />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={this.showRulesToggler} style={styles.RulesButton} >
                        <Text includeFontPadding={false} textAlignVertical='center' style={styles.Rules} >{language.ui.rules}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.Settings} >
                    <View style={styles.Setting} >
                        <AnimatedButton action={this.plusMinusHandler} actionType='minus' type='minus' size={responsiveHeight(4.5)} active={players > 3} />
                        <View style={{width: '37%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
                            <Icon name='users' style={{alignSelf: 'center'}} size={responsiveHeight(4.5)} color='brown' />
                            <Text style={{lineHeight: responsiveHeight(5.4),fontSize: responsiveHeight(5),fontWeight: 'bold', color: 'brown'}} >{players}</Text>
                        </View>
                        <AnimatedButton action={this.plusMinusHandler} actionType='plus' type='plus' size={responsiveHeight(4.5)} active={players < 15 ? true : false} />
                    </View>
                    <View style={styles.Setting} >
                        <AnimatedButton action={this.plusMinusHandler} actionType='minusspy' type='minus' size={responsiveHeight(4.5)} active={spies > 1 ? true : false} />
                        <View style={{width: '37%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
                            <Icon name='user-secret' style={{alignSelf: 'center'}} size={responsiveHeight(5)} color='black' />
                            <Text style={{lineHeight: responsiveHeight(5.4),fontSize: responsiveHeight(5),fontWeight: 'bold'}} >{spies}</Text>
                        </View>
                        <AnimatedButton action={this.plusMinusHandler} actionType='plusspy' type='plus' size={responsiveHeight(4.5)} active={players-spies > 2 ? true : false} />
                    </View>
                    <View style={styles.Setting} >
                        <AnimatedButton action={this.plusMinusHandler} actionType='minusminute' type='minus' size={responsiveHeight(4.5)} active={minutes > 1 ? true : false} />
                        <View style={{display: 'flex', flexDirection: 'row', width: '37%'}} >
                            <View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
                                <Feather name='clock' style={{alignSelf: 'center'}} size={responsiveHeight(4.5)} color='green' />
                                <Text style={{lineHeight: responsiveHeight(5.3),fontSize: responsiveHeight(5),fontWeight: 'bold', color: 'green'}} >{minutes}</Text>
                            </View>
                            <Text style={{lineHeight: responsiveHeight(5.3),fontSize: responsiveHeight(3),fontWeight: 'bold', color: 'green'}} >{language.ui.minutes}</Text>
                        </View>
                        <AnimatedButton action={this.plusMinusHandler} actionType='plusminute' type='plus' size={responsiveHeight(4.5)} active={minutes < 10 ? true : false} />
                    </View>
                </View>
                <View style={styles.ThemeN} >
                    <Text style={{marginRight: '10%', fontSize: responsiveFontSize(2.5),fontWeight: 'bold', color: '#7a0c02'}} >{language.ui.theme}</Text>
                    <Text style={{fontStyle: 'italic', color: 'green', fontSize: responsiveFontSize(2.5),fontWeight: 'bold'}} >{this.state.language.themes[themeIndex][0]}</Text>
                </View>
                <View style={styles.Themes} >
                    <FlatList
                        data={language.themes}
                        renderItem={({item, index}) => {
                            return (
                                    <View style={{ height: responsiveHeight(9.3)}} >
                                        <TouchableOpacity style={{ width: '70%', alignSelf: 'center'}} onPress={() => [this.setState({theme: deepCopy(item), themeIndex: index}), clickS()]}>
                                            <Text style={styles.Theme}>{item[0]}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                        }}
                        keyExtractor={(item) => item[0]}
                    />
                </View>
                <TouchableOpacity style={styles.Start} onPress={() => this.ConfirmHandler()} >
                    <Text style={{fontSize: responsiveFontSize(3.5), fontWeight: 'bold', textAlign: 'center'}} >{language.ui.start}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Logo: {
        marginTop: responsiveHeight(3.5),
        borderWidth: 3,
        borderColor: '#7a0c02',
        fontSize: responsiveFontSize(4),
        fontWeight: 'bold',
        textAlign: 'center',
        width: responsiveWidth(90),
        alignSelf: 'center',
        borderRadius: 10,
        color: 'black',
        backgroundColor: '#f0ebeb',
        elevation: 15
    },
    UpperSettings: {
        marginTop: responsiveHeight(1.5),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: responsiveWidth(80),
        height: responsiveHeight(5),
        alignSelf: 'center',
        // borderColor: 'green',
        // borderWidth: 1
    },
    Languages: {
        display: 'flex',
        flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: 'red',
        width: '50%'
    },
    Language: {
        width: responsiveHeight(3.5),
        height: responsiveHeight(3.5),
        // borderWidth: 1,
        // borderColor: 'blue',
        marginRight: '12%',
        alignSelf: 'center'
    },
    RulesButton: {
        // borderColor: 'blue',
        // borderWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        height: responsiveHeight(5)
        // alignItems: 'center',
    },
    Rules: {
        // borderWidth: 1,
        // borderColor: 'red',
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        color: '#7a0c02',
        textAlign: 'center'
    },
    RulesView: {
        width: '80%',
        height: '80%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: '#7a0c02',
        borderRadius: 15

    },
    Settings: {
        display: 'flex',
        justifyContent: 'space-between',
        height: responsiveHeight(23),
        width: responsiveWidth(80),
        alignSelf: 'center',
        // borderWidth: 1,
        // borderColor: 'blue',
        marginTop: responsiveHeight(3)
    },
    Setting: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: responsiveHeight(5),
        // borderWidth: 1,
        // borderColor: 'green',
    },
    SettingText: {
        fontSize: responsiveHeight(3),
        // fontStyle: 'italic',
        fontWeight: 'bold',
        // borderWidth: 1,
        // borderColor: 'orange'
    },
    plus: {
        color: 'green',
        fontSize: responsiveHeight(5),
        width: responsiveHeight(5),
        height: responsiveHeight(5),
        alignSelf: 'center'
    },
    minus: {
        color: 'brown',
        fontSize: responsiveHeight(5),
        width: responsiveHeight(5),
        height: responsiveHeight(5),
        alignSelf: 'center'
    },
    ThemeN: {
        marginTop: responsiveHeight(5),
        width: responsiveWidth(90),
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: 'blue'
    },
    Themes: {
        marginTop: responsiveHeight(5),
        width: responsiveWidth(90),
        height: responsiveHeight(25),
        alignSelf: 'center',
        // borderColor: 'red',
        // borderWidth: 1
    },
    Theme: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 15,
        elevation: 19,
        backgroundColor: '#363332',
        color: 'brown',
        width: '100%',
        alignSelf: 'center',
    },
    Container: {
        width: '100%',
        height: '100%'
    },
    Background: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    Start: {
        position: 'absolute',
        top: responsiveHeight(90),
        width: responsiveWidth(50),
        borderWidth: 3,
        borderColor: '#7a0c02',
        borderRadius: 10,
        alignSelf: 'center',
    }
})
