// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import Input from '../components/input';
import Button from '../components/boton';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Registro exitoso', 'Te has registrado correctamente', [
                { text: 'OK', onPress: () => navigation.navigate('Login') },
            ]);
        } catch (error) {
            let errorMessage = 'Ocurrió un error al registrarse.';
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Ya está en uso el correo.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'El correo no es válido.';
            }
            console.error('Error al registrarse:', errorMessage);
            Alert.alert('Error', errorMessage);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
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
            <Input
                label="Confirmar contraseña:"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirma tu contraseña"
                secureTextEntry
            />
            <Button title="Registrar" onPress={handleRegister} />
            <Button title="¿Ya tienes cuenta? Inicia sesión" onPress={() => navigation.navigate('Login')} />
        </View>
    );
};

export default RegisterScreen;

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
