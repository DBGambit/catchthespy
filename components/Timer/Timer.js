import React, {useState, useEffect} from 'react';
import { View, StatusBar, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";
import LinearGradient from 'react-native-linear-gradient';
import KeepAwake from 'react-native-keep-awake';

import { clickS, endS } from '../../assets/sounds';

const Timer = ({minutes, restart, change, uiLang}) => {
    const [seconds, setSeconds] = useState(minutes * 60)
    const [show, setShow] = useState(false)

    useEffect(() => {
        let interval= null
        if (seconds > 0) {
            interval = setInterval(() => {
                setSeconds(seconds - 1)
            }, 1000)
        }else if (seconds === 0) {
            clearInterval(interval)
            endS()
            setShow(true)
        }
        return () => clearInterval(interval)
    }, [seconds])

    let tw = 0
    let tc = '#096105'
    if (seconds) {
        tw = (seconds / (minutes * 60)) * 100
        tc = tw > 50 ? tc : tw > 15 ? '#b84b14' : 'brown'
        tm = Math.floor(seconds / 60)
        ts = seconds % 60
    }

    return (
            <View style={styles.TimerLayout} >
                <StatusBar hidden />
                <LinearGradient
                    colors={['white', 'grey']}
                    style={styles.Background}
                />
                {
                    show ?
                    <View style={{marginTop: responsiveHeight(35)}} >
                        <TouchableOpacity style={styles.Button} onPress={() => [restart(), clickS()]} >
                            <Text style={[styles.Text, {color: '#0a420a'}]} >{uiLang.again}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.Button} onPress={() => [change(), clickS()]} >
                            <Text style={[styles.Text, {color: '#7a0c02'}]} >{uiLang.change}</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{marginTop: responsiveHeight(30)}}>
                        <KeepAwake />
                        <Text style={styles.Timer} >{tm} : {ts < 10 ? 0 : null}{ts}</Text>
                        <View style={styles.TimerBar} >
                            <View
                                style={{
                                        height: '100%',
                                        width: `${tw}%`,
                                        // borderRadius: 15,
                                        backgroundColor: tc
                                    }}

                            ></View>
                        </View>
                        <TouchableOpacity style={styles.Button} onPress={() => [change(), clickS()]} >
                            <Text style={[styles.Text, {color: '#7a0c02'}]} >{uiLang.back}</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
};

const styles = StyleSheet.create({
    TimerLayout: {
        width: '100%',
        height: '100%'
    },
    Background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    ButtonOpacity: {
        width: responsiveWidth(60),
        alignSelf: 'center',
        // borderWidth: 1,
        // borderColor: 'red',
        marginBottom: responsiveHeight(5)
    },
    Button: {
        borderWidth: 3,
        borderRadius: 15,
        width: responsiveWidth(60),
        height: responsiveHeight(6.9),
        alignSelf: 'center',
        elevation: 10,
        backgroundColor: '#babfba',
        marginBottom: responsiveHeight(7)
    },
    Text: {
        fontSize: responsiveHeight(3.9),
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },
    Timer: {
        fontSize: responsiveFontSize(5),
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: responsiveHeight(5),
        color: '#7a0c02'
    },
    TimerBar: {
        width: responsiveWidth(80),
        height: responsiveHeight(5),
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 20,
        alignSelf: 'center',
        marginBottom: responsiveHeight(10),
        overflow: 'hidden',
        backgroundColor: '#babfba',
        elevation: 7
    }
})

export default Timer;
