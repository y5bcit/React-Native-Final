import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Consts from '../Consts';

export default class ApiComponent extends React.Component<{}, { data: any[] }> {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        fetch(Consts.apiPath).then(response => response.json())
            .then(data => this.setState({ data }))
            .catch(error => console.error(error));
    }

    render() {
        return (
            <FlatList keyExtractor={(i, k) => k.toString()} extraData={this.state} data={this.state.data}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={{ fontSize: 24 }}>{item.n}</Text>
                        <Text style={{ fontSize: 16 }}>{item.s}</Text>
                    </View>
                )}
            />
        )
    }
}

const styles = StyleSheet.create({
    item: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        padding: 3,
        margin: 10,
        marginHorizontal: 60
    },
    placeholder: {
        margin: 6,
        fontSize: 18,
        textAlign: 'center'
    }
});