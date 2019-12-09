import React, { Component } from 'react';
import { View, StyleSheet, Keyboard
, TouchableWithoutFeedback, Text
, KeyboardAvoidingView,
AsyncStorage, Button, AppState } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import  CNRichTextEditor , { CNToolbar, getInitialObject , getDefaultStyles } from "react-native-cn-richtext-editor";

const defaultStyles = getDefaultStyles();

class App extends Component {

    async componentDidMount() {

        AppState.addEventListener('change', state => {
            console.log('AppState changed to', state)
            this.saveKey()
          }
        );

        await Font.loadAsync({
          'RobotoMono': require('./assets/fonts/RobotoMono-Regular.ttf'),
        });
        this.setState({ fontLoaded: true });
        this.getKey();
      }

    constructor(props) {
        super(props);

        this.state = {
            selectedTag : 'body',
            selectedStyles : [],
            value: [getInitialObject()],
            // value: ,
            fontLoaded: false
        };

        this.editor = null;
    }

    async getKey() {
      try {

        let mock = JSON.stringify([{"id":"l33jcKmM","component":"text","content":[{"id":"pseqQE74","text":"Thank you for downloading Papier!","len":16,"tag":"body","stype":[],"styleList":{"fontSize":20},"NewLine":false,"readOnly":false},{"id":"iMEV8WzQa","text":"\nNow you can:","len":19,"tag":"body","stype":["bold"],"styleList":{"fontWeight":"bold","fontSize":20},"NewLine":true,"readOnly":false},{"id":"IMjM2pH8","text":"\n","len":1,"tag":"body","stype":[],"styleList":{},"NewLine":true,"readOnly":false},{"id":"PgGGT4O_","text":"\n• ","len":3,"tag":"ul","stype":[],"styleList":{},"NewLine":true,"readOnly":true},{"id":"nqHKmf9gJ","text":"highlight your ideas","len":5,"tag":"ul","stype":[],"styleList":{},"NewLine":false,"readOnly":false},{"id":"63KeG6uJW","text":"\n• ","len":3,"tag":"ul","stype":[],"styleList":{},"NewLine":true,"readOnly":true},{"id":"zt5GT_QGs","text":"sketch  your feelings","len":6,"tag":"ul","stype":["italic"],"styleList":{},"NewLine":false,"readOnly":false},{"id":"10Fe04XA","text":"\n• ","len":3,"tag":"ul","stype":["italic"],"styleList":[],"NewLine":true,"readOnly":true},{"id":"pAnz9Du7","text":"fly like a superman","len":7,"tag":"ul","NewLine":false,"stype":["lineThrough"],"styleList":{"textDecorationLine":"line-through","fontSize":20}},{"id":"0sISE85N","len":16,"stype":[],"styleList":{"fontSize":20},"tag":"body","text":"\n\nYour thoughts are backed up directly to phone: no accounts, no syncing.","NewLine":true,"readOnly":false},{"id":"0sISE8jK","len":16,"stype":[],"styleList":{"fontSize":20},"tag":"body","text":"\n------","NewLine":true,"readOnly":false},{"id":"0sISE8jN","len":16,"stype":[],"styleList":{"fontSize":20},"tag":"body","text":"\nMade by 🍀 and phsktrck.ru","NewLine":true,"readOnly":false},{"id":"0sISE8jL","len":16,"stype":[],"styleList":{"fontSize":20},"tag":"body","text":"\nInspired by muxumuxu.com","NewLine":true,"readOnly":false},{"id":"0sISE6jN","len":16,"stype":[],"styleList":{"fontSize":20},"tag":"body","text":"\n\nLet's take a note 😉","NewLine":true,"readOnly":false}]}]);

        const data = await AsyncStorage.getItem('@MySuperStore:key');
        // console.log(data);
        if(data) {
          this.setState({
              value: JSON.parse(data)
          });
        }
        else {
          this.setState({
              value: JSON.parse(mock)
          });
        }
      } catch (error) {
        console.log("Error retrieving data" + error);
      }
    }

    async saveKey() {
      try {
        await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(this.state.value));
      } catch (error) {
        console.log("Error saving data" + error);
      }
    }

    onStyleKeyPress = (toolType) => {
        this.editor.applyToolbar(toolType);
    }

    onSelectedTagChanged = (tag) => {
        this.setState({
            selectedTag: tag
        })
    }

    onSelectedStyleChanged = (styles) => {
        this.setState({
            selectedStyles: styles,
        })
    }

    onValueChanged = (value) => {
        this.setState({
            value: value
        });
    }

    // renderHighlight() {
    //   let selectedColor = '#737373';
    //   return (
    //     <Menu renderer={SlideInMenu} onSelect={this.onHighlightSelectorClicked}>
    //     <MenuTrigger>
    //         <MaterialCommunityIcons name="marker" color={selectedColor}
    //                 size={24} style={{
    //                 }} />
    //     </MenuTrigger>
    //     <MenuOptions customStyles={highlightOptionsStyles}>
    //         {this.renderHighlightMenuOptions()}
    //     </MenuOptions>
    //     </Menu>
    //   );
    // }

    render() {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                enabled
                keyboardVerticalOffset={0}
                style={{
                    flex: 1,
                    paddingTop: 20,
                    backgroundColor:'#f6f6f6',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}
                >
                    {
                        this.state.fontLoaded ? (
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <View style={styles.main}>
                                    <CNRichTextEditor
                                        ref={input => this.editor = input}
                                        onSelectedTagChanged={this.onSelectedTagChanged}
                                        onSelectedStyleChanged={this.onSelectedStyleChanged}
                                        value={this.state.value}
                                        style={{backgroundColor: '#f6f6f6', fontFamily: 'RobotoMono'}}
                                        styleList={defaultStyles}
                                        onValueChanged={this.onValueChanged}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        ) : null
                    }

                    <View style={{
                        minHeight: 35
                    }}>

                        <CNToolbar
                            style={{
                                height: 35,
                            }}
                            iconSetContainerStyle={{
                                flexGrow: 1,
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                            }}
                            size={30}
                            iconSet={[
                                {
                                    type: 'tool',
                                    iconArray: [
                                        {
                                            toolTypeText: 'body',
                                            buttonTypes: 'tag',
                                            iconComponent:
                                                <Text style={styles.toolbarButton}>
                                                ✍🏻
                                                </Text>
                                        },
                                    ]
                                },
                                {
                                    type: 'tool',
                                    iconArray: [
                                        {
                                            toolTypeText: 'ul',
                                            buttonTypes: 'tag',
                                            iconComponent:
                                                <Text style={styles.toolbarButton}>
                                                ≡
                                                </Text>
                                        }
                                    ]
                                },
                                {
                                    type: 'separator'
                                },
                                {
                                  type: 'tool',
                                  iconArray: [{
                                      toolTypeText: 'bold',
                                      buttonTypes: 'style',
                                      iconComponent:
                                      <Text style={styles.toolbarButton}>
                                      b
                                      </Text>
                                  }]
                                },
                                {
                                  type: 'tool',
                                  iconArray: [{
                                      toolTypeText: 'italic',
                                      buttonTypes: 'style',
                                      iconComponent:
                                      <Text style={styles.toolbarButton}>
                                      i
                                      </Text>
                                  }]
                                },
                                {
                                  type: 'tool',
                                  iconArray: [{
                                      toolTypeText: 'lineThrough',
                                      buttonTypes: 'style',
                                      iconComponent:
                                      <Text style={styles.toolbarButton}>
                                      ~
                                      </Text>
                                  }]
                                },
                              //   {
                              //     type: 'tool',
                              //     iconArray: [{
                              //         toolTypeText: 'highlight',
                              //         buttonTypes: 'style',
                              //         iconComponent:
                              //         <Text style={styles.toolbarButton}>
                              //         💡
                              //         </Text>
                              //     }]
                              // }
                            ]}
                            selectedTag={this.state.selectedTag}
                            selectedStyles={this.state.selectedStyles}
                            onStyleKeyPress={this.onStyleKeyPress}
                        />
                    </View>

            </KeyboardAvoidingView>

        );
    }

}

var styles = StyleSheet.create({
    main: {
        flex: 1,
        marginTop: 20,
        alignItems: 'stretch',
    },
    toolbarButton: {
        fontSize: 20,
        width: 28,
        height: 28,
        textAlign: 'center'
    }
});


export default App;
