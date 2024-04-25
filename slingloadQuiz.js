import 'react-native-gesture-handler';/Deficient/
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, ScrollView, TextInput, FlatList, screen, Button, Dimensions} from 'react-native';
import 'react-native-svg'
import { Card, Provider, Text, useTheme} from 'react-native-paper';
import { styles } from './styleSheet';
import { FontAwesome } from '@expo/vector-icons'; 
import { LineChart } from 'react-native-chart-kit';
import SlingloadDropdown from './slingload';
import { QuizScoresContext } from './quizScoresContext.js';
import ModelComp from './ModelComp.js';

const screenDimension = Dimensions.get("screen");
const isPhone = screenDimension.width < 800;

const showingDeficient = [{id: 'PlacardWrench' , image : require('./assets/Placard/Deficient/DeficientPlacard_Tight.png'), string :'The Placard should read hand tight, not something else like wrench tight.' },
{id :'Bag' , image : require('./assets/Bag/Deficient/Right_Back_Angle.png'), string :'Twisted strap, loose excess, misrouted strap, lacing over straps, loose lacing,and excess not secured.' },
{id :'NutMissing' , image : require('./assets/Apex/Deficient/DeficientApex_NutMissing/Bottom.png'), string :'Castellated Nut, Missing.' },
{id :'InvertedNut' , image : require('./assets/Apex/Deficient/DeficientApex_InvertedNut/Center.png'), string :'Castellated Nut, Inverted.' },
{id :'ChainClevisTape' , image : require('./assets/ChainClevis/Deficient/Center.png'), string :'Tape, Missing.' },
{id :'PlacardWeight' , image : require('./assets/Placard/Deficient/DeficientPlacard_Weight.png'), string :'The Placard should not have an incorrect weight.' },
{id :'CotterPin' , image : require('./assets/Apex/Deficient/DeficientApex_CotterPin/Bottom.png'), string :'CotterPin is missing.' },
{id :'SpacerMissing' , image : require('./assets/Apex/Deficient/DeficientApex_SpacerMissing/Bottom.png'), string :'Apex spacer is missing.' },
{id :'DomeNutMissing' , image : require('./assets/Grabhook/Deficient/DomeNutMissing/Center.png'), string :'Grabhook dome nut is missing.' },
{id :'ExtraLink' , image : require('./assets/Grabhook/Deficient/ExtraLink/Left.png'), string :'Grabhook has an extra link.' },
{id :'Inverted1' , image : require('./assets/Grabhook/Deficient/Inverted/Left.png'), string :'Grabhook is inverted.' },
{id :'Inverted2' , image : require('./assets/Grabhook/Deficient/Inverted2/Left.png'), string :'Grabhook is inverted.' },
{id :'LockNutMissing' , image : require('./assets/Grabhook/Deficient/LockNutMissing/Center.png'), string :'Grabhook lock nut is missing.' },
{id :'MissingLink' , image : require('./assets/Grabhook/Deficient/MissingLink/Left.png'), string :'Grabhook is missing a link.' }]

const deficientImages = [
                       {key: 'Apex' , id: 'CotterPin',image: [[require('./assets/Apex/Deficient/DeficientApex_CotterPin/Top.png')],
                [require('./assets/Apex/Deficient/DeficientApex_CotterPin/Left_Top_Angle.png'),require('./assets/Apex/Deficient/DeficientApex_CotterPin/Center_Top_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_CotterPin/Right_Top_Angle.png'),require('./assets/Apex/Deficient/DeficientApex_CotterPin/Back_Top_Angle.png') ],
[require('./assets/Apex/Deficient/DeficientApex_CotterPin/Left_Back_Angle.png'),require('./assets/Apex/Deficient/DeficientApex_CotterPin/Left.png') ,require('./assets/Apex/Deficient/DeficientApex_CotterPin/Left_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_CotterPin/Center.png') ,
        require('./assets/Apex/Deficient/DeficientApex_CotterPin/Right_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_CotterPin/Right.png') ,require('./assets/Apex/Deficient/DeficientApex_CotterPin/Right_Back_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_CotterPin/Back.png')],
    [require('./assets/Apex/Deficient/DeficientApex_CotterPin/Left_Bottom_Angle.png'),require('./assets/Apex/Deficient/DeficientApex_CotterPin/Center_Bottom_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_CotterPin/Right_Bottom_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_CotterPin/Back_Bottom_Angle.png')],
                        [require('./assets/Apex/Deficient/DeficientApex_CotterPin/Bottom.png')]],trueAnswer: true, userAnswer: null },
                       {key: 'Apex' ,id:'InvertedNut',image: [[require('./assets/Apex/Deficient/DeficientApex_InvertedNut/Top.png')],
                       [require('./assets/Apex/Deficient/DeficientApex_InvertedNut/Left_Top_Angle.png'),require('./assets/Apex/Deficient/DeficientApex_InvertedNut/Center_Top_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_InvertedNut/Right_Top_Angle.png'),require('./assets/Apex/Deficient/DeficientApex_InvertedNut/Back_Top_Angle.png') ],
       [require('./assets/Apex/Deficient/DeficientApex_InvertedNut/Left_Back_Angle.png'),require('./assets/Apex/Deficient/DeficientApex_InvertedNut/Left.png') ,require('./assets/Apex/Deficient/DeficientApex_InvertedNut/Left_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_InvertedNut/Center.png') ,
               require('./assets/Apex/Deficient/DeficientApex_InvertedNut/Right_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_InvertedNut/Right.png') ,require('./assets/Apex/Deficient/DeficientApex_InvertedNut/Right_Back_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_InvertedNut/Back.png')],
           [require('./assets/Apex/Deficient/DeficientApex_InvertedNut/Left_Bottom_Angle.png'),require('./assets/Apex/Deficient/DeficientApex_InvertedNut/Center_Bottom_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_InvertedNut/Right_Bottom_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_InvertedNut/Back_Bottom_Angle.png')],
                               [require('./assets/Apex/Deficient/DeficientApex_InvertedNut/Bottom.png')]],trueAnswer: true, userAnswer: null },
                       {key: 'Apex' ,id:'NutMissing',image: [[require('./assets/Apex/Deficient/DeficientApex_NutMissing/Top.png')],
                       [require('./assets/Apex/Deficient/DeficientApex_NutMissing/Left_Top_Angle.png'),require('./assets/Apex/Deficient/DeficientApex_NutMissing/Center_Top_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_NutMissing/Right_Top_Angle.png'),require('./assets/Apex/Deficient/DeficientApex_NutMissing/Back_Top_Angle.png') ],
       [require('./assets/Apex/Deficient/DeficientApex_NutMissing/Left_Back_Angle.png'),require('./assets/Apex/Deficient/DeficientApex_NutMissing/Left.png') ,require('./assets/Apex/Deficient/DeficientApex_NutMissing/Left_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_NutMissing/Center.png') ,
               require('./assets/Apex/Deficient/DeficientApex_NutMissing/Right_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_NutMissing/Right.png') ,require('./assets/Apex/Deficient/DeficientApex_NutMissing/Right_Back_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_NutMissing/Back.png')],
           [require('./assets/Apex/Deficient/DeficientApex_NutMissing/Left_Bottom_Angle.png'),require('./assets/Apex/Deficient/DeficientApex_NutMissing/Center_Bottom_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_NutMissing/Right_Bottom_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_NutMissing/Back_Bottom_Angle.png')],
                               [require('./assets/Apex/Deficient/DeficientApex_NutMissing/Bottom.png')]],trueAnswer: true, userAnswer: null },
                       {key: 'Apex' ,id: 'SpacerMissing',image: [[require('./assets/Apex/Deficient/DeficientApex_SpacerMissing/Top.png')],
                       [require('./assets/Apex/Deficient/DeficientApex_SpacerMissing/Left_Top_Angle.png'),require('./assets/Apex/Deficient/DeficientApex_SpacerMissing/Center_Top_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_SpacerMissing/Right_Top_Angle.png'),require('./assets/Apex/Deficient/DeficientApex_SpacerMissing/Back_Top_Angle.png') ],
       [require('./assets/Apex/Deficient/DeficientApex_SpacerMissing/Left_Back_Angle.png'),require('./assets/Apex/Deficient/DeficientApex_SpacerMissing/Left.png') ,require('./assets/Apex/Deficient/DeficientApex_SpacerMissing/Left_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_SpacerMissing/Center.png') ,
               require('./assets/Apex/Deficient/DeficientApex_SpacerMissing/Right_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_SpacerMissing/Right.png') ,require('./assets/Apex/Deficient/DeficientApex_SpacerMissing/Right_Back_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_SpacerMissing/Back.png')],
           [require('./assets/Apex/Deficient/DeficientApex_SpacerMissing/Left_Bottom_Angle.png'),require('./assets/Apex/Deficient/DeficientApex_SpacerMissing/Center_Bottom_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_SpacerMissing/Right_Bottom_Angle.png') ,require('./assets/Apex/Deficient/DeficientApex_SpacerMissing/Back_Bottom_Angle.png')],
                               [require('./assets/Apex/Deficient/DeficientApex_SpacerMissing/Bottom.png')]],trueAnswer: true, userAnswer: null },
                       {key: 'Bag' ,id:'Bag',image: [[require('./assets/Bag/Deficient/Top.png')],
                       [require('./assets/Bag/Deficient/Left_Top_Angle.png'),require('./assets/Bag/Deficient/Center_Top_Angle.png') ,require('./assets/Bag/Deficient/Right_Top_Angle.png'),require('./assets/Bag/Deficient/Back_Top_Angle.png') ],
       [require('./assets/Bag/Deficient/Left_Back_Angle.png'),require('./assets/Bag/Deficient/Left.png') ,require('./assets/Bag/Deficient/Left_Angle.png') ,require('./assets/Bag/Deficient/Center.png') ,
               require('./assets/Bag/Deficient/Right_Angle.png') ,require('./assets/Bag/Deficient/Right.png') ,require('./assets/Bag/Deficient/Right_Back_Angle.png') ,require('./assets/Bag/Deficient/Back.png')],
           [require('./assets/Bag/Deficient/Left_Bottom_Angle.png'),require('./assets/Bag/Deficient/Center_Bottom_Angle.png') ,require('./assets/Bag/Deficient/Right_Bottom_Angle.png') ,require('./assets/Bag/Deficient/Back_Bottom_Angle.png')],
                               [require('./assets/Bag/Deficient/Bottom.png')]],trueAnswer: true, userAnswer: null },
                       {key: 'Chain Clevis' ,id:'ChainClevisTape',image: [[require('./assets/ChainClevis/Deficient/Top.png')],
                       [require('./assets/ChainClevis/Deficient/Left_Top_Angle.png'),require('./assets/ChainClevis/Deficient/Center_Top_Angle.png') ,require('./assets/ChainClevis/Deficient/Right_Top_Angle.png'),require('./assets/ChainClevis/Deficient/Back_Top_Angle.png') ],
       [require('./assets/ChainClevis/Deficient/Left_Back_Angle.png'),require('./assets/ChainClevis/Deficient/Left.png') ,require('./assets/ChainClevis/Deficient/Left_Angle.png') ,require('./assets/ChainClevis/Deficient/Center.png') ,
               require('./assets/ChainClevis/Deficient/Right_Angle.png') ,require('./assets/ChainClevis/Deficient/Right.png') ,require('./assets/ChainClevis/Deficient/Right_Back_Angle.png') ,require('./assets/ChainClevis/Deficient/Back.png')],
           [require('./assets/ChainClevis/Deficient/Left_Bottom_Angle.png'),require('./assets/ChainClevis/Deficient/Center_Bottom_Angle.png') ,require('./assets/ChainClevis/Deficient/Right_Bottom_Angle.png') ,require('./assets/ChainClevis/Deficient/Back_Bottom_Angle.png')],
                               [require('./assets/ChainClevis/Deficient/Bottom.png')]],trueAnswer: true, userAnswer: null },
                       {key: 'GrabHook' ,id:'DomeNutMissing',image: [[require('./assets/Grabhook/Deficient/DomeNutMissing/Top.png')],
                       [require('./assets/Grabhook/Deficient/DomeNutMissing/Left_Top_Angle.png'),require('./assets/Grabhook/Deficient/DomeNutMissing/Center_Top_Angle.png') ,require('./assets/Grabhook/Deficient/DomeNutMissing/Right_Top_Angle.png'),require('./assets/Grabhook/Deficient/DomeNutMissing/Back_Top_Angle.png') ],
       [require('./assets/Grabhook/Deficient/DomeNutMissing/Left_Back_Angle.png'),require('./assets/Grabhook/Deficient/DomeNutMissing/Left.png') ,require('./assets/Grabhook/Deficient/DomeNutMissing/Left_Angle.png') ,require('./assets/Grabhook/Deficient/DomeNutMissing/Center.png') ,
               require('./assets/Grabhook/Deficient/DomeNutMissing/Right_Angle.png') ,require('./assets/Grabhook/Deficient/DomeNutMissing/Right.png') ,require('./assets/Grabhook/Deficient/DomeNutMissing/Right_Back_Angle.png') ,require('./assets/Grabhook/Deficient/DomeNutMissing/Back.png')],
           [require('./assets/Grabhook/Deficient/DomeNutMissing/Left_Bottom_Angle.png'),require('./assets/Grabhook/Deficient/DomeNutMissing/Center_Bottom_Angle.png') ,require('./assets/Grabhook/Deficient/DomeNutMissing/Right_Bottom_Angle.png') ,require('./assets/Grabhook/Deficient/DomeNutMissing/Back_Bottom_Angle.png')],
                               [require('./assets/Grabhook/Deficient/DomeNutMissing/Bottom.png')]],trueAnswer: true, userAnswer: null },
                       {key: 'GrabHook' ,id:'ExtraLink',image: [[require('./assets/Grabhook/Deficient/ExtraLink/Top.png')],
                       [require('./assets/Grabhook/Deficient/ExtraLink/Left_Top_Angle.png'),require('./assets/Grabhook/Deficient/ExtraLink/Center_Top_Angle.png') ,require('./assets/Grabhook/Deficient/ExtraLink/Right_Top_Angle.png'),require('./assets/Grabhook/Deficient/ExtraLink/Back_Top_Angle.png') ],
       [require('./assets/Grabhook/Deficient/ExtraLink/Left_Back_Angle.png'),require('./assets/Grabhook/Deficient/ExtraLink/Left.png') ,require('./assets/Grabhook/Deficient/ExtraLink/Left_Angle.png') ,require('./assets/Grabhook/Deficient/ExtraLink/Center.png') ,
               require('./assets/Grabhook/Deficient/ExtraLink/Right_Angle.png') ,require('./assets/Grabhook/Deficient/ExtraLink/Right.png') ,require('./assets/Grabhook/Deficient/ExtraLink/Right_Back_Angle.png') ,require('./assets/Grabhook/Deficient/ExtraLink/Back.png')],
           [require('./assets/Grabhook/Deficient/ExtraLink/Left_Bottom_Angle.png'),require('./assets/Grabhook/Deficient/ExtraLink/Center_Bottom_Angle.png') ,require('./assets/Grabhook/Deficient/ExtraLink/Right_Bottom_Angle.png') ,require('./assets/Grabhook/Deficient/ExtraLink/Back_Bottom_Angle.png')],
                               [require('./assets/Grabhook/Deficient/ExtraLink/Bottom.png')]],trueAnswer: true, userAnswer: null },
                       {key: 'GrabHook' ,id:'Inverted1',image: [[require('./assets/Grabhook/Deficient/Inverted/Top.png')],
                       [require('./assets/Grabhook/Deficient/Inverted/Left_Top_Angle.png'),require('./assets/Grabhook/Deficient/Inverted/Center_Top_Angle.png') ,require('./assets/Grabhook/Deficient/Inverted/Right_Top_Angle.png'),require('./assets/Grabhook/Deficient/Inverted/Back_Top_Angle.png') ],
       [require('./assets/Grabhook/Deficient/Inverted/Left_Back_Angle.png'),require('./assets/Grabhook/Deficient/Inverted/Left.png') ,require('./assets/Grabhook/Deficient/Inverted/Left_Angle.png') ,require('./assets/Grabhook/Deficient/Inverted/Center.png') ,
               require('./assets/Grabhook/Deficient/Inverted/Right_Angle.png') ,require('./assets/Grabhook/Deficient/Inverted/Right.png') ,require('./assets/Grabhook/Deficient/Inverted/Right_Back_Angle.png') ,require('./assets/Grabhook/Deficient/Inverted/Back.png')],
           [require('./assets/Grabhook/Deficient/Inverted/Left_Bottom_Angle.png'),require('./assets/Grabhook/Deficient/Inverted/Center_Bottom_Angle.png') ,require('./assets/Grabhook/Deficient/Inverted/Right_Bottom_Angle.png') ,require('./assets/Grabhook/Deficient/Inverted/Back_Bottom_Angle.png')],
                               [require('./assets/Grabhook/Deficient/Inverted/Bottom.png')]],trueAnswer: true, userAnswer: null },
                       {key: 'GrabHook' ,id:'Inverted2',image: [[require('./assets/Grabhook/Deficient/Inverted2/Top.png')],
                       [require('./assets/Grabhook/Deficient/Inverted2/Left_Top_Angle.png'),require('./assets/Grabhook/Deficient/Inverted2/Center_Top_Angle.png') ,require('./assets/Grabhook/Deficient/Inverted2/Right_Top_Angle.png'),require('./assets/Grabhook/Deficient/Inverted2/Back_Top_Angle.png') ],
       [require('./assets/Grabhook/Deficient/Inverted2/Left_Back_Angle.png'),require('./assets/Grabhook/Deficient/Inverted2/Left.png') ,require('./assets/Grabhook/Deficient/Inverted2/Left_Angle.png') ,require('./assets/Grabhook/Deficient/Inverted2/Center.png') ,
               require('./assets/Grabhook/Deficient/Inverted2/Right_Angle.png') ,require('./assets/Grabhook/Deficient/Inverted2/Right.png') ,require('./assets/Grabhook/Deficient/Inverted2/Right_Back_Angle.png') ,require('./assets/Grabhook/Deficient/Inverted2/Back.png')],
           [require('./assets/Grabhook/Deficient/Inverted2/Left_Bottom_Angle.png'),require('./assets/Grabhook/Deficient/Inverted2/Center_Bottom_Angle.png') ,require('./assets/Grabhook/Deficient/Inverted2/Right_Bottom_Angle.png') ,require('./assets/Grabhook/Deficient/Inverted2/Back_Bottom_Angle.png')],
                               [require('./assets/Grabhook/Deficient/Inverted2/Bottom.png')]],trueAnswer: true, userAnswer: null },
                       {key: 'GrabHook' ,id:'LockNutMissing',image: [[require('./assets/Grabhook/Deficient/LockNutMissing/Top.png')],
                       [require('./assets/Grabhook/Deficient/LockNutMissing/Left_Top_Angle.png'),require('./assets/Grabhook/Deficient/LockNutMissing/Center_Top_Angle.png') ,require('./assets/Grabhook/Deficient/LockNutMissing/Right_Top_Angle.png'),require('./assets/Grabhook/Deficient/LockNutMissing/Back_Top_Angle.png') ],
       [require('./assets/Grabhook/Deficient/LockNutMissing/Left_Back_Angle.png'),require('./assets/Grabhook/Deficient/LockNutMissing/Left.png') ,require('./assets/Grabhook/Deficient/LockNutMissing/Left_Angle.png') ,require('./assets/Grabhook/Deficient/LockNutMissing/Center.png') ,
               require('./assets/Grabhook/Deficient/LockNutMissing/Right_Angle.png') ,require('./assets/Grabhook/Deficient/LockNutMissing/Right.png') ,require('./assets/Grabhook/Deficient/LockNutMissing/Right_Back_Angle.png') ,require('./assets/Grabhook/Deficient/LockNutMissing/Back.png')],
           [require('./assets/Grabhook/Deficient/LockNutMissing/Left_Bottom_Angle.png'),require('./assets/Grabhook/Deficient/LockNutMissing/Center_Bottom_Angle.png') ,require('./assets/Grabhook/Deficient/LockNutMissing/Right_Bottom_Angle.png') ,require('./assets/Grabhook/Deficient/LockNutMissing/Back_Bottom_Angle.png')],
                               [require('./assets/Grabhook/Deficient/LockNutMissing/Bottom.png')]],trueAnswer: true, userAnswer: null },
                       {key: 'GrabHook' , id:'MissingLink',image: [[require('./assets/Grabhook/Deficient/MissingLink/Top.png')],
                       [require('./assets/Grabhook/Deficient/MissingLink/Left_Top_Angle.png'),require('./assets/Grabhook/Deficient/MissingLink/Center_Top_Angle.png') ,require('./assets/Grabhook/Deficient/MissingLink/Right_Top_Angle.png'),require('./assets/Grabhook/Deficient/MissingLink/Back_Top_Angle.png') ],
       [require('./assets/Grabhook/Deficient/MissingLink/Left_Back_Angle.png'),require('./assets/Grabhook/Deficient/MissingLink/Left.png') ,require('./assets/Grabhook/Deficient/MissingLink/Left_Angle.png') ,require('./assets/Grabhook/Deficient/MissingLink/Center.png') ,
               require('./assets/Grabhook/Deficient/MissingLink/Right_Angle.png') ,require('./assets/Grabhook/Deficient/MissingLink/Right.png') ,require('./assets/Grabhook/Deficient/MissingLink/Right_Back_Angle.png') ,require('./assets/Grabhook/Deficient/MissingLink/Back.png')],
           [require('./assets/Grabhook/Deficient/MissingLink/Left_Bottom_Angle.png'),require('./assets/Grabhook/Deficient/MissingLink/Center_Bottom_Angle.png') ,require('./assets/Grabhook/Deficient/MissingLink/Right_Bottom_Angle.png') ,require('./assets/Grabhook/Deficient/MissingLink/Back_Bottom_Angle.png')],
                               [require('./assets/Grabhook/Deficient/MissingLink/Bottom.png')]],trueAnswer: true, userAnswer: null },
                       {key: 'Placard' ,id:'PlacardWrench',image:[[ require('./assets/Placard/Deficient/DeficientPlacard_Tight.png')]],trueAnswer: true, userAnswer: null },
                       {key: 'Placard' ,id:'PlacardWeight',image: [[require('./assets/Placard/Deficient/DeficientPlacard_Weight.png')]],trueAnswer: true, userAnswer: null }]

const normalImages = [{key: 'Apex' ,image:[[require('./assets/Apex/Apex_Top.png')],
[require('./assets/Apex/Apex_Left_Top_Angle.png'),require('./assets/Apex/Apex_Center_Top_Angle.png'),require('./assets/Apex/Apex_Right_Top_Angle.png'),require('./assets/Apex/Apex_Back_Top_Angle.png')],
[require('./assets/Apex/Apex_Left_Back_Angle.png'),require('./assets/Apex/Apex_Left.png'),require('./assets/Apex/Apex_Left_Angle.png'),require('./assets/Apex/Apex_Center.png'),
require('./assets/Apex/Apex_Right_Angle.png'),require('./assets/Apex/Apex_Right.png'),require('./assets/Apex/Apex_Right_Back_Angle.png'),require('./assets/Apex/Apex_Back.png')],
[require('./assets/Apex/Apex_Left_Bottom_Angle.png'),require('./assets/Apex/Apex_Center_Bottom_Angle.png'),require('./assets/Apex/Apex_Right_Bottom_Angle.png'),require('./assets/Apex/Apex_Back_Bottom_Angle.png')],
[require('./assets/Apex/Apex_Bottom.png')]],trueAnswer: false, userAnswer: null },
                        {key: 'Bottom Lateral C1' ,image: [[require('./assets/BotLateralC1/BotLateralC1_Top.png')],
                        [require('./assets/BotLateralC1/BotLateralC1_Left_Top_Angle.png'),require('./assets/BotLateralC1/BotLateralC1_Center_Top_Angle.png'),require('./assets/BotLateralC1/BotLateralC1_Right_Top_Angle.png'),require('./assets/BotLateralC1/BotLateralC1_Back_Top_Angle.png')],
                        [require('./assets/BotLateralC1/BotLateralC1_Left_Back_Angle.png'),require('./assets/BotLateralC1/BotLateralC1_Left.png'),require('./assets/BotLateralC1/BotLateralC1_Left_Angle.png'),require('./assets/BotLateralC1/BotLateralC1_Center.png'),
                        require('./assets/BotLateralC1/BotLateralC1_Right_Angle.png'),require('./assets/BotLateralC1/BotLateralC1_Right.png'),require('./assets/BotLateralC1/BotLateralC1_Right_Back_Angle.png'),require('./assets/BotLateralC1/BotLateralC1_Back.png')],
                        [require('./assets/BotLateralC1/BotLateralC1_Left_Bottom_Angle.png'),require('./assets/BotLateralC1/BotLateralC1_Center_Bottom_Angle.png'),require('./assets/BotLateralC1/BotLateralC1_Right_Bottom_Angle.png'),require('./assets/BotLateralC1/BotLateralC1_Back_Bottom_Angle.png')],
                        [require('./assets/BotLateralC1/BotLateralC1_Bottom.png')]],trueAnswer: false, userAnswer: null },
                        {key: 'Chain Clevis' ,image: [[require('./assets/ChainClevis/ChainClevis_Top.png')],
                        [require('./assets/ChainClevis/ChainClevis_Left_Top_Angle.png'),require('./assets/ChainClevis/ChainClevis_Center_Top_Angle.png'),require('./assets/ChainClevis/ChainClevis_Right_Top_Angle.png'),require('./assets/ChainClevis/ChainClevis_Back_Top_Angle.png')],
                        [require('./assets/ChainClevis/ChainClevis_Left_Back_Angle.png'),require('./assets/ChainClevis/ChainClevis_Left.png'),require('./assets/ChainClevis/ChainClevis_Left_Angle.png'),require('./assets/ChainClevis/ChainClevis_Center.png'),
                        require('./assets/ChainClevis/ChainClevis_Right_Angle.png'),require('./assets/ChainClevis/ChainClevis_Right.png'),require('./assets/ChainClevis/ChainClevis_Right_Back_Angle.png'),require('./assets/ChainClevis/ChainClevis_Back.png')],
                        [require('./assets/ChainClevis/ChainClevis_Left_Bottom_Angle.png'),require('./assets/ChainClevis/ChainClevis_Center_Bottom_Angle.png'),require('./assets/ChainClevis/ChainClevis_Right_Bottom_Angle.png'),require('./assets/ChainClevis/ChainClevis_Back_Bottom_Angle.png')],
                        [require('./assets/ChainClevis/ChainClevis_Bottom.png')]],trueAnswer: false, userAnswer: null },
                        {key: 'GrabHook' ,image: [[require('./assets/Grabhook/GrabHook_Top.png')],
                        [require('./assets/Grabhook/GrabHook_Left_Top_Angle.png'),require('./assets/Grabhook/GrabHook_Center_Top_Angle.png'),require('./assets/Grabhook/GrabHook_Right_Top_Angle.png'),require('./assets/Grabhook/GrabHook_Back_Top_Angle.png')],
                        [require('./assets/Grabhook/GrabHook_Left_Back_Angle.png'),require('./assets/Grabhook/GrabHook_Left.png'),require('./assets/Grabhook/GrabHook_Left_Angle.png'),require('./assets/Grabhook/GrabHook_Center.png'),
                        require('./assets/Grabhook/GrabHook_Right_Angle.png'),require('./assets/Grabhook/GrabHook_Right.png'),require('./assets/Grabhook/GrabHook_Right_Back_Angle.png'),require('./assets/Grabhook/GrabHook_Back.png')],
                        [require('./assets/Grabhook/GrabHook_Left_Bottom_Angle.png'),require('./assets/Grabhook/GrabHook_Center_Bottom_Angle.png'),require('./assets/Grabhook/GrabHook_Right_Bottom_Angle.png'),require('./assets/Grabhook/GrabHook_Back_Bottom_Angle.png')],
                        [require('./assets/Grabhook/GrabHook_Bottom.png')]],trueAnswer: false, userAnswer: null },
                        {key: 'Medium Clevis' ,image: [[require('./assets/MediumClevis/MediumClevis_Top.png')],
                        [require('./assets/MediumClevis/MediumClevis_Left_Top_Angle.png'),require('./assets/MediumClevis/MediumClevis_Center_Top_Angle.png'),require('./assets/MediumClevis/MediumClevis_Right_Top_Angle.png'),require('./assets/MediumClevis/MediumClevis_Back_Top_Angle.png')],
                        [require('./assets/MediumClevis/MediumClevis_Left_Back_Angle.png'),require('./assets/MediumClevis/MediumClevis_Left.png'),require('./assets/MediumClevis/MediumClevis_Left_Angle.png'),require('./assets/MediumClevis/MediumClevis_Center.png'),
                        require('./assets/MediumClevis/MediumClevis_Right_Angle.png'),require('./assets/MediumClevis/MediumClevis_Right.png'),require('./assets/MediumClevis/MediumClevis_Right_Back_Angle.png'),require('./assets/MediumClevis/MediumClevis_Back.png')],
                        [require('./assets/MediumClevis/MediumClevis_Left_Bottom_Angle.png'),require('./assets/MediumClevis/MediumClevis_Center_Bottom_Angle.png'),require('./assets/MediumClevis/MediumClevis_Right_Bottom_Angle.png'),require('./assets/MediumClevis/MediumClevis_Back_Bottom_Angle.png')],
                        [require('./assets/MediumClevis/MediumClevis_Bottom.png')]],trueAnswer: false, userAnswer: null },
                        {key: 'Middle Lateral C1' ,image: [[require('./assets/MidLateralC1/MidLateralC1_Top.png')],
                        [require('./assets/MidLateralC1/MidLateralC1_Left_Top_Angle.png'),require('./assets/MidLateralC1/MidLateralC1_Center_Top_Angle.png'),require('./assets/MidLateralC1/MidLateralC1_Right_Top_Angle.png'),require('./assets/MidLateralC1/MidLateralC1_Back_Top_Angle.png')],
                        [require('./assets/MidLateralC1/MidLateralC1_Left_Back_Angle.png'),require('./assets/MidLateralC1/MidLateralC1_Left.png'),require('./assets/MidLateralC1/MidLateralC1_Left_Angle.png'),require('./assets/MidLateralC1/MidLateralC1_Center.png'),
                        require('./assets/MidLateralC1/MidLateralC1_Right_Angle.png'),require('./assets/MidLateralC1/MidLateralC1_Right.png'),require('./assets/MidLateralC1/MidLateralC1_Right_Back_Angle.png'),require('./assets/MidLateralC1/MidLateralC1_Back.png')],
                        [require('./assets/MidLateralC1/MidLateralC1_Left_Bottom_Angle.png'),require('./assets/MidLateralC1/MidLateralC1_Center_Bottom_Angle.png'),require('./assets/MidLateralC1/MidLateralC1_Right_Bottom_Angle.png'),require('./assets/MidLateralC1/MidLateralC1_Back_Bottom_Angle.png')],
                        [require('./assets/MidLateralC1/MidLateralC1_Bottom.png')]],trueAnswer: false, userAnswer: null },
                       {key: 'Placard' ,image: [[require('./assets/Placard/placard_Center.png')]],trueAnswer: false, userAnswer: null },
                       {key: 'Strap Side' ,image: [[require('./assets/StrapSide/StrapSide_Top.png')],
                       [require('./assets/StrapSide/StrapSide_Left_Top_Angle.png'),require('./assets/StrapSide/StrapSide_Center_Top_Angle.png'),require('./assets/StrapSide/StrapSide_Right_Top_Angle.png'),require('./assets/StrapSide/StrapSide_Back_Top_Angle.png')],
                       [require('./assets/StrapSide/StrapSide_Left_Back_Angle.png'),require('./assets/StrapSide/StrapSide_Left.png'),require('./assets/StrapSide/StrapSide_Left_Angle.png'),require('./assets/StrapSide/StrapSide_Center.png'),
                       require('./assets/StrapSide/StrapSide_Right_Angle.png'),require('./assets/StrapSide/StrapSide_Right.png'),require('./assets/StrapSide/StrapSide_Right_Back_Angle.png'),require('./assets/StrapSide/StrapSide_Back.png')],
                       [require('./assets/StrapSide/StrapSide_Left_Bottom_Angle.png'),require('./assets/StrapSide/StrapSide_Center_Bottom_Angle.png'),require('./assets/StrapSide/StrapSide_Right_Bottom_Angle.png'),require('./assets/StrapSide/StrapSide_Back_Bottom_Angle.png')],
                       [require('./assets/StrapSide/StrapSide_Bottom.png')]],trueAnswer: false, userAnswer: null },
                       {key: 'Suspension 1' ,image: [[require('./assets/Suspension1/Suspension1_Top.png')],
                       [require('./assets/Suspension1/Suspension1_Left_Top_Angle.png'),require('./assets/Suspension1/Suspension1_Center_Top_Angle.png'),require('./assets/Suspension1/Suspension1_Right_Top_Angle.png'),require('./assets/Suspension1/Suspension1_Back_Top_Angle.png')],
                       [require('./assets/Suspension1/Suspension1_Left_Back_Angle.png'),require('./assets/Suspension1/Suspension1_Left.png'),require('./assets/Suspension1/Suspension1_Left_Angle.png'),require('./assets/Suspension1/Suspension1_Center.png'),
                       require('./assets/Suspension1/Suspension1_Right_Angle.png'),require('./assets/Suspension1/Suspension1_Right.png'),require('./assets/Suspension1/Suspension1_Right_Back_Angle.png'),require('./assets/Suspension1/Suspension1_Back.png')],
                       [require('./assets/Suspension1/Suspension1_Left_Bottom_Angle.png'),require('./assets/Suspension1/Suspension1_Center_Bottom_Angle.png'),require('./assets/Suspension1/Suspension1_Right_Bottom_Angle.png'),require('./assets/Suspension1/Suspension1_Back_Bottom_Angle.png')],
                       [require('./assets/Suspension1/Suspension1_Bottom.png')]],trueAnswer: false, userAnswer: null },
                       {key: 'Suspension 2' ,image: [[require('./assets/Suspension2/Suspension2_Top.png')],
                       [require('./assets/Suspension2/Suspension2_Left_Top_Angle.png'),require('./assets/Suspension2/Suspension2_Center_Top_Angle.png'),require('./assets/Suspension2/Suspension2_Right_Top_Angle.png'),require('./assets/Suspension2/Suspension2_Back_Top_Angle.png')],
                       [require('./assets/Suspension2/Suspension2_Left_Back_Angle.png'),require('./assets/Suspension2/Suspension2_Left.png'),require('./assets/Suspension2/Suspension2_Left_Angle.png'),require('./assets/Suspension2/Suspension2_Center.png'),
                       require('./assets/Suspension2/Suspension2_Right_Angle.png'),require('./assets/Suspension2/Suspension2_Right.png'),require('./assets/Suspension2/Suspension2_Right_Back_Angle.png'),require('./assets/Suspension2/Suspension2_Back.png')],
                       [require('./assets/Suspension2/Suspension2_Left_Bottom_Angle.png'),require('./assets/Suspension2/Suspension2_Center_Bottom_Angle.png'),require('./assets/Suspension2/Suspension2_Right_Bottom_Angle.png'),require('./assets/Suspension2/Suspension2_Back_Bottom_Angle.png')],
                       [require('./assets/Suspension2/Suspension2_Bottom.png')]],trueAnswer: false, userAnswer: null },
                       {key: 'Suspension Strap Order' ,image: [[require('./assets/SusStrapOrder/SusStrapOrder_Top.png')],
                       [require('./assets/SusStrapOrder/SusStrapOrder_Left_Top_Angle.png'),require('./assets/SusStrapOrder/SusStrapOrder_Center_Top_Angle.png'),require('./assets/SusStrapOrder/SusStrapOrder_Right_Top_Angle.png'),require('./assets/SusStrapOrder/SusStrapOrder_Back_Top_Angle.png')],
                       [require('./assets/SusStrapOrder/SusStrapOrder_Left_Back_Angle.png'),require('./assets/SusStrapOrder/SusStrapOrder_Left.png'),require('./assets/SusStrapOrder/SusStrapOrder_Left_Angle.png'),require('./assets/SusStrapOrder/SusStrapOrder_Center.png'),
                       require('./assets/SusStrapOrder/SusStrapOrder_Right_Angle.png'),require('./assets/SusStrapOrder/SusStrapOrder_Right.png'),require('./assets/SusStrapOrder/SusStrapOrder_Right_Back_Angle.png'),require('./assets/SusStrapOrder/SusStrapOrder_Back.png')],
                       [require('./assets/SusStrapOrder/SusStrapOrder_Left_Bottom_Angle.png'),require('./assets/SusStrapOrder/SusStrapOrder_Center_Bottom_Angle.png'),require('./assets/SusStrapOrder/SusStrapOrder_Right_Bottom_Angle.png'),require('./assets/SusStrapOrder/SusStrapOrder_Back_Bottom_Angle.png')],
                       [require('./assets/SusStrapOrder/SusStrapOrder_Bottom.png')]],trueAnswer: false, userAnswer: null },
                       {key: 'Top Lateral C1' ,image: [[require('./assets/TopLateralC1/TopLateralC1_Top.png')],
                       [require('./assets/TopLateralC1/TopLateralC1_Left_Top_Angle.png'),require('./assets/TopLateralC1/TopLateralC1_Center_Top_Angle.png'),require('./assets/TopLateralC1/TopLateralC1_Right_Top_Angle.png'),require('./assets/TopLateralC1/TopLateralC1_Back_Top_Angle.png')],
                       [require('./assets/TopLateralC1/TopLateralC1_Left_Back_Angle.png'),require('./assets/TopLateralC1/TopLateralC1_Left.png'),require('./assets/TopLateralC1/TopLateralC1_Left_Angle.png'),require('./assets/TopLateralC1/TopLateralC1_Center.png'),
                       require('./assets/TopLateralC1/TopLateralC1_Right_Angle.png'),require('./assets/TopLateralC1/TopLateralC1_Right.png'),require('./assets/TopLateralC1/TopLateralC1_Right_Back_Angle.png'),require('./assets/TopLateralC1/TopLateralC1_Back.png')],
                       [require('./assets/TopLateralC1/TopLateralC1_Left_Bottom_Angle.png'),require('./assets/TopLateralC1/TopLateralC1_Center_Bottom_Angle.png'),require('./assets/TopLateralC1/TopLateralC1_Right_Bottom_Angle.png'),require('./assets/TopLateralC1/TopLateralC1_Back_Bottom_Angle.png')],
                       [require('./assets/TopLateralC1/TopLateralC1_Bottom.png')]],trueAnswer: false, userAnswer: null }] 

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
            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: "#221f20", height: 55, borderTopWidth: 5, borderBottomWidth: 3, borderColor: "#ffcc01" }}>
                <View style={{alignSelf: 'center', display: 'flex', flex: 1}}>
                <Text style={{alignSelf: 'center', color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>TESTS</Text>
                </View>
            </View>

            <View>
            <Text style={[styles.inspectorTitle, {marginTop: isPhone? 15 : 30, marginBottom: isPhone? 15 : 10}]}>PRACTICAL TEST</Text>
            </View>
        <View style={styles.slTestR1}>
            <View style={styles.slTestR1C1}>
            <View>
                <Text style={{fontSize: isPhone? 20 : 35, alignSelf: 'center', marginBottom: 10}}>A-22 Cargo Bag</Text>
                <View style={[styles.slTestR1B, {backgroundColor: theme.colors.backdrop, borderColor: theme.colors.onSurfaceVariant}]}>
                    <Image source={require("./assets/Bag 1.png")} 
                        style={{
                        width: 'auto',
                        height: isPhone? 150 : 250,
                        resizeMode: 'contain',
                        }}/>
                </View>

            </View>
            </View>
            <View style={[styles.slTestR1VerticalBar, {borderColor: theme.colors.onSurfaceVariant}]}>
            </View>
            <View style={[styles.slTestR1C2, {alignVertical: 'middle'}]}>
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
    let testName = timed ? 'Timed Test' : 'Untimed Test';
    useEffect(() => {
        deficientImages.forEach(item => {
            item.userAnswer = null;
        });
        normalImages.forEach(item => {
            item.userAnswer = null;
        });
    }, []);

    const [QuizImages, setQuizImages] = useState(() => {
        let images = [];
        let imagesLength = Math.floor(Math.random() * (13)) + 4;
        if (imagesLength === 4){
            shuffleArray(deficientImages);
            shuffleArray(normalImages);
            images = deficientImages.slice(0,4);
            shuffleArray(normalImages);
            shuffleArray(deficientImages);
            
        }
        else{
            shuffleArray(normalImages);
            shuffleArray(deficientImages);
            images.push(... deficientImages.slice(0,4));
            images.push(...normalImages.slice(0,(imagesLength - 4)))
            shuffleArray(normalImages);
            shuffleArray(deficientImages);
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
        QuizImages[currentArrayIndex].userAnswer = (QuizImages[currentArrayIndex].userAnswer === null || QuizImages[currentArrayIndex].userAnswer === false) ? true : null;
        if (currentArrayIndex < QuizImages.length - 1) {
            setCurrentArrayIndex(prevIndex => prevIndex + 1);
        }
    };
    
    const handleNextPress = () => {
        QuizImages[currentArrayIndex].userAnswer = (QuizImages[currentArrayIndex].userAnswer === null || QuizImages[currentArrayIndex].userAnswer === true) ? false : null;
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
        }if (QuizImages[currentArrayIndex].key === "Placard"){
            setCurrentCol(3)
            setCurrentRow(2)
        }
    };
    const handleRightPress = () => {
        if (currentArrayIndex < QuizImages.length - 1) {
            setCurrentArrayIndex(prevIndex => prevIndex + 1);
        }if (QuizImages[currentArrayIndex].key === "Placard"){
            setCurrentCol(3)
            setCurrentRow(2)
        }
    };
    const toggleStopwatch = () => {
        setRunning(prevRunning => !prevRunning);
    }
    const [menuVisible, setMenuVisible] = useState(false);

    const handleHamburgerClick = () => {
      setMenuVisible(!menuVisible);
    };

    const elements = QuizImages.map((image, index) => image.key + '_' + index);

    // Initialize result array to store mark colors
    const initialResults = Array(elements.length).fill('unmarked');
    const [result, setResult] = useState(initialResults);

    const initialButtonState = Array(elements.length).fill('unmarked');
    const [buttonStates, setButtonStates] = useState(initialButtonState);
  
    // Initialize current state to first element
    const [currentState, setCurrentState] = useState(elements[0]);
  
    const handleItemClick = (element) => {
        // const index = parseInt(element.split('_')[1]);
        setCurrentState(element);
        const updatedIndex = elements.indexOf(element);
        console.log("Updated Index:", updatedIndex);
        setCurrentArrayIndex(updatedIndex);
    };
    // const handleItemClick = (element, index) => {
    //     setCurrentState(element); // Set current state to clicked element
    //     console.log("Index of clicked element:", index);
    //     // Perform other operations using the index as needed
    // };
    const currentIndex = currentArrayIndex;
    const updatedButtonStates = [...buttonStates];

    const handleButtonClick = (buttonType) => {
        const updatedResult = [...result];

        if ((deficiencyTitle === 'Unmark') || (nextTitle === 'Unmark')) {
          // Reset mark color for current element
        //   const updatedResult = [...result];
          updatedResult[currentIndex] = 'unmarked';
          setResult(updatedResult);
  
          // Restore buttons to original state
        } else if (currentIndex <= elements.length) {
          // Toggle mark color for current element
        //   const updatedResult = [...result];
            if (buttonType==='deficiency') {
                    updatedResult[currentIndex] = 'red';
            } else if (buttonType==='next') {
                updatedResult[currentIndex] = 'green';
            } else {
                updatedResult[currentIndex] = 'unmarked';
            }
          setResult(updatedResult);
          // // Move to next element
        //   setCurrentState(elements[currentIndex]);
  
        }
      };
    const images = QuizImages[currentArrayIndex].image
    const imageArrayName = QuizImages[currentArrayIndex].key
    const [currentRow, setCurrentRow] = React.useState((imageArrayName === "Placard") ? 0 : Math.floor(images.length / 2));
    console.log(QuizImages)
    console.log(images)
    const [currentCol, setCurrentCol] = React.useState((imageArrayName === "Placard") ? 0 : Math.floor(images[currentRow].length / 2)- 1);
    console.log(currentRow)
    console.log(currentCol)
    function changeImage  (direction) {
        if (direction === 'Up') {
            if (imageArrayName !== "Placard"){
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
            setCurrentRow(0);
            }
        }
        else if (direction === 'Down') {
            if (imageArrayName !== "Placard"){
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
            setCurrentRow(0);}
        }
        else if (direction === 'Left') {
            setCurrentCol((currentCol - 1 + images[currentRow].length) % images[currentRow].length);
        }
        else if (direction === 'Right') {
            setCurrentCol((currentCol + 1) % images[currentRow].length);
        }
        else if (direction === 'Home') {
            {setCurrentRow(Math.floor(images.length/2));
            setCurrentCol((imageArrayName === "Placard") ? 1  : 3);
        }
        }
    } 
    return (
        <ScrollView style={{margin: 0}} showsVerticalScrollIndicator={false}> 
            <View style={{marginTop: -9, marginBottom: 8}}>
                <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: "#221f20", height: isPhone? 45 : 55, borderTopWidth: 5, borderBottomWidth: 3, borderColor: "#ffcc01" }}>
                    <View style={{alignSelf: 'center', display: 'flex', flex: 1}}>
                        <Text style={{alignSelf: 'center', color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>{testName}</Text>
                    </View>
                </View>

            {/* LIMIT THE HEIGHT OF THE DEVICE TO AVOID OVERFLOW */}
            <View style={{height: isPhone? 540 : 600}}>
                <View style={{flexDirection: isPhone? 'column' : 'row', backgroundColor: isPhone? 'transparent' : 'rgba(232, 226, 217, 0.3)'}}>
                    <View style={[styles.untimedTestC1, {alignItems: 'center',  position: isPhone? 'absolute' : 'auto', top: isPhone? 490 : 'auto', left: isPhone? 138 : 'auto', zIndex: 20}]}>
                        <View style={{display: isPhone? 'none' : 'auto'}}>
                            <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
                        </View>
                        <View style={{flexDirection: isPhone? 'row' : 'auto', gap: isPhone? 13 : 10}}>
                            <View style={[styles.deficiencyButton]}>
                                <TouchableOpacity onPress={() => { handleDeficiencyPress(); handleButtonClick('deficiency'); }}>
                                    <Text style={{ fontSize: isPhone ? 16 : 25, color: '#E8E2D9', alignSelf: 'center', zIndex: 20 }}>{deficiencyTitle}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.nextUntimedTestButton]}>
                                <TouchableOpacity onPress={() => {handleNextPress(); handleButtonClick('next');}}>
                                    <Text style={{fontSize: isPhone? 16 : 25, color: '#E8E2D9', alignSelf: 'center'}}>{nextTitle}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.endTestButton, {justifyContent: 'center'}]}>
                                <TouchableOpacity onPress={() => navigation.navigate('End Quiz', { imageArray: QuizImages, elapsedTime: elapsedTime })}>
                                    <Text style={{fontSize: isPhone? 16 : 18, color: '#E8E2D9'}}>End Test</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                
                    <View style={[styles.imageTitleDisplay, {display: isPhone? 'flex' : 'none', zIndex: 10, top: isPhone? 10 : 470, position: 'absolute'}]}>
                        <TouchableOpacity onPress={handleLeftPress}>
                            <View style={{justifyContent: 'flex-end', marginTop: isPhone? 5 : 'auto', alignSelf: 'center'}}>
                                <FontAwesome name="chevron-left" size={isPhone? 25 : 35} color='#E8E2D9' />
                            </View>
                        </TouchableOpacity>
                        <View style={{flex: 0.8, justifyContent: 'center'}}>
                            <Text style={{fontSize: isPhone? 20 : 25, alignSelf: 'center', color: '#E8E2D9', alignContent: 'center'}}>{QuizImages[currentArrayIndex].key}</Text>
                        </View>                      
                        <TouchableOpacity onPress={handleRightPress}>
                            <View style={{justifyContent: 'flex-end',alignItems: 'center', marginTop: isPhone? 5 : 'auto'}}>
                                <FontAwesome name="chevron-right" size={isPhone? 25 : 35} color='#E8E2D9' />
                            </View> 
                        </TouchableOpacity>
                    </View>


                    <View style={styles.untimedTestC2}>
                    {/* THIS MENU IS ANOTHER COPY FOR BROKEN MENU IN WEB VIEW */}
                        {(menuVisible && !isPhone) && (<View style={{zIndex: 13, alignSelf: 'flex-end',backgroundColor:'rgba(0, 0, 0, 0.8)', paddingLeft: isPhone? 'none' : 0, borderRadius: isPhone? 15 : 0,
                            top: isPhone? 70 : 0, right: isPhone? 25 : 'auto', position: 'absolute'}}>
                                {/* Menu items */}
                        <View style={[styles.menuSection, {top: isPhone? 'auto' : 0, backgroundColor: '#E8E2D940'}]}>
                            <Text style={[styles.sectionMenuTitle, {fontSize: isPhone? 15 : 23, alignSelf: 'center'}]}>SECTION MENU</Text>
                        </View>

            <ScrollView style={{height: isPhone? 190 : 480, top: isPhone? 10 : 15}} showsVerticalScrollIndicator={true}>
            {elements.map((element, index) => (
                <TouchableOpacity key={index} onPress={() => handleItemClick(element)} style={{ padding: isPhone? 5 : 10, flexDirection: 'row'}}>

                    <View style={[styles.menuItemBox, {marginLeft: isPhone? 10 : 20, marginRight: isPhone? 10 : 20}]}>
                        {(result[index] === 'red') && (
                        <View style={{justifyContent: 'center', marginRight: isPhone? 5 : 25, marginLeft: isPhone? 5 : 20}}>
                            <Text style={{color: 'red', fontSize: isPhone? 18 : 25}}>X</Text>
                        </View>
                        )}
                    <View style={{justifyContent: 'center', marginLeft: isPhone? 5 : 20, marginRight: isPhone? 5 : 25}}>
                        {result[index] === 'green' && (
                            <View style={{backgroundColor: 'green', width: isPhone? 20 :25, height: isPhone? 20 : 25, borderRadius: isPhone? 20 :25}}></View>
                        )}
                        {result[index] === 'unmarked'&& (
                            <View style={{backgroundColor: 'rgba(232, 226, 217, 0.4)', width: isPhone? 20 : 25, height: isPhone? 20:  25, borderRadius: isPhone? 20 : 25}}></View>
                        //   <FontAwesome name="check" size={16} color="green" style={{ marginLeft: 10 }} />
                        )}
                    </View>
                        <View style={{marginLeft: isPhone? 30 : 60, position: 'absolute', paddingVertical: 2}}>
                            <Text style={{fontSize: isPhone? 15 : 20, color: '#E8E2D9'}}>{element.split('_')[0]}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                ))}           
            </ScrollView>

    <View style={{height: isPhone? 15 : 25, shadowColor: 'white', 
        backgroundColor: '#E8E2D940', borderBottomLeftRadius: isPhone? 15 : 0,
        borderBottomRightRadius: isPhone? 15 : 0, marginTop: 20 }}></View>
    </View>
    )}
    <View style={{display: isPhone? 'none' : 'flex', top: isPhone? 0 : 0, zIndex: 25}}>
        <TouchableOpacity onPress={handleHamburgerClick}>
            <View style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', paddingTop: 8, paddingBottom: 8, 
                paddingRight: 12, paddingLeft: 12, borderRadius: 10, position: 'absolute', alignSelf: isPhone? 'auto' : 'flex-end',
                zIndex: 25,
                right : 25, top : isPhone? -330 : 10}}>
                <FontAwesome name="list-ul" size={isPhone? 24 : 40} color='#E8E2D9' />
            </View>
        </TouchableOpacity>
    </View>

        <View style={{display: isPhone? 'flex' : 'none', backgroundColor: 'rgba(232, 226, 217, 0.3)', borderWidth: 1, borderColor: theme.colors.onBackground, borderRadius: 10,
            top: 60, width: isPhone? 340 : 500, height: 400, maxHeight: isPhone? 400 : 'auto',alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}} >
            <Image source = {(QuizImages[currentArrayIndex].key === "Placard") ? QuizImages[currentArrayIndex].image[0][0] : QuizImages[currentArrayIndex].image[currentRow][currentCol]}
            resizeMode = 'contain' 
            style={{alignSelf: 'center', maxHeight: 330, maxWidth: 330 , height: 330, width: 320}}/>
        </View>
        <View>
            <View style={{display: isPhone? 'none' : 'flex', top: isPhone? 'auto' : 20, width: isPhone? 320 : 500, height: 450,
             maxHeight: isPhone? 300 : 'auto',alignSelf: 'center'
            ,justifyContent: 'center'}} >
            <Image source = {(QuizImages[currentArrayIndex].key === "Placard") ? QuizImages[currentArrayIndex].image[0][0] : QuizImages[currentArrayIndex].image[currentRow][currentCol]}
        resizeMode = 'contain' 
        style={{alignSelf: 'center', height: isPhone? 300 : 450, maxWidth: isPhone? 300 : 600, marginTop: isPhone? 10 : 30}}/>
            </View>
        <View>
            <View style ={[styles.navigationButton, {left: isPhone? 45 : 25, bottom: isPhone? 20 : 100, position: 'absolute'}]}>
        <View style={{borderColor: theme.colors.onBackground, left: isPhone? 10 : 'auto',
            marginBottom: isPhone? 10 : 20, borderWidth: isPhone? 3 : 6, height: isPhone? 70 : 85, 
            width: isPhone? 70 : 85, borderRadius: isPhone? 70 : 85, justifyContent: 'center', 
            bottom: isPhone? -150 : 'auto', alignSelf: 'center'}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => changeImage('Up')}>
                <View >
                    <FontAwesome name="arrow-up" size={isPhone? 25 : 25} color={theme.colors.onBackground} alignSelf='center'/>
                </View>
            </TouchableOpacity>

            </View>
            <View style={{flexDirection: 'row', gap :17, marginTop: -5, marginBottom: -5, alignSelf: 'center'}}>
            <TouchableOpacity onPress={() => changeImage('Left')}>
                <View>
                    <FontAwesome name="arrow-left" size={isPhone? 25 : 25} color={theme.colors.onBackground}/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => changeImage('Right')}>
                <View>
                    <FontAwesome name="arrow-right" size={isPhone? 25 : 25} color={theme.colors.onBackground}/>
                </View>
            </TouchableOpacity>
            </View>
            <View style={{alignSelf: 'center'}}>
            <TouchableOpacity onPress={() => changeImage('Down')}>
                <View>
                    <FontAwesome name="arrow-down" size={isPhone? 25 : 25} color={theme.colors.onBackground}/>
                </View>
            </TouchableOpacity>
            </View>
        </View>

        <View style={{borderColor: theme.colors.onBackground, marginBottom: isPhone? 10 : 20, borderWidth: isPhone? 3 : 6, 
        height: isPhone? 70 : 85, width: isPhone? 70 : 85, borderRadius: isPhone? 70 : 85, 
        justifyContent: 'center', alignSelf: 'center', right: isPhone? -260 : 'auto', bottom: isPhone? -70 : 'auto'}}>
            <TouchableOpacity onPress={() => changeImage('Home')}>
                <View style={{alignSelf: 'center'}}>
                <FontAwesome name="rotate-left" size={isPhone? 40 : 45} color={theme.colors.onBackground}/>
                </View>
            </TouchableOpacity>
        </View>
        </View>
    </View>
        <View style={[styles.imageTitleDisplay, {display: isPhone? 'none' : 'flex', zIndex: 10, top: isPhone? 10 : 470, position: 'absolute'}]}>
                <TouchableOpacity onPress={handleLeftPress}>
                            <View style={{justifyContent: 'flex-end', marginTop: isPhone? 5 : 'auto', alignSelf: 'center'}}>
                            <FontAwesome name="chevron-left" size={isPhone? 25 : 35} color='#E8E2D9' />
                            </View>
                            <View>
                            </View>
                </TouchableOpacity>
                <View style={{flex: 0.8, justifyContent: 'center'}}>
                <Text style={{fontSize: isPhone? 20 : 25, alignSelf: 'center', color: '#E8E2D9', alignContent: 'center'}}>{QuizImages[currentArrayIndex].key}</Text>

                </View>                      
                    <TouchableOpacity onPress={handleRightPress}>
                        <View style={{justifyContent: 'flex-end',alignItems: 'center', marginTop: isPhone? 5 : 'auto'}}>
                            <FontAwesome name="chevron-right" size={isPhone? 25 : 35} color='#E8E2D9' />
                        </View>
                        <View>
                    </View>
                </TouchableOpacity>
        </View>
    <View>
</View>

<View style={{ flexDirection: 'column', position: 'absolute', flex: isPhone? 1 : 0.3, width: 'auto', alignSelf: 'flex-end', right: isPhone? 25 : 0, bottom: isPhone? 0 : 'auto', top: isPhone? 'auto' : 0,
height: 'auto', borderWidth: isPhone? 0 : 0, borderRadius: 10,
    borderColor: 'rgba(232, 226, 217, 0.4)'}}>
<View style={{top: isPhone? 0 : 0, zIndex: 25, display: isPhone? 'flex' : 'none'}}>
    <TouchableOpacity onPress={handleHamburgerClick}>
        <View style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', paddingTop: 8, paddingBottom: 8, 
        paddingRight: 12, paddingLeft: 12, borderRadius: 10, position: 'absolute', alignSelf: isPhone? 'auto' : 'flex-end',
        zIndex: 25,
        right : 25, top : isPhone? -330 : 10}}>
            <FontAwesome name="bars" size={isPhone? 24 : 40} color='#E8E2D9' />
        </View>
    </TouchableOpacity>
</View>

{(menuVisible && isPhone) && (<View style={{backgroundColor:'rgba(0, 0, 0, 0.8)', paddingLeft: isPhone? 'none' : 0, borderRadius: isPhone? 15 : 0, top: isPhone? -330 : 0, right: isPhone? 25 : 'auto', position: 'absolute'}}>
    {/* Menu items */}

    <View style={[styles.menuSection, {top: isPhone? 'auto' : 0, backgroundColor: '#E8E2D940'}]}>
            <Text style={[styles.sectionMenuTitle, {fontSize: isPhone? 15 : 23, alignSelf: 'center', zIndex: 15}]}>SECTION MENU</Text>
        </View>

    <ScrollView style={{height: isPhone? 190 : 400, top: isPhone? 10 : 15}} showsVerticalScrollIndicator={true}>
    {elements.map((element, index) => (
      <TouchableOpacity key={index} onPress={() => handleItemClick(element)} style={{ padding: isPhone? 5 : 10, flexDirection: 'row'}}>

        <View style={[styles.menuItemBox, {marginLeft: isPhone? 10 : 20, marginRight: isPhone? 10 : 20}]}>
        {(result[index] === 'red') && (
            <View style={{justifyContent: 'center', marginRight: isPhone? 5 : 25, marginLeft: isPhone? 5 : 20}}>
            <Text style={{color: 'red', fontSize: isPhone? 18 : 30}}>X</Text>
            </View>
        //   <FontAwesome name="check" size={16} color="red" style={{ marginLeft: 10 , backgroundColor: 'red'}} />
        )}
        <View style={{justifyContent: 'center', marginLeft: isPhone? 5 : 20, marginRight: isPhone? 5 : 25}}>
        {result[index] === 'green' && (
            <View style={{backgroundColor: 'green', width: isPhone? 20 :25, height: isPhone? 20 : 25, borderRadius: isPhone? 20 :25}}></View>
        //   <FontAwesome name="check" size={16} color="green" style={{ marginLeft: 10 }} />
        )}
        {result[index] === 'unmarked'&& (
            <View style={{backgroundColor: 'rgba(232, 226, 217, 0.4)', width: isPhone? 20 : 25, height: isPhone? 20:  25, borderRadius: isPhone? 20 : 25}}></View>
        //   <FontAwesome name="check" size={16} color="green" style={{ marginLeft: 10 }} />
        )}
        </View>
        <View style={{marginLeft: isPhone? 30 : 60, position: 'absolute', paddingVertical: 2}}>
            <Text style={{fontSize: isPhone? 15 : 23, color: '#E8E2D9'}}>{element.split('_')[0]}</Text>
        </View>
        </View>

      </TouchableOpacity>
    ))}
    
    </ScrollView>

    <View style={{height: isPhone? 15 : 40, shadowColor: 'white', 
    backgroundColor: '#E8E2D940', borderBottomLeftRadius: isPhone? 15 : 0,
    borderBottomRightRadius: isPhone? 15 : 0, marginTop: 20 }}></View>
  </View>
    )}
  {/* Menu box */}
  {/* Buttons to toggle item states */}

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
    const theme = useTheme();
    const handleQuestionClick = (index) => {
        if (!clickedQuestions.includes(index)) {
            setClickedQuestions([...clickedQuestions, index]);
        } else {
            const updatedClickedQuestions = clickedQuestions.filter((clickedIndex) => clickedIndex !== index);
            setClickedQuestions(updatedClickedQuestions);
        }
    };
    React.useEffect(() => {
        const scorePercentage = Math.round((deficienciesCorrect / deficienciesTotal) * 100);
        setQuizScores([...quizScores, scorePercentage]);
    }, [deficienciesCorrect, deficienciesTotal]);

    // const deficientItem = showingDeficient.find(item => item.id === deficientItemId);
    return (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> 
            <View style={{marginTop: -9, marginBottom: 8, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: "#221f20", height: 45, borderTopWidth: 5, borderBottomWidth: 3, borderColor: "#ffcc01" }}>
                    <View style={{alignSelf: 'center', display: 'flex', flex: 1}}>
                        <Text style={{alignSelf: 'center', color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>End Screen Stat</Text>
                </View>
                <SlingloadDropdown style={{zIndex: 300, position: 'absolute'}}/>

                </View>
            <View style={[styles.endQuizR1, {marginTop: isPhone? 20 : 30, flexDirection: 'row', marginLeft: isPhone? 40 : 0, alignItems: 'center', width: isPhone? 400 : 1100, alignSelf: 'center'}]}>
                <View style={{flex: 0.3, justifyContent: 'center', marginLeft: isPhone? 0 : 50}}>
                    <Text style={{fontSize: isPhone? 16: 35, color:'#E8E2D9', fontWeight: 500, alignSelf: 'center'}} >{formatTime(elapsedTime)}</Text>
                    <Text style={{fontSize: isPhone? 16: 20, color:'#E8E2D9', fontWeight: 500, alignSelf: 'center'}} >Total Time</Text>
                </View>
                    <View style={{flex: 0.4, justifyContent: 'center', alignSelf: 'center'}}>
                        <Text style={{alignSelf: 'center', color: passStatus==='PASS'? 'green' : 'red', fontSize: isPhone? 32: 55, fontWeight: 700}}>{passStatus}</Text>
                    </View>
                <View style={{flex: 0.3, justifyContent: 'center', marginRight: 50}}>
                    <Text style={{fontSize: isPhone? 16: 35, color:'#E8E2D9', alignSelf: 'center' }} >{deficienciesIdentified}</Text>
                    <Text style={{fontSize: isPhone? 16: 20, color:'#E8E2D9', alignSelf: 'center', textAlign: 'center' }} >Deficiencies</Text>
                    <Text style={{fontSize: isPhone? 16: 20, color:'#E8E2D9', alignSelf: 'center', textAlign: 'center' }} >Identified</Text>
                </View>
            </View>
            <View style={styles.endQuizR2}>

                {imageArray.map((question, index) => (
                    <View>
                    
                    <TouchableOpacity onPress={() => handleQuestionClick(index)}>
                    <View key={index} style={[styles.resultBox, {marginTop: isPhone? 5 : 10, flexWrap: 'wrap', backgroundColor: question.trueAnswer===question.userAnswer? 'green' : 'red'}]}>
                        
                        {/* <Text style={{fontSize: 30, color:'#E8E2D9', marginLeft: 20}}>Question {(index + 1)} : {question.key}</Text> */}
                        {(question.trueAnswer===question.userAnswer && question.userAnswer != null) && (
                            <Text style={{fontWeight: 600, fontSize: isPhone? 18 : 22, color:'#E8E2D9', marginLeft: isPhone? 10 : 20}}>Correct :  {question.key}</Text>                       
                        )}
                        {(question.trueAnswer!=question.userAnswer && question.userAnswer != null) && (
                            <Text style={{fontWeight: 600, fontSize: isPhone? 18 : 22, color:'#E8E2D9', marginLeft: isPhone? 10 : 20}}>Incorrect :  {question.key}</Text>                       
                        )}
                        {(question.userAnswer == null && question.trueAnswer != null) && (
                            <Text style={{fontWeight: 600, fontSize: isPhone? 18 : 22, color:'#E8E2D9', marginLeft: isPhone? 10 : 20}}>No Answer :  {question.key}</Text>                       
                        )}
                        {/* Case:  the item is not deficient but the user's answer is deficient */}
                        {(question.userAnswer===true && question.trueAnswer===false) && (
                            <Text style={{fontSize: isPhone? 16 : 18, color:'#E8E2D9', marginLeft: 15, marginTop: isPhone? 5 : 5, flexWrap: 'wrap', maxWidth: isPhone? 300 : 700}}>You marked {question.key} as deficient when there were no problems.</Text>
                        )}
                        {/* Case:  the item is deficient but the user's answer is not deficient */}
                        {(question.userAnswer===false && question.trueAnswer===true) && (
                            <Text style={{fontSize: isPhone? 16 : 18, color:'#E8E2D9', marginLeft: 15, marginTop: isPhone? 5 : 5, flexWrap: 'wrap', maxWidth: isPhone? 300 : 700}}>You marked {question.key} as no deficient when there were deficient.</Text>
                        )}
                        {/* Case:  right anwer*/}
                            {(question.userAnswer===question.trueAnswer && question.userAnswer!=null) && (
                            <Text style={{fontSize: isPhone? 16 : 18, color:'#E8E2D9', marginLeft: 15, marginTop: isPhone? 5 : 5, flexWrap: 'wrap', maxWidth: isPhone? 300 : 700}}>You're right! {question.key} is {question.trueAnswer===true? 'deficient' : 'not deficient'}</Text>
                        )}
                        {/* Case: getting no answer from user */}
                        {/* <View><Text>{question.userAnswer}</Text></View>
                        {(question.userAnswer===null) && (
                            <Text style={{fontSize: isPhone? 16 : 18, color:'#E8E2D9', marginLeft: 15, marginTop: isPhone? 5 : 5, flexWrap: 'wrap', maxWidth: isPhone? 300 : 700}}> {question.key} is {question.trueAnswer===true? 'deficient' : 'not deficient'}.</Text>
                        )} */}
          
                        <View>
        <View style={{alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
        {(clickedQuestions.includes(index))&& (
                            <View>
        {/* <Image source={question.image[0][0]} */}
        {showingDeficient.find(item => item.id === question.id) && (
            <View>
                <View style={{flexDirection: 'row', marginTop: isPhone? 15 : 30, marginBottom: isPhone? 15 : 30}}>
                    <View style={{width: isPhone? 30 : 190}}></View>
                        <View style={{width: isPhone? 250 : 420, height: isPhone? 250 : 420, alignSelf: 'center', 
                            backgroundColor: '#a8a7a2', borderRadius: 10, justifyContent: 'center'}}>
                                <Image source={showingDeficient.find(item => item.id === question.id).image}
                                // Example usage:
                                resizeMode="contain"
                                style={{maxWidth: isPhone? 280 : 350, maxHeight: isPhone? 280 : 350, alignSelf: 'center'}}/>
                        </View>
                    <View style={{width: isPhone? 30 : 190}}>
                </View>
                </View>

                <View><Text style={{fontSize: isPhone? 16 : 18, color: '#ffffff', marginLeft: isPhone? 10 : 30, marginBottom: isPhone? 10 : 30}}>Problems: {showingDeficient.find(item => item.id === question.id).string}</Text></View>
                
            </View>
        )}
        </View>
        )}
        {(clickedQuestions.includes(index))&& (
            <View>
        {question.trueAnswer===false &&(
        <View>
        <Text style={{fontSize: isPhone? 16 : 18, color:'#E8E2D9', marginLeft: 15, marginTop: isPhone? 5 : 5, flexWrap: 'wrap', maxWidth: isPhone? 300 : 700}}>There is no defificent!.</Text>
    </View>
        )}
        </View>
        )}

        <View style={{width: 300}}></View>
        </View>
                    </View>
                    </View>
        </TouchableOpacity>
                </View>
                ))}
            </View>            
            <View style={{ alignItems: isPhone? 'center' : 'flex-end', marginBottom: 20, width: isPhone? 'auto' : 800, alignSelf: 'center', marginTop: isPhone? 'auto' : 30}}>
                <TouchableOpacity onPress={() => navigation.navigate('Slingload Quiz')} style={[styles.endTestButton, {alignSelf: isPhone? 'center':'auto', justifyContent: 'center', marginTop: isPhone? 20 : 'auto'}]}>
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
            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: "#221f20", height: 55, borderTopWidth: 5, borderBottomWidth: 3, borderColor: "#ffcc01" }}>
                <View style={{alignSelf: 'center', display: 'flex', flex: 1}}>
                    <Text style={{alignSelf: 'center', color:"#FFFFFF", fontSize: 20}} variant='headlineLarge'>Practical Test Scores</Text>
                </View>
            </View>
        </View>
        <Text style={{ fontSize: 24, textAlign: 'center', marginTop: isPhone? 10 : 25, alignSelf: 'center'}}>Deficiencies Caught</Text>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', marginRight: 100 }}>
    <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: isPhone? 20 : 0 }}>
        <Text style={{ fontSize: 20, transform: [{ rotate: '-90deg' }] }}>Scores Percentage</Text>
    </View>
    <View style={{ alignItems: 'center', alignSelf: 'center', marginTop: isPhone? 10 : 30, marginLeft: isPhone? 10 : 'auto' }}>
        <LineChart
            data={data}
            width={screenWidth * 0.75} // 3/4 of the screen width
            height={300}
            chartConfig={{
                backgroundColor: '#808080', // greyish color
                backgroundGradientFrom: '#808080',
                backgroundGradientTo: '#808080',
                decimalPlaces: 0,
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
<Text style={{ fontSize: 20, textAlign: 'center', marginTop: 10 }}>
    {isPhone ? 'Score Percentage (y-axis), Test number (x-axis)' : 'Test Number'}
</Text>
    </ScrollView>
    );
}