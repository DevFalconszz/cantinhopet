import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../services/firebase';

const requisitosSenha = [
  { label: 'Mínimo 8 caracteres', test: (s) => s.length >= 8 },
  { label: 'Uma letra maiúscula', test: (s) => /[A-Z]/.test(s) },
  { label: 'Uma letra minúscula', test: (s) => /[a-z]/.test(s) },
  { label: 'Um número', test: (s) => /\d/.test(s) },
  { label: 'Um caractere especial (!@#$%^&*)', test: (s) => /[!@#$%^&*]/.test(s) },
];

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const toggleModo = () => {
    setIsLogin(!isLogin);
    setSenha('');
    setConfirmar('');
  };

  const handleSubmit = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Aviso', 'Preencha email e senha.');
      return;
    }

    if (!isLogin) {
      if (senha !== confirmar) {
        Alert.alert('Aviso', 'As senhas não conferem.');
        return;
      }
      const faltando = requisitosSenha.filter((r) => !r.test(senha));
      if (faltando.length > 0) {
        Alert.alert(
          'Senha fraca',
          `Atenda todos os requisitos:\n${faltando.map((r) => `• ${r.label}`).join('\n')}`
        );
        return;
      }
    }

    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email.trim(), senha);
      } else {
        await createUserWithEmailAndPassword(auth, email.trim(), senha);
      }
    } catch (e) {
      let msg = e.message || 'Erro ao autenticar. Tente novamente.';
      if (e.code === 'auth/invalid-credential') msg = 'Email ou senha inválidos.';
      else if (e.code === 'auth/email-already-in-use') msg = 'Este email já está cadastrado.';
      else if (e.code === 'auth/weak-password') msg = 'Senha deve ter no mínimo 6 caracteres.';
      else if (e.code === 'auth/user-not-found') msg = 'Usuário não encontrado.';
      else if (e.code === 'auth/wrong-password') msg = 'Senha incorreta.';
      else if (e.code === 'auth/invalid-email') msg = 'Email inválido.';
      else if (e.code === 'auth/operation-not-allowed') msg = 'Login por email/senha não está ativado no Firebase Console.';
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={estilos.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={estilos.scroll} keyboardShouldPersistTaps="handled">
        <View style={estilos.logoContainer}>
          <View style={estilos.logoBg}>
            <Ionicons name="paw" size={64} color="#6C63FF" />
          </View>
          <Text style={estilos.titulo}>CantinhoPet</Text>
          <Text style={estilos.subtitulo}>
            O cadastro do seu pet com fotos, mapa e muito mais!
          </Text>
        </View>

        <View style={estilos.form}>
          <TextInput
            style={estilos.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={estilos.input}
            placeholder="Senha"
            placeholderTextColor="#aaa"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          {!isLogin && (
            <>
              <TextInput
                style={estilos.input}
                placeholder="Confirmar senha"
                placeholderTextColor="#aaa"
                value={confirmar}
                onChangeText={setConfirmar}
                secureTextEntry
              />

              {senha.length > 0 && (
                <View style={estilos.checklist}>
                  {requisitosSenha.map((r, i) => {
                    const ok = r.test(senha);
                    return (
                      <View key={i} style={estilos.item}>
                        <Ionicons
                          name={ok ? 'checkmark-circle' : 'close-circle'}
                          size={18}
                          color={ok ? '#4CAF50' : '#F44336'}
                        />
                        <Text style={[estilos.textoItem, ok && estilos.textoOk]}>
                          {r.label}
                        </Text>
                      </View>
                    );
                  })}
                  {confirmar.length > 0 && (
                    <View style={estilos.item}>
                      <Ionicons
                        name={senha === confirmar ? 'checkmark-circle' : 'close-circle'}
                        size={18}
                        color={senha === confirmar ? '#4CAF50' : '#F44336'}
                      />
                      <Text style={[estilos.textoItem, senha === confirmar && estilos.textoOk]}>
                        Senhas conferem
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </>
          )}

          <TouchableOpacity
            style={estilos.btn}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={estilos.textoBtn}>
                {isLogin ? 'Entrar' : 'Criar Conta'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleModo}>
            <Text style={estilos.link}>
              {isLogin
                ? 'Não tem conta? Cadastre-se'
                : 'Já tem conta? Faça login'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#FEF3E6',
  },
  scroll: {
    flexGrow: 1, justifyContent: 'center', padding: 32,
  },
  logoContainer: { alignItems: 'center', marginBottom: 32 },
  logoBg: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: '#EEEAFF', justifyContent: 'center',
    alignItems: 'center', marginBottom: 16,
  },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#6C63FF' },
  subtitulo: {
    fontSize: 14, color: '#888', textAlign: 'center',
    marginTop: 6, maxWidth: 240,
  },
  form: { gap: 12 },
  input: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14, fontSize: 16,
    color: '#333',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 4, elevation: 2,
  },
  checklist: {
    backgroundColor: '#fff', borderRadius: 12, padding: 12,
    gap: 4,
  },
  item: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
  },
  textoItem: {
    fontSize: 13, color: '#F44336',
  },
  textoOk: {
    color: '#4CAF50',
  },
  btn: {
    backgroundColor: '#6C63FF', borderRadius: 12, padding: 14,
    alignItems: 'center', marginTop: 4,
  },
  textoBtn: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: {
    color: '#6C63FF', textAlign: 'center', marginTop: 8, fontSize: 14,
  },
});
