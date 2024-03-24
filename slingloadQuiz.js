import 'react-native-gesture-handler';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, ScrollView, TextInput, FlatList, screen, Button, Dimensions} from 'react-native';
import 'react-native-svg'
import { Card, Provider, Text, useTheme} from 'react-native-paper';
import { styles } from './styleSheet';
import { FontAwesome } from '@expo/vector-icons'; 
import { LineChart } from 'react-native-chart-kit';

export function SlingloadQuizScreen({ navigation, route }) {
    return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
        <View style={{marginTop: -9, marginBottom: 8}}>
            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: "#221f20", height: 45, borderTopWidth: 5, borderBottomWidth: 3, borderColor: "#ffcc01" }}>
                <View style={{alignSelf: 'center', display: 'flex', flex: 1}}>
                <Text style={{alignSelf: 'center', color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>QUIZZES</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Untimed Quiz')}>
            <View style={styles.walkThrough}>
              <View style={styles.innerBox}>
                <Text style={styles.walkThroughText}>Untimed Tests</Text>
              </View>
              <View style={{paddingLeft: 11}}>
                <FontAwesome name="chevron-right" size={16} color="#ffcc01" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Quiz Scores')}>
            <View style={styles.walkThrough}>
              <View style={styles.innerBox}>
                <Text style={styles.walkThroughText}>Your scores</Text>
              </View>
              <View style={{paddingLeft: 11}}>
                <FontAwesome name="chevron-right" size={16} color="#ffcc01" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
    </ScrollView>
    );
}

export function UntimedQuizScreen({ navigation, route }) {
    //truth table for items should match with pictures
    const [items, setItems] = useState({
        placard: null,
        apex: null,
        grabhook: null,
        ChainClevis : null,
        MediumClevis : null,
    });
    const [currentItem, setCurrentItem] = useState('placard');
    const [deficiencyTitle, setDeficiencyTitle] = useState('Deficiency');
    const [nextTitle, setNextTitle] = useState('Next');
    //iterates through items when deficiency/next is pressed and if last item is pressed goes to end screen
    useEffect(() => {
        if (items[currentItem] !== null) {
            const itemKeys = Object.keys(items);
            const currentIndex = itemKeys.indexOf(currentItem);
            if (currentIndex < itemKeys.length - 1) {
                setCurrentItem(itemKeys[currentIndex + 1]);
            } else {
                navigation.navigate('End Quiz');
            }
        }
    }, [items]);
    useEffect(() => {
        if (items[currentItem] === null) {
            setDeficiencyTitle('Deficiency');
            setNextTitle('Next');
        } else if (items[currentItem] === true) {
            setDeficiencyTitle('Unmark');
        } else {
            setNextTitle('Unmark');
        }
        console.log(currentItem);
    }, [currentItem]);
    const handleDeficiencyPress = () => {
        if (items[currentItem] === null) {
            setItems(prevItems => ({ ...prevItems, [currentItem]: true }));
        } else {
            setItems(prevItems => ({ ...prevItems, [currentItem]: null }));
        }
    };
    const handleLeftPress = () => {
        const itemKeys = Object.keys(items);
        const currentIndex = itemKeys.indexOf(currentItem);
        if (currentIndex > 0) {
            setCurrentItem(itemKeys[currentIndex - 1]);
        }
        console.log(itemKeys[currentIndex])
    };
    const handleRightPress = () => {
        const itemKeys = Object.keys(items);
        const currentIndex = itemKeys.indexOf(currentItem);
        if (currentIndex < itemKeys.length - 1) {
            setCurrentItem(itemKeys[currentIndex + 1]);
        }
        console.log(itemKeys[currentIndex])
    };
    const handleNextPress = () => {
        setItems(prevItems => ({ ...prevItems, [currentItem]: false }));
    };
    return (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
            <View style={{marginTop: -9, marginBottom: 8}}>
                <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: "#221f20", height: 45, borderTopWidth: 5, borderBottomWidth: 3, borderColor: "#ffcc01" }}>
                    <View style={{alignSelf: 'center', display: 'flex', flex: 1}}>
                        <Text style={{alignSelf: 'center', color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Untimed Test</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={handleLeftPress}>
                        <FontAwesome name="chevron-left" size={16} color="#ffcc01" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleRightPress}>
                        <FontAwesome name="chevron-right" size={16} color="#ffcc01" />
                    </TouchableOpacity>
                    <Button title={deficiencyTitle} color="red" onPress={handleDeficiencyPress} />
                    <Button title={nextTitle} color="green" onPress={handleNextPress} />
                </View>
            </View>
        </ScrollView>
    );
}



export function EndQuizScreen({ navigation, route }) {
    return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
        <View style={{marginTop: -9, marginBottom: 8}}>
            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: "#221f20", height: 45, borderTopWidth: 5, borderBottomWidth: 3, borderColor: "#ffcc01" }}>
                <View style={{alignSelf: 'center', display: 'flex', flex: 1}}>
                <Text style={{alignSelf: 'center', color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>End Screen stat</Text>
                </View>
            </View>
        </View>
    </ScrollView>
    );
}



export function QuizScoresScreen({ navigation, route }) {
    // Sample data
    const data = {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [
            {
                data: [20, 45, 28, 80, 99],
                strokeWidth: 2, // optional
            },
        ],
    };

    // Get the screen width
    const screenWidth = Dimensions.get('window').width;
    return (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
            <View style={{marginTop: -9, marginBottom: 8}}>
                <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: "#221f20", height: 45, borderTopWidth: 5, borderBottomWidth: 3, borderColor: "#ffcc01" }}>
                    <View style={{alignSelf: 'center', display: 'flex', flex: 1}}>
                        <Text style={{alignSelf: 'center', color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Practical Test Scores</Text>
                    </View>
                </View>
            </View>
            <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 10 }}>Deficiencies Caught</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ justifyContent: 'center', paddingRight: 10 }}>
                    <Text style={{ fontSize: 20 }}>Scores</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <LineChart
                        data={data}
                        width={screenWidth * 0.75} // 3/4 of the screen width
                        height={220}
                        chartConfig={{
                            backgroundColor: '#808080', // greyish color
                            backgroundGradientFrom: '#808080',
                            backgroundGradientTo: '#808080',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                </View>
            </View>
            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 10 }}>Test Number</Text>
        </ScrollView>
    );
}