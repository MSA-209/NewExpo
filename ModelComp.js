import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, View, Image,TouchableOpacity, Text, Linking, ScrollView , Alert, Button, Dimensions} from 'react-native';
import { styles } from './styleSheet'; 
import { FontAwesome } from '@expo/vector-icons'; 
const screenDimension = Dimensions.get("screen");
const isPhone = screenDimension.width < 1000; // Adjust the threshold as needed

const imageSources = {
    "Placard" : [[ require('./assets/Placard/placard_Left_Top.png'), require('./assets/Placard/placard_Center_Top.png'), require('./assets/Placard/placard_Right_Top.png')],
    [ require('./assets/Placard/placard_Left.png'), require('./assets/Placard/placard_Center.png'),require('./assets/Placard/placard_Right.png')],
    [ require('./assets/Placard/placard_Left_Bottom.png'), require('./assets/Placard/placard_Bottom.png'), require('./assets/Placard/placard_Right_Bottom.png')]
        ],
    "Apex" :[[require('./assets/Apex/Apex_Top.png')],
            [require('./assets/Apex/Apex_Left_Top_Angle.png'),require('./assets/Apex/Apex_Center_Top_Angle.png'),require('./assets/Apex/Apex_Right_Top_Angle.png'),require('./assets/Apex/Apex_Back_Top_Angle.png')],
            [require('./assets/Apex/Apex_Left_Back_Angle.png'),require('./assets/Apex/Apex_Left.png'),require('./assets/Apex/Apex_Left_Angle.png'),require('./assets/Apex/Apex_Center.png'),
            require('./assets/Apex/Apex_Right_Angle.png'),require('./assets/Apex/Apex_Right.png'),require('./assets/Apex/Apex_Right_Back_Angle.png'),require('./assets/Apex/Apex_Back.png')],
            [require('./assets/Apex/Apex_Left_Bottom_Angle.png'),require('./assets/Apex/Apex_Center_Bottom_Angle.png'),require('./assets/Apex/Apex_Right_Bottom_Angle.png'),require('./assets/Apex/Apex_Back_Bottom_Angle.png')],
            [require('./assets/Apex/Apex_Bottom.png')]],
    "Grabhook" :[[require('./assets/Grabhook/GrabHook_Top.png')],
            [require('./assets/Grabhook/GrabHook_Left_Top_Angle.png'),require('./assets/Grabhook/GrabHook_Center_Top_Angle.png'),require('./assets/Grabhook/GrabHook_Right_Top_Angle.png'),require('./assets/Grabhook/GrabHook_Back_Top_Angle.png')],
            [require('./assets/Grabhook/GrabHook_Left_Back_Angle.png'),require('./assets/Grabhook/GrabHook_Left.png'),require('./assets/Grabhook/GrabHook_Left_Angle.png'),require('./assets/Grabhook/GrabHook_Center.png'),
            require('./assets/Grabhook/GrabHook_Right_Angle.png'),require('./assets/Grabhook/GrabHook_Right.png'),require('./assets/Grabhook/GrabHook_Right_Back_Angle.png'),require('./assets/Grabhook/GrabHook_Back.png')],
            [require('./assets/Grabhook/GrabHook_Left_Bottom_Angle.png'),require('./assets/Grabhook/GrabHook_Center_Bottom_Angle.png'),require('./assets/Grabhook/GrabHook_Right_Bottom_Angle.png'),require('./assets/Grabhook/GrabHook_Back_Bottom_Angle.png')],
            [require('./assets/Grabhook/GrabHook_Bottom.png')]],
    "ChainClevis":[[require('./assets/ChainClevis/ChainClevis_Top.png')],
            [require('./assets/ChainClevis/ChainClevis_Left_Top_Angle.png'),require('./assets/ChainClevis/ChainClevis_Center_Top_Angle.png'),require('./assets/ChainClevis/ChainClevis_Right_Top_Angle.png'),require('./assets/ChainClevis/ChainClevis_Back_Top_Angle.png')],
            [require('./assets/ChainClevis/ChainClevis_Left_Back_Angle.png'),require('./assets/ChainClevis/ChainClevis_Left.png'),require('./assets/ChainClevis/ChainClevis_Left_Angle.png'),require('./assets/ChainClevis/ChainClevis_Center.png'),
            require('./assets/ChainClevis/ChainClevis_Right_Angle.png'),require('./assets/ChainClevis/ChainClevis_Right.png'),require('./assets/ChainClevis/ChainClevis_Right_Back_Angle.png'),require('./assets/ChainClevis/ChainClevis_Back.png')],
            [require('./assets/ChainClevis/ChainClevis_Left_Bottom_Angle.png'),require('./assets/ChainClevis/ChainClevis_Center_Bottom_Angle.png'),require('./assets/ChainClevis/ChainClevis_Right_Bottom_Angle.png'),require('./assets/ChainClevis/ChainClevis_Back_Bottom_Angle.png')],
            [require('./assets/ChainClevis/ChainClevis_Bottom.png')]],
    "MediumClevis":[[require('./assets/MediumClevis/MediumClevis_Top.png')],
            [require('./assets/MediumClevis/MediumClevis_Left_Top_Angle.png'),require('./assets/MediumClevis/MediumClevis_Center_Top_Angle.png'),require('./assets/MediumClevis/MediumClevis_Right_Top_Angle.png'),require('./assets/MediumClevis/MediumClevis_Back_Top_Angle.png')],
            [require('./assets/MediumClevis/MediumClevis_Left_Back_Angle.png'),require('./assets/MediumClevis/MediumClevis_Left.png'),require('./assets/MediumClevis/MediumClevis_Left_Angle.png'),require('./assets/MediumClevis/MediumClevis_Center.png'),
            require('./assets/MediumClevis/MediumClevis_Right_Angle.png'),require('./assets/MediumClevis/MediumClevis_Right.png'),require('./assets/MediumClevis/MediumClevis_Right_Back_Angle.png'),require('./assets/MediumClevis/MediumClevis_Back.png')],
            [require('./assets/MediumClevis/MediumClevis_Left_Bottom_Angle.png'),require('./assets/MediumClevis/MediumClevis_Center_Bottom_Angle.png'),require('./assets/MediumClevis/MediumClevis_Right_Bottom_Angle.png'),require('./assets/MediumClevis/MediumClevis_Back_Bottom_Angle.png')],
            [require('./assets/MediumClevis/MediumClevis_Bottom.png')]],
    "Suspension1":[[require('./assets/Suspension1/Suspension1_Top.png')],
            [require('./assets/Suspension1/Suspension1_Left_Top_Angle.png'),require('./assets/Suspension1/Suspension1_Center_Top_Angle.png'),require('./assets/Suspension1/Suspension1_Right_Top_Angle.png'),require('./assets/Suspension1/Suspension1_Back_Top_Angle.png')],
            [require('./assets/Suspension1/Suspension1_Left_Back_Angle.png'),require('./assets/Suspension1/Suspension1_Left.png'),require('./assets/Suspension1/Suspension1_Left_Angle.png'),require('./assets/Suspension1/Suspension1_Center.png'),
            require('./assets/Suspension1/Suspension1_Right_Angle.png'),require('./assets/Suspension1/Suspension1_Right.png'),require('./assets/Suspension1/Suspension1_Right_Back_Angle.png'),require('./assets/Suspension1/Suspension1_Back.png')],
            [require('./assets/Suspension1/Suspension1_Left_Bottom_Angle.png'),require('./assets/Suspension1/Suspension1_Center_Bottom_Angle.png'),require('./assets/Suspension1/Suspension1_Right_Bottom_Angle.png'),require('./assets/Suspension1/Suspension1_Back_Bottom_Angle.png')],
            [require('./assets/Suspension1/Suspension1_Bottom.png')]],
    "Suspension2-4":[[require('./assets/Suspension2/Suspension2_Top.png')],
            [require('./assets/Suspension2/Suspension2_Left_Top_Angle.png'),require('./assets/Suspension2/Suspension2_Center_Top_Angle.png'),require('./assets/Suspension2/Suspension2_Right_Top_Angle.png'),require('./assets/Suspension2/Suspension2_Back_Top_Angle.png')],
            [require('./assets/Suspension2/Suspension2_Left_Back_Angle.png'),require('./assets/Suspension2/Suspension2_Left.png'),require('./assets/Suspension2/Suspension2_Left_Angle.png'),require('./assets/Suspension2/Suspension2_Center.png'),
            require('./assets/Suspension2/Suspension2_Right_Angle.png'),require('./assets/Suspension2/Suspension2_Right.png'),require('./assets/Suspension2/Suspension2_Right_Back_Angle.png'),require('./assets/Suspension2/Suspension2_Back.png')],
            [require('./assets/Suspension2/Suspension2_Left_Bottom_Angle.png'),require('./assets/Suspension2/Suspension2_Center_Bottom_Angle.png'),require('./assets/Suspension2/Suspension2_Right_Bottom_Angle.png'),require('./assets/Suspension2/Suspension2_Back_Bottom_Angle.png')],
            [require('./assets/Suspension2/Suspension2_Bottom.png')]],
    "SusStrapOrder":[[require('./assets/SusStrapOrder/SusStrapOrder_Top.png')],
            [require('./assets/SusStrapOrder/SusStrapOrder_Left_Top_Angle.png'),require('./assets/SusStrapOrder/SusStrapOrder_Center_Top_Angle.png'),require('./assets/SusStrapOrder/SusStrapOrder_Right_Top_Angle.png'),require('./assets/SusStrapOrder/SusStrapOrder_Back_Top_Angle.png')],
            [require('./assets/SusStrapOrder/SusStrapOrder_Left_Back_Angle.png'),require('./assets/SusStrapOrder/SusStrapOrder_Left.png'),require('./assets/SusStrapOrder/SusStrapOrder_Left_Angle.png'),require('./assets/SusStrapOrder/SusStrapOrder_Center.png'),
            require('./assets/SusStrapOrder/SusStrapOrder_Right_Angle.png'),require('./assets/SusStrapOrder/SusStrapOrder_Right.png'),require('./assets/SusStrapOrder/SusStrapOrder_Right_Back_Angle.png'),require('./assets/SusStrapOrder/SusStrapOrder_Back.png')],
            [require('./assets/SusStrapOrder/SusStrapOrder_Left_Bottom_Angle.png'),require('./assets/SusStrapOrder/SusStrapOrder_Center_Bottom_Angle.png'),require('./assets/SusStrapOrder/SusStrapOrder_Right_Bottom_Angle.png'),require('./assets/SusStrapOrder/SusStrapOrder_Back_Bottom_Angle.png')],
            [require('./assets/SusStrapOrder/SusStrapOrder_Bottom.png')]],
    "StrapSide1&2":[[require('./assets/StrapSide/StrapSide_Top.png')],
            [require('./assets/StrapSide/StrapSide_Left_Top_Angle.png'),require('./assets/StrapSide/StrapSide_Center_Top_Angle.png'),require('./assets/StrapSide/StrapSide_Right_Top_Angle.png'),require('./assets/StrapSide/StrapSide_Back_Top_Angle.png')],
            [require('./assets/StrapSide/StrapSide_Left_Back_Angle.png'),require('./assets/StrapSide/StrapSide_Left.png'),require('./assets/StrapSide/StrapSide_Left_Angle.png'),require('./assets/StrapSide/StrapSide_Center.png'),
            require('./assets/StrapSide/StrapSide_Right_Angle.png'),require('./assets/StrapSide/StrapSide_Right.png'),require('./assets/StrapSide/StrapSide_Right_Back_Angle.png'),require('./assets/StrapSide/StrapSide_Back.png')],
            [require('./assets/StrapSide/StrapSide_Left_Bottom_Angle.png'),require('./assets/StrapSide/StrapSide_Center_Bottom_Angle.png'),require('./assets/StrapSide/StrapSide_Right_Bottom_Angle.png'),require('./assets/StrapSide/StrapSide_Back_Bottom_Angle.png')],
            [require('./assets/StrapSide/StrapSide_Bottom.png')]],
    "TopLateralC1":[[require('./assets/TopLateralC1/TopLateralC1_Top.png')],
            [require('./assets/TopLateralC1/TopLateralC1_Left_Top_Angle.png'),require('./assets/TopLateralC1/TopLateralC1_Center_Top_Angle.png'),require('./assets/TopLateralC1/TopLateralC1_Right_Top_Angle.png'),require('./assets/TopLateralC1/TopLateralC1_Back_Top_Angle.png')],
            [require('./assets/TopLateralC1/TopLateralC1_Left_Back_Angle.png'),require('./assets/TopLateralC1/TopLateralC1_Left.png'),require('./assets/TopLateralC1/TopLateralC1_Left_Angle.png'),require('./assets/TopLateralC1/TopLateralC1_Center.png'),
            require('./assets/TopLateralC1/TopLateralC1_Right_Angle.png'),require('./assets/TopLateralC1/TopLateralC1_Right.png'),require('./assets/TopLateralC1/TopLateralC1_Right_Back_Angle.png'),require('./assets/TopLateralC1/TopLateralC1_Back.png')],
            [require('./assets/TopLateralC1/TopLateralC1_Left_Bottom_Angle.png'),require('./assets/TopLateralC1/TopLateralC1_Center_Bottom_Angle.png'),require('./assets/TopLateralC1/TopLateralC1_Right_Bottom_Angle.png'),require('./assets/TopLateralC1/TopLateralC1_Back_Bottom_Angle.png')],
            [require('./assets/TopLateralC1/TopLateralC1_Bottom.png')]],
    "MidLateralC1":[[require('./assets/MidLateralC1/MidLateralC1_Top.png')],
            [require('./assets/MidLateralC1/MidLateralC1_Left_Top_Angle.png'),require('./assets/MidLateralC1/MidLateralC1_Center_Top_Angle.png'),require('./assets/MidLateralC1/MidLateralC1_Right_Top_Angle.png'),require('./assets/MidLateralC1/MidLateralC1_Back_Top_Angle.png')],
            [require('./assets/MidLateralC1/MidLateralC1_Left_Back_Angle.png'),require('./assets/MidLateralC1/MidLateralC1_Left.png'),require('./assets/MidLateralC1/MidLateralC1_Left_Angle.png'),require('./assets/MidLateralC1/MidLateralC1_Center.png'),
            require('./assets/MidLateralC1/MidLateralC1_Right_Angle.png'),require('./assets/MidLateralC1/MidLateralC1_Right.png'),require('./assets/MidLateralC1/MidLateralC1_Right_Back_Angle.png'),require('./assets/MidLateralC1/MidLateralC1_Back.png')],
            [require('./assets/MidLateralC1/MidLateralC1_Left_Bottom_Angle.png'),require('./assets/MidLateralC1/MidLateralC1_Center_Bottom_Angle.png'),require('./assets/MidLateralC1/MidLateralC1_Right_Bottom_Angle.png'),require('./assets/MidLateralC1/MidLateralC1_Back_Bottom_Angle.png')],
            [require('./assets/MidLateralC1/MidLateralC1_Bottom.png')]],
    "BotLateralC1":[[require('./assets/BotLateralC1/BotLateralC1_Top.png')],
            [require('./assets/BotLateralC1/BotLateralC1_Left_Top_Angle.png'),require('./assets/BotLateralC1/BotLateralC1_Center_Top_Angle.png'),require('./assets/BotLateralC1/BotLateralC1_Right_Top_Angle.png'),require('./assets/BotLateralC1/BotLateralC1_Back_Top_Angle.png')],
            [require('./assets/BotLateralC1/BotLateralC1_Left_Back_Angle.png'),require('./assets/BotLateralC1/BotLateralC1_Left.png'),require('./assets/BotLateralC1/BotLateralC1_Left_Angle.png'),require('./assets/BotLateralC1/BotLateralC1_Center.png'),
            require('./assets/BotLateralC1/BotLateralC1_Right_Angle.png'),require('./assets/BotLateralC1/BotLateralC1_Right.png'),require('./assets/BotLateralC1/BotLateralC1_Right_Back_Angle.png'),require('./assets/BotLateralC1/BotLateralC1_Back.png')],
            [require('./assets/BotLateralC1/BotLateralC1_Left_Bottom_Angle.png'),require('./assets/BotLateralC1/BotLateralC1_Center_Bottom_Angle.png'),require('./assets/BotLateralC1/BotLateralC1_Right_Bottom_Angle.png'),require('./assets/BotLateralC1/BotLateralC1_Back_Bottom_Angle.png')],
            [require('./assets/BotLateralC1/BotLateralC1_Bottom.png')]]
    }; 


const ModelComp = ({imageArray}) => {
    const images = imageSources[imageArray]
    console.log(images)
    const [currentRow, setCurrentRow] = React.useState(Math.floor(images.length / 2));
    const [currentCol, setCurrentCol] = React.useState((imageArray === "Placard") ? Math.floor(images[currentRow].length / 2)  : Math.floor(images[currentRow].length / 2)- 1);
    console.log(currentRow)
    console.log(currentCol)
    const changeImage = (direction) => {
        if (direction === 'Up') {
            if (imageArray !== "Placard"){
                if ( currentRow === 0) {
                    setCurrentRow(4);
                    setCurrentCol(0);
                }else if (currentRow === 4){
                    setCurrentRow(3);
                    setCurrentCol(1);
                }else if (currentRow === 3){
                    setCurrentRow(2);
                    if (currentCol === 0){
                        setCurrentCol(1);
                    }
                    else if (currentCol === 1){
                        setCurrentCol(3);
                    }
                    else if (currentCol === 2){
                        setCurrentCol(5);
                    }
                    else{
                        setCurrentCol(7);
                    }
                } else if (currentRow === 2){
                    setCurrentRow(1);
                    if (currentCol === 0  || currentCol ===1|| currentCol === 2){
                        setCurrentCol(0);
                    }else if (currentCol == 3){
                        setCurrentCol(1);
                    }else if (currentCol === 4  || currentCol ===5|| currentCol === 6){
                        setCurrentCol(2);
                    }else{
                        setCurrentCol(3);
                    }
                }else{
                    setCurrentRow(0);
                    setCurrentCol(0);
                }
                
            }else{
            setCurrentRow((currentRow - 1 + images.length) % images.length);
            }
        }
        else if (direction === 'Down') {
            if (imageArray !== "Placard"){
                if ( currentRow === 0) {
                    setCurrentRow(1);
                    setCurrentCol(1);
                }else if (currentRow === 4){
                    setCurrentRow(0);
                    setCurrentCol(0);
                }else if (currentRow === 3){
                    setCurrentRow(4);
                    setCurrentCol(0);
                } else if (currentRow === 2){
                    setCurrentRow(3);
                    if (currentCol === 0  || currentCol ===1|| currentCol === 2){
                        setCurrentCol(0);
                    }else if (currentCol == 3){
                        setCurrentCol(1);
                    }else if (currentCol === 4  || currentCol ===5|| currentCol === 6){
                        setCurrentCol(2);
                    }else{
                        setCurrentCol(3);
                    }
                }else if (currentRow === 1){
                    setCurrentRow(2);
                    if (currentCol === 0 ){
                        setCurrentCol(1);
                    }else if (currentCol == 1){
                        setCurrentCol(3);
                    }else if (currentCol === 2){
                        setCurrentCol(5);
                    }else{
                        setCurrentCol(7);
                    }
                }
                
            }else{
            setCurrentRow((currentRow + 1) % images.length);}
        }
        else if (direction === 'Left') {
            setCurrentCol((currentCol - 1 + images[currentRow].length) % images[currentRow].length);
        }
        else if (direction === 'Right') {
            setCurrentCol((currentCol + 1) % images[currentRow].length);
        }
        else if (direction === 'Home') {
            {setCurrentRow(Math.floor(images.length/2));
            setCurrentCol((imageArray === "Placard") ? 1  : 3);
        }
        }
    } 
    return(
        <View style={styles.imageBox}>
            <View style= {styles.objectSize}>
            <Image source={images[currentRow][currentCol]}
            style={{
                width: 'auto',
                height: 450,
                resizeMode: 'contain',
                marginTop: 50,
                marginBottom: 10
                }}
            />
            </View>
        <View>
        <View style ={styles.navigationButton}>
            <View>
            <TouchableOpacity onPress={() => changeImage('Up')}>
                <View>
                    <FontAwesome name="arrow-up" size={isPhone? 25 : 40} color='#d2d2d2'/>
                </View>
            </TouchableOpacity>

            </View>
            <View style={{flexDirection: 'row', gap :10, marginTop: 5, marginBottom: 5}}>
            <TouchableOpacity onPress={() => changeImage('Left')}>
                <View>
                    <FontAwesome name="arrow-left" size={isPhone? 25 : 40} color='#d2d2d2'/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeImage('Home')}>
                <View>
                    <FontAwesome name="circle" size={isPhone? 25 : 40} color='#d2d2d2'/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeImage('Right')}>
                <View>
                    <FontAwesome name="arrow-right" size={isPhone? 25 : 40} color='#d2d2d2'/>
                </View>
            </TouchableOpacity>
            </View>
            <View>
            <TouchableOpacity onPress={() => changeImage('Down')}>
                <View>
                    <FontAwesome name="arrow-down" size={isPhone? 25 : 40} color='#d2d2d2'/>
                </View>
            </TouchableOpacity>
            </View>
        </View>
    </View>
    </View>
)}

export default ModelComp;
