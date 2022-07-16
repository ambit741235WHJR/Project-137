import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert
} from "react-native";
import { Card, Icon } from "react-native-elements";
import axios from "axios";

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {},
            imagePath: "",
            url: `https://3aac-49-37-43-210.in.ngrok.io/stars?name=${this.props.navigation.getParam("stars_name")}`
        };
    }

    componentDidMount() {
        this.getDetails();
    }

    getDetails = () => {
        const { url } = this.state;
        axios.get(url)
            .then(response => {
                this.setDetails(response.data.data);
            })
            .catch(error => {
                Alert.alert("Error", error.message);
            });
    }

    setDetails = planetDetails => {
        const planetType = planetDetails.planet_type;
        let imagePath = "";
        switch (planetType) {
            case "Gas Giant":
                imagePath = require("../assets/planet_type/gas_giant.png");
                break;
            case "Terrestrial":
                imagePath = require("../assets/planet_type/terrestrial.png");
                break;
            case "Neptune Like":
                imagePath = require("../assets/planet_type/neptune_like.png");
                break;
            case "Super Earth":
                imagePath = require("../assets/planet_type/super_earth.png");
                break;
            default:
                imagePath = require("../assets/planet_type/gas_giant.png");
        }
        this.setState({
            details: planetDetails,
            imagePath
        });
    }
    render() {
        const { details, imagePath } = this.state;
        if (details.name){
            return (
                <View style={styles.container}>
                    <Card title={details.name} image={imagePath} imageProps={{ resizeMode: "contain", width: "100%" }}>
                            <View>
                                <Text style={styles.cardItem}>{`Name: ${details.name}`}</Text>
                                <Text style={styles.cardItem}>{`Mass: ${details.mass}`}</Text>
                                <Text style={styles.cardItem}>{`Radius: ${details.radius}`}</Text>
                                <Text style={styles.cardItem}>{`Gravity: ${details.gravity}`}</Text>
                            </View>
                    </Card>
                </View>
            );
        }
        return null
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardItem: {
        marginBottom: 10
    }
});