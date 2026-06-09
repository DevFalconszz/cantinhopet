import { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  ActivityIndicator, Alert, Image, RefreshControl,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { petService } from '../services/api';

export default function HomeScreen({ navigation }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const isFocused = useIsFocused();
  const loaded = useRef(false);

  const carregar = useCallback(async () => {
    try {
      setErro(null);
      setLoading(true);
      const res = await petService.findAll();
      setPets(res.data);
      loaded.current = true;
    } catch {
      setErro('Conecte o backend em localhost:8080 e clique em "Tentar novamente"');
      setPets([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, []);

  useEffect(() => {
    if (isFocused && loaded.current) {
      carregar();
    }
  }, [isFocused]);

  const excluir = (id, nome) => {
    Alert.alert('Remover', `Remover ${nome}?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          try {
            await petService.delete(id);
            carregar();
          } catch {
            Alert.alert('Erro', 'Não foi possível remover.');
          }
        },
      },
    ]);
  };

  const iconeEspecie = (s) => {
    const especie = (s || '').toLowerCase();
    if (especie.includes('cachorro') || especie.includes('dog')) return 'paw';
    if (especie.includes('gato') || especie.includes('cat')) return 'logo-octocat';
    return 'bug';
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={estilos.card}
      onPress={() => navigation.navigate('PetDetail', { petId: item.id })}
      onLongPress={() => excluir(item.id, item.name)}
    >
      <View style={estilos.cardHeader}>
        {item.photoUrl ? (
          <Image source={{ uri: item.photoUrl }} style={estilos.foto} />
        ) : (
          <View style={estilos.fotoPlaceholder}>
            <Ionicons name={iconeEspecie(item.species)} size={32} color="#6C63FF" />
          </View>
        )}
        <View style={estilos.info}>
          <Text style={estilos.nome}>{item.name}</Text>
          <Text style={estilos.raca}>
            {item.species}{item.breed ? ` - ${item.breed}` : ''}
          </Text>
          <View style={estilos.badges}>
            {item.weight ? (
              <View style={estilos.badge}>
                <Text style={estilos.badgeTexto}>{item.weight} kg</Text>
              </View>
            ) : null}
            <View style={[estilos.badge, item.isVaccinated ? estilos.vacinaSim : estilos.vacinaNao]}>
              <Text style={estilos.badgeTexto}>
                {item.isVaccinated ? 'Vacinado' : 'Não vacinado'}
              </Text>
            </View>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#ccc" />
      </View>
    </TouchableOpacity>
  );

  if (loading && !loaded.current) {
    return (
      <View style={estilos.center}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={{ marginTop: 12, color: '#999' }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      {erro ? (
        <View style={estilos.bannerErro}>
          <Ionicons name="cloud-offline-outline" size={18} color="#fff" />
          <Text style={estilos.textoErro}>{erro}</Text>
          <TouchableOpacity onPress={carregar} style={estilos.btnTentar}>
            <Text style={estilos.textoBtn}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <FlatList
        data={pets}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={pets.length === 0 ? estilos.vazio : estilos.lista}
        ListEmptyComponent={
          !loading ? (
            <View style={estilos.estadoVazio}>
              <Ionicons name="paw-outline" size={64} color="#ccc" />
              <Text style={estilos.tituloVazio}>Nenhum pet cadastrado</Text>
              <Text style={estilos.subVazio}>Adicione seu primeiro pet!</Text>
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={carregar} colors={['#6C63FF']} />
        }
      />

      <TouchableOpacity
        style={estilos.fab}
        onPress={() => navigation.navigate('PetForm', {})}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  lista: { padding: 16, paddingBottom: 80 },
  vazio: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  estadoVazio: { alignItems: 'center' },
  tituloVazio: { fontSize: 18, fontWeight: 'bold', color: '#999', marginTop: 12 },
  subVazio: { fontSize: 14, color: '#bbb', marginTop: 4 },
  bannerErro: {
    backgroundColor: '#F44336', padding: 12, margin: 16, borderRadius: 12,
    alignItems: 'center',
  },
  textoErro: { color: '#fff', fontSize: 13, marginTop: 6, textAlign: 'center' },
  btnTentar: {
    backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8,
    paddingHorizontal: 16, paddingVertical: 8, marginTop: 10,
  },
  textoBtn: { color: '#fff', fontSize: 13, fontWeight: '600' },
  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16,
    marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  foto: { width: 56, height: 56, borderRadius: 28, marginRight: 12 },
  fotoPlaceholder: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#EEEAFF', justifyContent: 'center',
    alignItems: 'center', marginRight: 12,
  },
  info: { flex: 1 },
  nome: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  raca: { fontSize: 13, color: '#888', marginTop: 2 },
  badges: { flexDirection: 'row', marginTop: 6, gap: 6 },
  badge: {
    backgroundColor: '#f0f0f0', borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 2,
  },
  vacinaSim: { backgroundColor: '#E8F5E9' },
  vacinaNao: { backgroundColor: '#FFEBEE' },
  badgeTexto: { fontSize: 12, color: '#555' },
  fab: {
    position: 'absolute', bottom: 24, right: 24,
    backgroundColor: '#6C63FF', width: 56, height: 56,
    borderRadius: 28, justifyContent: 'center',
    alignItems: 'center', elevation: 6,
    shadowColor: '#6C63FF', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 6,
  },
});
