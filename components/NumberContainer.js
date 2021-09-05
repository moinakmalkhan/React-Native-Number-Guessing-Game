import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../constants/colors'

const NumberContainer = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    )
}

export default NumberContainer

const styles = StyleSheet.create({
    container:{
        padding:10,
        alignItems: 'center',
        justifyContent:"center",
        padding:10,
        borderColor:colors.secondary,
        borderWidth: 2,
        borderRadius: 10,
        marginVertical: 10,
    },
    number:{
        color:colors.secondary,
        fontSize:22,
    },
})
