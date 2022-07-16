import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Alert
} from 'react-native';
import axios from 'axios';
import { ListItem } from 'react-native-elements';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            url: 'https://3aac-49-37-43-210.in.ngrok.io'
        };
    }

    componentDidMount() {
        this.getPlanets();
    }

    getPlanets = () => {
        const { url } = this.state;
        axios.get(url)
            .then(response => {
                return this.setState({ listData: response.data.data });
            })
            .catch(error => {
                Alert.alert('Error', error.message);
            });
    }

    renderItem = ({ item, index }) => (        
        /*<ListItem
            key={index}
            title={`Planet: ${item.name}`}
            subtitle={`Distance from Earth: ${item.distance_from_earth}`}
            titleStyle={styles.title}
            containerStyle={styles.listContainer}
            bottomDivider
            chevron
            onPress={() => {
                    this.props.navigation.navigate('Details', { stars_name: item.name });
                }
            }
        />*/
        <ListItem bottomDivider onPress={() => {
            this.props.navigation.navigate('Details', { stars_name: item.name });
        }} containerStyle={styles.listContainer}>
            <ListItem.Content>
                <ListItem.Title style={styles.title}>{`Planet: ${item.name}`}</ListItem.Title>
                <ListItem.Subtitle>{`Gravity: ${item.gravity}`}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron/>
        </ListItem>
    );

    keyExtractor = (item, index) => index.toString();
    render() {
        const { listData } = this.state;
        if (listData.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <Text>Loading...</Text>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <SafeAreaView/>
                <View style={styles.upperContainer}>
                    <Text style={styles.headerText}>Stars World</Text>
                </View>
                <View style={styles.lowerContainer}>
                    <FlatList
                        data={this.state.listData}
                        renderItem={this.renderItem}
                        keyExtractor={this.keyExtractor}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#edc988'
    },
    upperContainer: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#132743'
    },
    lowerContainer: {
        flex: 0.9
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#d7385e'
    },
    listContainer: {
        backgroundColor: '#eeecda'
    }
});