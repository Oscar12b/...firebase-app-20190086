// src/components/Input.js
import React from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    input: {
        height: 50,
        borderColor: '#0288d1',
        borderWidth: 1,
        borderRadius: 25,
        paddingLeft: 15,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 18,
        color: '#333',
        marginBottom: 5,
    },
});

export default Input;
