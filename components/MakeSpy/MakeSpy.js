import React, { useState } from 'react';
import { StyleSheet, StatusBar, Text, View, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

import { showS, hideS, clickS } from '../../assets/sounds';

const MakeSpy = ({players, persons, startTimer, uiLang,t}) => {
    const [count, setCount] = useState(0)
    const [show, setShow] = useState(false)
    console.log('updt', t)
    return (
            <View style={styles.ShowHide} >
                <StatusBar hidden />
                <LinearGradient
                    colors={['white', 'grey']}
                    style={styles.Background}
                />
                {
                    count === players ?
                    <TouchableOpacity style={styles.Time} onPress={() => [startTimer(), clickS()]} >
                        <Text style={styles.TimeText} >{uiLang.time}</Text>
                    </TouchableOpacity>
                    :
                    <View style={styles.Wrapper} >
                        <Text style={styles.Word} >{uiLang.playersMake} {count + 1}/{players}</Text>
                        {
                            !show ?
                            <TouchableOpacity style={{ alignSelf: 'center'}} onPress={() => [setShow(!show), showS()]} >
                                <Text style={styles.Word} >{uiLang.open}</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => [setShow(!show), setCount(count+1), hideS()]} >
                                <Text style={styles.Word} >{uiLang.close}</Text>
                            </TouchableOpacity>
                        }
                        {
                            persons[count] !== 'լրտես' && show ?
                            <Text style={{color: 'brown', fontSize: responsiveFontSize(3), textAlign: 'center', fontWeight: 'bold'}} >{persons[count]}</Text>
                            : null
                        }
                        {
                            persons[count] === 'լրտես' && show ?
                                <Icon name='user-secret' style={{alignSelf: 'center', fontSize: responsiveWidth(15), marginLeft: responsiveWidth(2.1)}} />
                            : null
                        }
                    </View>
                }
            </View>
        );
};

export default MakeSpy;

const styles = StyleSheet.create({
    test: {
        marginTop: responsiveHeight(35),
        alignSelf: 'center',
        width: responsiveWidth(60),
        fontSize: responsiveFontSize(3.5),
        fontWeight: 'bold',
        textAlign: 'center',
        borderColor: 'green',
        borderWidth: 3,
        borderRadius: 10,
    },
    ShowHide: {
        width: '100%',
        height: '100%'
    },
    Background: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    Wrapper: {
        marginTop: responsiveHeight(30),
    },
    Word: {
        fontSize: responsiveFontSize(4),
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: responsiveHeight(3),
        // borderColor: 'red',
        // borderWidth: 1
    },
    Time: {
        marginTop: responsiveHeight(35),
        alignSelf: 'center',
        borderWidth: 3,
        borderRadius: 15,
        width: responsiveWidth(60),
        height: responsiveHeight(6.9),
        elevation: 10,
        backgroundColor: '#d7dbd7'
    },
    TimeText: {
        fontSize: responsiveHeight(3.9),
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#0a420a',
    }
})
