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
            // value: [],
            fontLoaded: false
        };

        this.editor = null;
    }

    async getKey() {
      try {
        const data = await AsyncStorage.getItem('@MySuperStore:key');
        if(data) {
          this.setState({
              value: JSON.parse(data)
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
                                                Тт
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
                                      💡
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
                                      💡
                                      </Text>
                                  }]
                              }
                              // {
                              //     type: 'tool',
                              //     iconArray: [{
                              //         toolTypeText: 'highlight',
                              //         buttonTypes: 'style',
                              //         iconComponent: this.renderHighlight()
                              //             // <Text style={styles.toolbarButton}>
                              //             // 💡
                              //             // </Text>
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
