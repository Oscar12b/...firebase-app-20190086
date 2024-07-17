// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import Input from '../components/input';
import Button from '../components/boton';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert('Inicio de sesión exitoso', 'Has iniciado sesión correctamente', [
                { text: 'OK', onPress: () => navigation.navigate('Home') },
            ]);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            let errorMessage = 'Ocurrió un error al iniciar sesión.';
            if (error.code === 'auth/invalid-credential') {
                errorMessage = 'Las credenciales no son válidas. Verifica tu correo y contraseña.';
            } else if (error.code === 'auth/user-not-found') {
                errorMessage = 'No se encontró una cuenta con este correo.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'La contraseña es incorrecta.';
            }
            Alert.alert('Error', errorMessage);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <Input
                label="Correo electrónico:"
                value={email}
                onChangeText={setEmail}
                placeholder="Ingresa tu correo electrónico"
                keyboardType="email-address"
            />
            <Input
                label="Contraseña:"
                value={password}
                onChangeText={setPassword}
                placeholder="Ingresa tu contraseña"
                secureTextEntry
            />
            <Button title="Iniciar Sesión" onPress={handleLogin} />
            <Button title="¿No tienes cuenta? Regístrate" onPress={() => navigation.navigate('Register')} />
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#0288d1',
        marginBottom: 20,
    },
});
