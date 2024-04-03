import 'react-native-gesture-handler';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, ScrollView, TextInput, FlatList, screen, Button, Dimensions} from 'react-native';
import 'react-native-svg'
import { Card, Provider, Text, useTheme} from 'react-native-paper';
import { styles } from './styleSheet';
import { FontAwesome } from '@expo/vector-icons'; 
import { LineChart } from 'react-native-chart-kit';
import SlingloadDropdown from './slingload';
import { QuizScoresContext } from './quizScoresContext.js';

const screenDimension = Dimensions.get("screen");
const isPhone = screenDimension.width < 900;

const deficientImages = [
                       {key: 'Apex' , image: require('./assets/DeficientApex_CotterPin.png'),trueAnswer: true, userAnswer: null },
                       {key: 'Apex' ,image: require('./assets/DeficientApex_InvertedNut.png'),trueAnswer: true, userAnswer: null },
                       {key: 'Apex' ,image: require('./assets/DeficientApex_NutMissing.png'),trueAnswer: true, userAnswer: null },
                       {key: 'Apex' ,image: require('./assets/DeficientApex_SpacerMissing.png'),trueAnswer: true, userAnswer: null },
                       {key: 'Bag' ,image: require('./assets/DeficientBag1.png'),trueAnswer: true, userAnswer: null },
                       {key: 'Bag' ,image: require('./assets/DeficientBag2.png'),trueAnswer: true, userAnswer: null },
                       {key: 'Bag' ,image: require('./assets/DeficientBag3.png'),trueAnswer: true, userAnswer: null },
                       {key: 'Bag' ,image: require('./assets/DeficientBag4.png'),trueAnswer: true, userAnswer: null },
                       {key: 'Bag' ,image: require('./assets/DeficientBag5.png'),trueAnswer: true, userAnswer: null },
                       {key: 'Chain Clevis' ,image: require('./assets/DeficientChainClevis.png'),trueAnswer: true, userAnswer: null },
                       {key: 'GrabHook' ,image: require('./assets/DeficientGrabhook_DomeNutMissing.png'),trueAnswer: true, userAnswer: null },
                       {key: 'GrabHook' ,image: require('./assets/DeficientGrabhook_ExtraLink.png'),trueAnswer: true, userAnswer: null },
                       {key: 'GrabHook' ,image: require('./assets/DeficientGrabhook_Inverted.png'),trueAnswer: true, userAnswer: null },
                       {key: 'GrabHook' ,image: require('./assets/DeficientGrabhook_Inverted2.png'),trueAnswer: true, userAnswer: null },
                       {key: 'GrabHook' ,image: require('./assets/DeficientGrabhook_LockNutMissing.png'),trueAnswer: true, userAnswer: null },
                       {key: 'GrabHook' ,image: require('./assets/DeficientGrabhook_MissingLink.png'),trueAnswer: true, userAnswer: null },
                       {key: 'Placard' ,image: require('./assets/DeficientPlacard_Tight.png'),trueAnswer: true, userAnswer: null },
                       {key: 'Placard' ,image: require('./assets/DeficientPlacard_Weight.png'),trueAnswer: true, userAnswer: null }]

const normalImages = [{key: 'Apex' ,image: require('./assets/Apex_Bottom.png'),trueAnswer: false, userAnswer: null },
                        {key: 'Bottom Lateral C1' ,image: require('./assets/BotLateralC1_Center.png'),trueAnswer: false, userAnswer: null },
                        {key: 'Chain Clevis' ,image: require('./assets/ChainClevis_Left_Top.png'),trueAnswer: false, userAnswer: null },
                        {key: 'GrabHook' ,image: require('./assets/GrabHook_Left.png'),trueAnswer: false, userAnswer: null },
                        {key: 'Medium Clevis' ,image: require('./assets/MediumClevis_Center.png'),trueAnswer: false, userAnswer: null },
                        {key: 'Middle Lateral C1' ,image: require('./assets/MidLateralC1_Center.png'),trueAnswer: false, userAnswer: null },
                       {key: 'Placard' ,image: require('./assets/placard_Center.png'),trueAnswer: false, userAnswer: null },
                       {key: 'Strap Side' ,image: require('./assets/StrapSide_Right_Top.png'),trueAnswer: false, userAnswer: null },
                       {key: 'Suspension 1' ,image: require('./assets/Suspension1_Center.png'),trueAnswer: false, userAnswer: null },
                       {key: 'Suspension 2' ,image: require('./assets/Suspension2_Center_Top.png'),trueAnswer: false, userAnswer: null },
                       {key: 'Suspension Strap Order' ,image: require('./assets/SusStrapOrder_Center_Top.png'),trueAnswer: false, userAnswer: null },
                       {key: 'Top Lateral C1' ,image: require('./assets/TopLateralC1_Center.png'),trueAnswer: false, userAnswer: null }]

function shuffleArray(array){
    for (let i = array.length - 1; i > 0; i--) {
        const randIndex = Math.floor(Math.random() * (i + 1));

        [array[i], array[randIndex]] = [array[randIndex], array[i]]
    }
}
export function SlingloadQuizScreen({ navigation, route }) {
    const theme = useTheme();
    return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
        <View style={{marginTop: -9, marginBottom: 8}}>
            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: "#221f20", height: 45, borderTopWidth: 5, borderBottomWidth: 3, borderColor: "#ffcc01" }}>
                <View style={{alignSelf: 'center', display: 'flex', flex: 1}}>
                <Text style={{alignSelf: 'center', color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>QUIZZES</Text>
                </View>
            </View>

            <View>
            <Text style={[styles.inspectorTitle, {marginTop: isPhone? 15 : 30, marginBottom: isPhone? 15 : 30}]}>PRACTICAL TEST</Text>
            </View>
        <View style={styles.slTestR1}>
            <View style={styles.slTestR1C1}>
            <View>
                <Text style={{fontSize: isPhone? 20 : 35, alignSelf: 'center', marginBottom: 10}}>A-22 Cargo Bag</Text>
                <View style={[styles.slTestR1B, {backgroundColor: theme.colors.backdrop, borderColor: theme.colors.onSurfaceVariant}]}>
                    <Image source={require("./assets/Bag 1.png")} 
                        style={{
                        width: 'auto',
                        height: isPhone? 180 : 250,
                        resizeMode: 'contain',
                        }}/>
                </View>

            </View>
            </View>
            <View style={[styles.slTestR1VerticalBar, {borderColor: theme.colors.onSurfaceVariant}]}>
            </View>
            <View style={styles.slTestR1C2}>
                <TouchableOpacity onPress={() => navigation.navigate('Untimed Quiz',{ timed: false })}>
                    <View style={[styles.basicButton, {backgroundColor: theme.colors.backdrop, borderColor: theme.colors.onSurfaceVariant}]}>
                        <Text style={styles.slButtonText}>Untimed Tests</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Untimed Quiz',{ timed: true })}>
                    <View style={[styles.basicButton, {backgroundColor: theme.colors.backdrop, borderColor: theme.colors.onSurfaceVariant}]}>
                        <Text style={styles.slButtonText}>Timed Tests</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Quiz Scores')}>
                    <View style={[styles.basicButton, {backgroundColor: theme.colors.backdrop, borderColor: theme.colors.inverseSurface}]}>
                        <Text style={styles.slButtonText}>Your scores</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>

        </View>
    </ScrollView>
    );
}

export function UntimedQuizScreen({ navigation, route }) {

    const { timed } = route.params; 
    console.log(timed)
    const [QuizImages, setQuizImages] = useState(() => {
        let images = [];
        let imagesLength = Math.floor(Math.random() * (13)) + 4;
        if (imagesLength === 4){
            shuffleArray(deficientImages);
            images = deficientImages.slice(0,4);
        }
        else{
            shuffleArray(deficientImages);
            shuffleArray(normalImages);
            images.push(... deficientImages.slice(0,4));
            images.push(...normalImages.slice(0,(imagesLength - 4)))
            shuffleArray(images)
        }
        console.log(images)
        return images;
    });
    const theme = useTheme();


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
    const [elapsedTime, setElapsedTime] = useState(0);
    const [running, setRunning] = useState(true);
    const [currentArrayIndex, setCurrentArrayIndex] = useState(0)
    //iterates through items when deficiency/next is pressed and if last item is pressed goes to end screen
    useEffect(() => {
        let interval = null;
        if (running) {
            interval = setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1);
            }, 1000);
        } else if (!running && interval !== null) {
            clearInterval(interval);
        }
        if (timed === true ) {
            if (elapsedTime > 120) {
                navigation.navigate('End Quiz', { imageArray: QuizImages, elapsedTime: elapsedTime - 1})
                clearInterval(interval);
            }
        }
        return () => {
            if (interval !== null) {
                clearInterval(interval);
            }
        };
    }, [running, elapsedTime, timed]);
    const handleDeficiencyPress = () => {
        QuizImages[currentArrayIndex].userAnswer = QuizImages[currentArrayIndex].userAnswer === null ? true : null;
        if (currentArrayIndex < QuizImages.length - 1) {
            setCurrentArrayIndex(prevIndex => prevIndex + 1);
        }
    };
    
    const handleNextPress = () => {
        QuizImages[currentArrayIndex].userAnswer = QuizImages[currentArrayIndex].userAnswer === null ? false : null;
        if (currentArrayIndex < QuizImages.length - 1) {
            setCurrentArrayIndex(prevIndex => prevIndex + 1);
        }
    };
    
    useEffect(() => {
        if (QuizImages[currentArrayIndex].userAnswer === null) {
            setDeficiencyTitle('Deficiency');
            setNextTitle('Next');
        } else if (QuizImages[currentArrayIndex].userAnswer === true) {
            setDeficiencyTitle('Unmark');
            setNextTitle('Next');
        } else {
            setDeficiencyTitle('Deficiency');
            setNextTitle('Unmark');
        }
    }, [QuizImages, currentArrayIndex, QuizImages[currentArrayIndex].userAnswer]);
    const handleLeftPress = () => {
        if (currentArrayIndex > 0) {
            setCurrentArrayIndex(prevIndex => prevIndex - 1);
        }
    };
    const handleRightPress = () => {
        if (currentArrayIndex < QuizImages.length - 1) {
            setCurrentArrayIndex(prevIndex => prevIndex + 1);
        }
    };
    const toggleStopwatch = () => {
        setRunning(prevRunning => !prevRunning);
    }
    const [menuVisible, setMenuVisible] = useState(false);

    const handleHamburgerClick = () => {
      setMenuVisible(!menuVisible);
    };

    const elements = QuizImages.map(image => image.key);
    // const index = elements.indexOf(element);
    // Initialize result array to store mark colors
    const initialResults = Array(elements.length).fill('unmarked');
    const [result, setResult] = useState(initialResults);

    const initialButtonState = Array(elements.length).fill('unmarked');
    const [buttonStates, setButtonStates] = useState(initialButtonState);
  
    // Initialize current state to first element
    const [currentState, setCurrentState] = useState(elements[0]);
  
    const handleItemClick = (element) => {
        const updatedIndex = setCurrentArrayIndex(elements.indexOf(element));

      setCurrentState(elements[updatedIndex]);
    };
    const handleButtonClick = (buttonType) => {
        const currentIndex = currentArrayIndex;
        if ((deficiencyTitle === 'unmark') || (nextTitle === 'unmark')) {
          // Reset mark color for current element
          const updatedResult = [...result];
          updatedResult[currentIndex] = 'unmarked';
          setResult(updatedResult);
          setCurrentState(elements[currentArrayIndex]);
  
          // Restore buttons to original state
          const updatedButtonStates = [...buttonStates];
          updatedButtonStates[currentIndex] = buttonType;
          setButtonStates(updatedButtonStates);
        } else if (currentIndex < elements.length) {
          // Toggle mark color for current element
          const updatedResult = [...result];
          updatedResult[currentIndex] = buttonType === 'deficiency' ? 'red' : 'green';
          setResult(updatedResult);
    
          // Toggle button state for current element
          const updatedButtonStates = [...buttonStates];
          updatedButtonStates[currentIndex] = buttonType === 'deficiency' ? 'deficiency' : 'unmark';
              if (buttonType === 'unmark') {
                          // Reset mark color for current element
              updatedResult[currentIndex] = 'unmarked';
              setResult(updatedResult);
  
              }
          // setButtonStates(updatedButtonStates);
    
          // // Move to next element
          setCurrentState(elements[currentArrayIndex]);
  
        }
      };
  
    return (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
        <View style={{marginTop: -9, marginBottom: 8}}>
            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: "#221f20", height: 45, borderTopWidth: 5, borderBottomWidth: 3, borderColor: "#ffcc01" }}>
                <View style={{alignSelf: 'center', display: 'flex', flex: 1}}>
                    <Text style={{alignSelf: 'center', color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Untimed Test</Text>
                </View>
            </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme.colors.backdrop, height: '100vh', width: '100wh'}}>
                    <View style={[styles.untimedTestC1, {alignItems: 'center'}]}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
                        </View>
                        <View style={[styles.deficiencyButton]}>
                            <TouchableOpacity onPress={handleDeficiencyPress}>
                                <Text style={{fontSize: isPhone? 20 : 35, color: '#E8E2D9'}}>{deficiencyTitle}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.nextUntimedTestButton]}>
                            <TouchableOpacity onPress={handleNextPress}>
                                <Text style={{fontSize: isPhone? 20 : 35, color: '#E8E2D9'}}>{nextTitle}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.endTestButton]}>
                            <TouchableOpacity onPress={() => navigation.navigate('End Quiz', { imageArray: QuizImages, elapsedTime: elapsedTime })}>
                                <Text style={{fontSize: isPhone? 18 : 22, color: '#E8E2D9'}}>End Test</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.untimedTestC2}>
                    
                        <TouchableOpacity onPress={handleLeftPress}>
                            <FontAwesome name="chevron-left" size={16} color="#ffcc01" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleRightPress}>
                            <FontAwesome name="chevron-right" size={16} color="#ffcc01" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleHamburgerClick}>
                            <FontAwesome name="bars" size={isPhone? 24 : 50} color="black" />
                        </TouchableOpacity>

<View style={{ flexDirection: 'column', flex: isPhone? 1 : 0.3, width: isPhone? 'auto' : 420, marginTop: isPhone? 5 : -15, marginLeft: isPhone? 5 : '60%'}}>
      {/* Menu box */}
        {menuVisible && (<View style={{justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.7)', width: 'auto', paddingLeft: isPhone? 'none' : 25}}>
        {/* Menu items */}
        <View style={{backgroundColor: theme.colors.backdrop, marginTop: isPhone? 10: -70, height: isPhone? 'auto': 100, padding: isPhone? 1 : 15, width: isPhone? 150 : 420, justifyContent: 'center', marginLeft: isPhone? 'auto' : -25, marginBottom: isPhone? 5 : -25}}>
                <Text style={{marginLeft: isPhone? 'auto' : 45, zIndex: 3, color: '#E8E2D9', fontSize: isPhone? 20 : 30, marginBottom: isPhone? 5 : 15}}>SECTION MENU</Text>
            </View>
        {elements.map((element, index) => (
          <TouchableOpacity key={index} onPress={() => handleItemClick(element)} style={{ padding: 10, flexDirection: 'row'}}>

            <View style={{ width: 300, height: 55, borderRadius: 10, borderWidth: 3, borderColor: 'rgba(232, 226, 217, 0.4)', justifyContent: 'center', margin: 5,}}>
            {result[index] === 'red' && (
                <View style={{justifyContent: 'center', marginRight: isPhone? 5 : 25, marginLeft: isPhone? 5 : 20}}>
                <Text style={{color: 'red', fontSize: isPhone? 18 : 30, fontWeight: 600}}>X</Text>
                </View>
            //   <FontAwesome name="check" size={16} color="red" style={{ marginLeft: 10 , backgroundColor: 'red'}} />
            )}
            <View style={{justifyContent: 'center', marginLeft: isPhone? 5 : 20, marginRight: isPhone? 5 : 25}}>
            {result[index] === 'green' && (
                <View style={{backgroundColor: 'green', width: 25, height: 25, borderRadius: 25}}></View>
            //   <FontAwesome name="check" size={16} color="green" style={{ marginLeft: 10 }} />
            )}
            </View>
            <View style={{marginLeft: 60, position: 'absolute', paddingVertical: 2}}>
                <Text style={{fontSize: isPhone? 18 : 30, color: '#E8E2D9'}}>{element}</Text>
            </View>
            </View>

          </TouchableOpacity>
        ))}
      </View>
        )}
      {/* Buttons to toggle item states */}
      <View style={{marginLeft: isPhone? 10 : '-80%', zIndex: 5, marginTop: isPhone? 0 : '-90%'}}>
      <View style={styles.deficiencyButton}>
      <TouchableOpacity onPress={() => handleButtonClick('deficiency')}>
        <Text style={{ color: 'white' , fontSize: isPhone? 18 : 25}}>{buttonStates[elements.indexOf(currentState)] === 'deficiency' ? 'Unmark' : 'Deficiency'}</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.nextUntimedTestButton}>
      <TouchableOpacity onPress={() => handleButtonClick('next')}>
        <Text style={{ color: 'white' , fontSize: isPhone? 18 : 25}}>{buttonStates[elements.indexOf(currentState)] === 'next' ? 'Unmark' : 'Next'}</Text>
      </TouchableOpacity>
      </View>
      </View>

    </View>
                    </View>                   
                </View>
            </View>
        </ScrollView>
    );
}
const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};


export function EndQuizScreen({ navigation, route}) {
    const { quizScores, setQuizScores } = React.useContext(QuizScoresContext);
    const { imageArray, elapsedTime } = route.params; // This is your QuizImages array
    const deficienciesTotal = imageArray.length;;
    const deficienciesCorrect = imageArray.filter(question => question.userAnswer === question.trueAnswer).length;
    const deficienciesIdentified = `${deficienciesCorrect} / ${deficienciesTotal}`;
    const passStatus = (deficienciesCorrect / deficienciesTotal) * 100 >= 70 ? "PASS" : "FAIL";
    const [clickedQuestions, setClickedQuestions] = useState([]);
    const handleQuestionClick = (index) => {
        if (!clickedQuestions.includes(index)) {
            setClickedQuestions([...clickedQuestions, index]);
        } else {
            const updatedClickedQuestions = clickedQuestions.filter((clickedIndex) => clickedIndex !== index);
            setClickedQuestions(updatedClickedQuestions);
        }
    };
    React.useEffect(() => {
        setQuizScores([...quizScores, deficienciesCorrect]);
    }, [deficienciesCorrect]);
    return (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
        <View style={{marginTop: -9, marginBottom: 8, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: "#221f20", height: 45, borderTopWidth: 5, borderBottomWidth: 3, borderColor: "#ffcc01" }}>
                <View style={{alignSelf: 'center', display: 'flex', flex: 1}}>
                <Text style={{alignSelf: 'center', color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>End Screen stat</Text>
                </View>
            </View>
            <View style={{ padding: 20 }}>
                    <Text>Total Time: {formatTime(elapsedTime)}</Text>
                    <Text>{passStatus}</Text>
                    <Text>Deficiencies Identified: {deficienciesIdentified}</Text>
                    <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Questions:</Text>
                    {imageArray.map((question, index) => (
                        <View key={index} style={{ marginTop: 5 }}>
                            <TouchableOpacity onPress={() => handleQuestionClick(index)}>
                                <Text style={{ fontWeight: 'bold' }}>Question {(index + 1)} : {question.key}</Text>
                            </TouchableOpacity>
                            <Text>User Answer: {question.userAnswer === null ? 'No answer' : question.userAnswer ? 'True' : 'False'}</Text>
                            <Text>Correct Answer: {question.trueAnswer ? 'True' : 'False'}</Text>
                            {/* Conditionally render the image based on whether the question has been clicked */}
                            {clickedQuestions.includes(index) ? (
                                <Image source={question.image} />
                            ) : null}
                        </View>
                    ))}
            </View>
            <View style={{ alignItems: 'flex-end', marginBottom: 20, marginRight: 100}}>
                <TouchableOpacity onPress={() => navigation.navigate('Slingload Quiz')} style={[styles.endTestButton]}>
                    <Text style={{ fontSize: isPhone ? 18 : 22, color: '#E8E2D9'}}>Try Again</Text>
                </TouchableOpacity>
            </View>

        </View>
    </ScrollView>
    );
}



export function QuizScoresScreen({ navigation, route }) {
    const { quizScores } = React.useContext(QuizScoresContext);
    // Sample data
    const data = {
        labels: quizScores.map((_, index) => (index + 1).toString()),
        datasets: [
            {
                data: quizScores,
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
