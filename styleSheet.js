import { StyleSheet, Dimensions, View, Picker } from 'react-native';
const screenDimension = Dimensions.get("screen");
const isPhone = screenDimension.width < 800; // Adjust the threshold as needed
const videoWidth = isPhone ? screenDimension.width - 40 : 350; // Adjust the width for phone mode
const videoHeight = isPhone ? (screenDimension.width - 40) * (9 / 16) : 270; // Adjust the height for phone mode

const resolution = 9/16;

export const styles = StyleSheet.create({
// TEXT AND HEADERS
    primaryText: {
        fontSize: 16,
        fontWeight: 400,
        color: 'black',
    },
// Container for horizontal display
    container1: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 50,
        marginRight: 50,
    },
// VIDEO HUB SCREEN
    videoHubHeader: {
        alignItems: 'center', backgroundColor: 'black', height: 45, borderTopWidth: 5, borderBottomWidth: 3, borderColor: "#ffcc01" ,
        videoTitle: {
            color: "#FFFFFF",
            fontSize: 20,
            padding: 5,
        }
    },
    videoCard: {
        borderRadius: 8,
        width: videoWidth,
        height: videoHeight,
        backgroundColor: '#ffcc01',
        backgroundColor: 'black',
        margin: 50,
        marginVertical: 40,
        overflow: 'hidden',
        shadowColor: '#848785',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        borderColor: '#ffcc01',
        borderWidth: 2.5,
        flexDirection: 'row',

    },
    videoStyle: {
        position: 'relative',
        width: isPhone? 345 : resolution * (screenDimension.width),
        height: isPhone? 300 : resolution * (screenDimension.height),
        alignSelf: 'center',
        borderRadius: 8,
        videoDescriptionContainer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            justifyContent: 'space-between', 
            flexDirection: 'row',
            backgroundColor: '#ffcc01',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            height: 45,
            width: isPhone? 345 : resolution * (screenDimension.width),
            zIndex: 1,
        },
    },
//FEEDBACK SCREEN
    textStylingBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    position: 'absolute',
    top: 0,
    right: 0,
    },
    feedbackContainer: {
    position: 'relative',
    },
    text: {
        fontSize: 16,
    },
    bold: {
        fontWeight: 'bold',
    },
    italic: {
        fontStyle: 'italic',
    },
    underline: {
        textDecorationLine: 'underline',
    },
    feedbackForm: {
        backgroundColor: '#b0afae',
        borderRadius: 10,
        margin: 50,
        width: isPhone? 350 : 1040,
        height: isPhone? 630 : 'auto',
        paddingVertical: isPhone? 15 : 40,
        paddingHorizontal: isPhone? 10 :60,
        alignSelf: 'center',
    },
    picker: {                              
        height: 40,
        width: 300,
        marginTop: isPhone? 20 : 'auto',
        marginBottom: 20,
        backgroundColor: '#ffcc01',
        borderRadius: 8,
        fontWeight: 500,
        fontSize: 17,
        shadowOffset: 0.3,
        shadowColor: 'black',
        overflow: 'hidden',
        opacity: 0.7,
        paddingHorizontal: isPhone? 10 : 35,

    },
    pickerText: {
        marginTop: isPhone? 15 : 5,
        marginBottom: 15,
        fontSize: isPhone? 16 : 20,
    },
    schoolSelector: {                      // school selector bar
        justifyContent: 'center', 
        alignItems: 'center',
        overflow: 'hidden',
        zIndex: isPhone? 1 : 0,
        position: 'relative',
    },
    textScroll: {                           // select school text
        fontWeight: 600, 
        fontSize: 18,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        backgroundColor: '#ffcc01',
        color: 'yellow',
        height: 10,
        fontSize: 18,
        fontWeight: 700,
    },
    submitButton: {
        backgroundColor: '#ffcc01',
        paddingHorizontal: 10,
        paddingVertical: isPhone? 1 : 2,
        borderRadius: 8,
        borderColor: '#525254', 
        borderWidth: 1,
        transitionDuration: '0.5s',
        // cursor: 'pointer',
        // transitionDuration: '0.3s',
        // '&:hover': {
        // transform: 'scale(1.3)',
        // boxShadow: '0 10px 8px rgba(0, 0, 0, 0.5)',
        // shadowOpacity: 0.4,
        // shadowRadius: 4,
        // },
    },
    buttonText: {
        fontSize: isPhone? 14 : 16,
        color: '#525254',
    },
    starContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        textDecorationColor: 'yellow',
    },
    titleBox: {
        height: isPhone? 40 : 50,
        width: isPhone? 300 : 920,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        borderColor: '#525254', 
        textAlignVertical: 'top', 
        marginTop: isPhone? 15 : 40,
        borderWidth: 1,
        padding: isPhone? 0 : 15,
        backgroundColor: '#ffffff90',

        paddingLeft: 15,
    },
    commentBox: {
        height: isPhone? 150 : 200,
        width: isPhone? 300 : 920,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        borderColor: '#525254', 
        marginTop: 30,
        borderWidth: 1,
        padding: 15,
        marginBottom: isPhone? 15 : 'auto',
        backgroundColor: '#ffffff90',

    },
//APP.JS SCREEN
    card: {
        marginTop: 0,
        justifyContent: 'center',
        marginHorizontal: 0,
    },
    cardBtn: {
        borderRadius: 10,
        marginHorizontal: 10,
    },
    container: {
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8,
        marginHorizontal: 0,
    },
    scrollView: {
        marginHorizontal: 0,
    },
    newsImage: {
        borderWidth: 2,
        borderRadius: 8,
    },
    rectangle: {
        height: 8,
        backgroundColor: '#ffcc01',
        position: 'relative', 
    },
//slingload.js *********************************************************************************
    inspectorB1: {
        flexDirection: isPhone? 'none' : 'row',
        marginLeft: isPhone? 'auto' : 80,
        marginRight: isPhone? 'auto': 80,
    },
    basicButton: {
        height: 'auto',
        width: isPhone? 150 : 340,
        borderWidth: 1,
        borderRadius: isPhone? 10 : 20,
        padding: isPhone? 10 : 15,
        display: 'flex',
        marginBottom: isPhone? 20 : 35,

        shadowColor: 'white',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    slButtonText: {
        fontSize: isPhone? 18 : 30,
        alignSelf: 'center',
        verticalAlign: 'middle',
        display: 'flex',

    },
    inspectorTitle: {
        fontSize: isPhone? 20 : 45,
        alignSelf: 'center',
        fontWeight: 600,
        marginTop: isPhone? 20 : 'auto',
        marginBottom: isPhone? 20 : 'auto',
    },
    inspectorH1: {
        marginTop: isPhone? 15 : 30,
    },
    walkThrough: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems:'center',
        backgroundColor: '#7A7878',
        borderColor: '#000000',
        borderWidth: 1,
        height: 40, 
        width: 200,
        borderRadius: 15,
        shadowColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3, 
        shadowRadius: 6, 
        elevation: 5,
    },
    walkThroughText: {
        color: '#000000',
        fontSize: 18,
        alignSelf: 'center',
        textAlignVertical: 'center',
        marginTop: 8,
    },
    innerBox: {
        width: 160,
        height: 40,
        color: '#FFFFFF',
        alignSelf: 'center',
        borderColor: '#000000',
        // left: 1,
        borderWidth: 1,
        borderRadius: 13,
        backgroundColor: 'rgba(210, 210, 210, 1)',
        paddingLeft: 20,
        paddingRight: 20,
    },
    headerTitleContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: "#221f20", 
        height: 45, 
        borderTopWidth: 5, 
        borderBottomWidth: 3, 
        borderColor: "#ffcc01",
    },
    titleText: {
        color:"#FFFFFF", 
        fontSize: 20, 
        zIndex: 1
    },
    titleTextBox: {
        flex: 1, 
        alignItems: 'center', 
        alignSelf: 'center', 
        zIndex: 1,
    },
//slingloadSequence.js *********************************************************************
    chevronButton: {
        width: isPhone? 30 : 60, 
        height: isPhone? 30 : 60, 
        borderRadius: isPhone? 35 : 60, 
        backgroundColor: 'transparent', 
        borderWidth: isPhone? 2 : 4, 
        alignItems:'center',
    },  
    //outer black box that display information
    boxContainer: {
        backgroundColor: 'rgba(34, 31, 32, 1)',
        width: isPhone? 350 : 900,
        height: 'auto',
        alignSelf: 'center', 
        right: 20,
        padding: isPhone? 10 : 40,
        // marginTop: '-30%',
        top: isPhone? '50%' : 'auto',
        // left: isPhone? '50%' : 'auto',
        marginTop: isPhone? '-50%' : '-50%',
        transform: isPhone? [{ translateX: 0}, { translateY: -400}] : 0,
        position: 'absolute',
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10,
        zIndex: 1000,
    },
    preNextStepButton: {
        height: isPhone? 45 : 55,
        width: isPhone? 100 : 160,
        borderWidth: 3,
        borderRadius: isPhone? 5 : 10,
        padding: isPhone? 10 : 10,
        display: 'flex',
        marginBottom: 15,
        alignItems: 'center',
        borderColor:'rgba(232, 226, 217, 0.3)',
        marginLeft: isPhone? 20 : 'auto',
        backgroundColor: isPhone? 'rgba(0, 0, 0, 0.7)' : 'auto',
        alignSelf: 'center',
        zIndex: 10,
        justifyContent: 'center',
    
    },
    buttonText3: {
        color: 'white',
        fontSize: 16,
    },
    // The inner box that display info text
    infoBox: {
        backgroundColor: 'rgba(34, 31, 32, 1)',
        padding: isPhone? 20 : 100,
        marginTop: isPhone? 20 : 0,
        width: isPhone? 350 : 1000,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
        height: 'auto',
        zIndex: 1001,
        alignSelf: 'center',
        position: 'absolute',
        padding: 20,
        // position: 'absolute',
        borderRadius: 10,
    },
    infoText: {
        color: 'white',
        fontSize: isPhone? 16 : 25,
        marginTop: 15,
        // marginBottom: 10,  
        marginLeft: isPhone? 15 : 30,
    },
    xBox: {
        alignItems: 'center', 
        width: isPhone? 25 : 35, 
        height: isPhone? 25 : 35, 
        margin: 3, 
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ffcc01',
        marginBottom: isPhone? 5 : 10, 
        marginLeft: 900,
    },
    xStyle: {
        alignSelf: 'center', 
        fontSize: isPhone? 20 : 30,
        color: '#ffcc01',
        justifyContent: 'flex-end',

    },
    // The box that contains the 3D object in slingload
    imageBox: {
        padding: 15,
        borderRadius: isPhone? 10 : 20,
        // borderTopLeftRadius: isPhone? 10 : 20,
        // borderBottomLeftRadius: isPhone? 10 : 20,
        height: isPhone? 'auto': 800,
        width: isPhone? 350 : 600,
        // alignContent: 'center',
        zIndex: 5,
    },
    imageSize: {
        flex: isPhone? 1 : 2, 
        resizeMode: 'contain',
        height: isPhone? 350 : 500,
    },

    inspectionBox: {
        flexDirection: 'row', 
        alignItems: 'stretch', 
        marginTop: isPhone? '50%' : 0,
        marginLeft: isPhone? 15 : 0, 
        marginRight: isPhone? 15 : 0, 
        marginBottom: isPhone? 15 : 0,
        padding: 20, 
        height: isPhone? 'auto' : 800,
        gap: 0,
        // backgroundColor: isPhone? 'transparent' : '#d2d2d2', 
        borderRadius: isPhone? 10 : 20, 
        marginLeft: 20,
        flex: isPhone? 1 : 0.4,
        width: isPhone? 350 : 600,
        alignSelf: isPhone? 'center' : 'auto',
    },
    nextButtonSlingload: {
        // justifyContent: 'flex-end',
        marginRight: isPhone? 'auto' : 5,
    },
    slingloadSequenceLayout: {
        flexDirection: isPhone? 'none' : 'row',
        justifyContent: isPhone? 'space-between' : 'none',
        marginLeft: isPhone? 'auto' : 50,
        marginRight: isPhone? 'auto' : 50,
        // backgroundColor: isPhone? 'transparent' : '#1a3b5c90',
        borderRadius: 20,
        marginTop: 20,
    },
    objectSpace: {
        // padding: 3, 
        marginRight: isPhone? 20 : 10, 
        borderRadius: 10,
        flex: isPhone? 1 : 0.6,
    },
    iconInspection: {
        flex: isPhone? 0.25 : 0.1,
        marginTop: isPhone? 45 : 100,
        marginLeft: isPhone? 'auto' : 15,
    },
    ObjectDescription: {
        flex: isPhone? 0.7 : 0.3,
        marginLeft: isPhone? -5 : 40,
        padding: isPhone? 'auto' : 20,
    },
    //the right column of the inspection box
    inspectText: {
        flexWrap: 'wrap', 
        width: isPhone? 250 : 480, 
        marginLeft: isPhone? 5 : 20,
        fontSize: isPhone? 20 : 30,
    },
    descriptionTextBox: {
        // zIndex: 7, 
        // justifyContent: 'space-between', 
        width: isPhone? 350 : 600,
        height: isPhone? 80 : 'auto',
        alignItems: 'center', 
        alignSelf: 'center',
        flexDirection: 'row', 
        padding: isPhone? 'auto' : 20,
        height: isPhone? 50 : 65, 
        borderRadius: 10, 
        borderWidth: 3, 
        borderColor: 'rgba(232, 226, 217, 0.4)', 
        justifyContent: 'center', 
        marginTop: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        
    },
    navigationButton: {
        alignItems: 'center', 
        position: 'absolute',
        marginTop: isPhone? 'auto' : -10, 
        position: 'absolute',
        // transform: [{ translateX: 100 }, { translateY: -10 }],
        // transform: isPhone? [{ translateX: 100 }, { translateY: -10 }] : 'none',
    },
    objectSize: {
        marginTop: isPhone? 'auto' : 100,
    },
// SLINGLOADQUIZ.JS ********************************************************************
slTestR1: {
    flexDirection: 'row',
    marginLeft: isPhone? 30 : 100,
    marginRight: isPhone? 20 : 100,
    alignSelf: 'center',
    marginTop: isPhone? -30 : 'auto',
},
slTestR1C1: {
    flex: isPhone? 1 : 0.5,
    alignItems: 'center',
    justifyContent: 'center',

},
slTestR1B: {
    borderRadius: 10,
    width: isPhone? 200 : 340,
    height: isPhone? 200 : 340,
    borderWidth: 1,
    padding: isPhone? 15: 30,
    shadowColor: 'white',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
},
slTestR1VerticalBar: {
    flex: 0.1, 
    alignItems: 'center', 
    borderLeftWidth: isPhone? 0 : 5, 
    height: 380, 
    marginLeft: isPhone? 0 : 50,
    marginRight: isPhone? 0 : 50,
    marginTop: isPhone? 0 : 60,
    opacity: 0.6,
    verticalAlign: 'bottom',

},
slTestR1C2: {
    flex: isPhone? 1 : 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: isPhone? 35 : 60,
},

// untimed test screen 
untimedTestC1: {
    flex: isPhone? 1 : 0.3,
    backgroundColor: isPhone? 'transparent' : 'rgba(0, 0, 0, 0.7)',
    width: isPhone? 150 : 'auto',
    height: isPhone? 100 : 'auto',
    // transform: [{ translateX: isPhone? 43 :0}, {translateY: isPhone ? 515 : 0}],

},
untimedTestC2: {
    flex: isPhone? 1 : 0.7,
    height: isPhone? 380 : 800,
    borderColor: isPhone? '#000000' : 'none',
    // borderWidth: isPhone? 4 : 0,
    // transform: [{ translateX: isPhone? 0 :0}, {translateY: isPhone ? -30 : 0}],


},
imageTestBox: {
    // transform: [{ translateX: isPhone? 0 :0}, {translateY: isPhone ? 0 : 0}],
    // width: isPhone? 400 : 'auto',
    height: isPhone? 350 : 'auto',
    width: isPhone? 350 : 'auto',
    alignSelf: 'center',
    overflow: 'hidden',
    alignItems: 'center',
    borderWidth: isPhone? 3 : 0,
    borderColor: isPhone? 'rgba(0, 0, 0, 0.4)' : 'none',
    backgroundColor: isPhone? '#ffffff' : 'transparent',
    borderRadius: isPhone? 10 : 0,

},
timer: {
    fontSize: isPhone? 30 : 55,
    color: isPhone? 'red' : '#E8E2D9',
    fontWeight: 600,
    marginTop: isPhone? 10 : 50,
    // position: 'absolute',
    alignSelf: 'center',
    marginBottom: isPhone? 10 : 100,
    // transform: [{ translateX: isPhone? 230 :'auto'}, {translateY: isPhone ? -340 : 'auto'}],
},
deficiencyButton: {
    backgroundColor: 'red',
    height: 'auto',
    width: isPhone? 100 : 220,
    borderWidth: 1,
    borderRadius: isPhone? 5 : 10,
    padding: isPhone? 10 : 15,
    justifyContent: 'center',
    marginBottom: isPhone? 10 :20,

    // display: 'flex',
    // marginBottom: isPhone? 10 : 30,
    // alignItems: 'center',
    // alignSelf: 'center',
    // justifyContent: 'center',
    // marginLeft: isPhone? 20 : 'auto',
    // transform: [{ translateX: isPhone? 0 :'auto'}, {translateY: isPhone ? 0 : 'auto'}],


},
nextUntimedTestButton: {
    backgroundColor: 'green',
    height: isPhone? 50 : 'auto',
    width: isPhone? 100 : 220,
    borderWidth: 1,
    borderRadius: isPhone? 5 : 10,
    padding: isPhone? 10 : 15,
    justifyContent: 'center',
    marginBottom: 20,
    marginBottom: isPhone? 10 :20,

},
endTestButton: {
    height: isPhone? 50 : 'auto',
    width: isPhone? 100 : 180,
    borderWidth: 2,
    borderRadius: isPhone? 5 : 10,
    marginBottom: isPhone? 10 : 30,
    alignItems: 'center',
    borderColor:'rgba(232, 226, 217, 0.3)',
    backgroundColor: isPhone? 'rgba(0, 0, 0, 0.7)' : 'auto',
    alignSelf: 'center',
    padding: isPhone? 'auto' : 12,
    // shadowColor: 'white',
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
},
// END SLINGLOADQUIZ.JS **************************************************************
hamburgerBox: {
    width: isPhone? 'auto' : 80,
    height: isPhone? 'auto' : 80,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'rgba(232, 226, 217, 0.4)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
    // marginTop: isPhone? 5 : 20,
    // marginLeft: '85%',

},

menuSection: {
    // height: isPhone? 'auto': 100, 
    height: isPhone? 40 : 75,
    // padding: isPhone? 1 : 10, 
    // width: isPhone? 150 : 400, 
    justifyContent: 'center', 
    // marginBottom: isPhone? 5 : -25,
    top: 0,
    borderTopLeftRadius: isPhone? 15 : 0,
    borderTopRightRadius: isPhone? 15 : 0,

    
},
menuItemBox: { 
    width: isPhone? 200 : 380, 
    height: isPhone? 40 : 55, 
    borderRadius: 10, 
    borderWidth: isPhone? 1 : 3, 
    borderColor: 'rgba(232, 226, 217, 0.4)', 
    justifyContent: 'center', 
    // marginBottom: -5,
    alignSelf: 'center',
    // display: isPhone? 'none' : 'auto',
},
menuItemText: {

},
sectionMenuTitle: {
    zIndex: 3, 
    color: '#E8E2D9', 
    fontSize: isPhone? 18 : 25, 
    alignSelf: 'center',

},
imageTitleDisplay: {
    marginRight: isPhone? 0 :'auto', 
    zIndex: 7, 
    // transform: [{ translateX: isPhone? 0 :'90wh'}, 
    //     {translateY: isPhone ? -465 : '-35vh' }], 
    // justifyContent: 'space-between', 
    width: isPhone? 350 : 600,
    height: isPhone? 80 : 80,
    alignItems: 'center', 
    alignSelf: 'center',
    flexDirection: 'row', 
    height: isPhone? 50 : 65, 
    borderRadius: 10, 
    borderWidth: 3, 
    borderColor: 'rgba(232, 226, 217, 0.4)', 
    justifyContent: 'center', 
    // margin: 10, 
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
},
resultBox: {
    alignContent: 'center',
    borderRadius: 8,
    margin: isPhone? 7 : 10,
    flexDirection: isPhone? 'column' : 'row',
    // height: isPhone? 'auto' : 100,
    height: 'auto',
    alignSelf: 'center',
    padding: 10,
    width: isPhone? 330 : 800,

},
endQuizR1: {
    width: isPhone? 310 : 800,
},
endQuizR2: {
    width: isPhone? 330 : 800,
    alignItems: 'center',
    alignContent: 'center',
    gap: 0,
    alignSelf: 'center',
    flex: 1,
    marginTop: isPhone? 20 : 30,
},

});