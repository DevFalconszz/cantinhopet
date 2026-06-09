import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ActivityIndicator, Alert,
  Image, ScrollView, TouchableOpacity, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { petService } from '../services/api';

export default function PetDetailScreen({ route, navigation }) {
  const { petId } = route.params;
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPet();
  }, [petId]);

  const loadPet = async () => {
    try {
      const response = await petService.findById(petId);
      setPet(response.data);
      navigation.setOptions({ title: response.data.name });
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os dados do pet.');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Remover Pet',
      `Tem certeza que deseja remover ${pet.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              await petService.delete(petId);
              navigation.navigate('Home');
            } catch {
              Alert.alert('Erro', 'Não foi possível remover o pet.');
            }
          },
        },
      ]
    );
  };

  const getSpeciesIcon = (species) => {
    const s = species?.toLowerCase() || '';
    if (s.includes('cachorro') || s.includes('dog')) return 'paw';
    if (s.includes('gato') || s.includes('cat')) return 'logo-octocat';
    return 'bug';
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  if (!pet) {
    return (
      <View style={styles.center}>
        <Text>Pet não encontrado.</Text>
      </View>
    );
  }

  const infoRows = [
    { icon: 'paw-outline', label: 'Espécie', value: pet.species },
    { icon: 'git-branch-outline', label: 'Raça', value: pet.breed || '-' },
    { icon: 'scale-outline', label: 'Peso', value: pet.weight ? `${pet.weight} kg` : '-' },
    { icon: 'calendar-outline', label: 'Nascimento', value: pet.birthDate || '-' },
    { icon: 'color-palette-outline', label: 'Cor', value: pet.color || '-' },
    {
      icon: 'medkit-outline',
      label: 'Vacinação',
      value: pet.isVaccinated ? 'Vacinado' : 'Não vacinado',
      valueColor: pet.isVaccinated ? '#4CAF50' : '#F44336',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        {pet.photoUrl ? (
          <Image source={{ uri: pet.photoUrl }} style={styles.profilePhoto} />
        ) : (
          <View style={styles.profilePhotoPlaceholder}>
            <Ionicons name={getSpeciesIcon(pet.species)} size={48} color="#6C63FF" />
          </View>
        )}
        <Text style={styles.petName}>{pet.name}</Text>
        <Text style={styles.petSubtitle}>{pet.breed || pet.species}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Informações</Text>
        {infoRows.map((row, index) => (
          <View key={index} style={styles.infoRow}>
            <Ionicons name={row.icon} size={20} color="#6C63FF" />
            <Text style={styles.infoLabel}>{row.label}</Text>
            <Text style={[styles.infoValue, row.valueColor && { color: row.valueColor }]}>
              {row.value}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.actionsSection}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('PetForm', { petId: pet.id })}
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.mapButton]}
          onPress={() => navigation.navigate('Map', { species: pet.species })}
        >
          <Ionicons name="map-outline" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Veterinários</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Remover</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  profileSection: {
    alignItems: 'center', paddingVertical: 32,
    backgroundColor: '#fff', borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
  },
  profilePhoto: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
  profilePhotoPlaceholder: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: '#EEEAFF', justifyContent: 'center',
    alignItems: 'center', marginBottom: 12,
  },
  petName: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  petSubtitle: { fontSize: 14, color: '#888', marginTop: 4 },
  infoSection: {
    backgroundColor: '#fff', borderRadius: 16, margin: 16,
    padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 2, elevation: 2,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 16 },
  infoRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    flex: 1, fontSize: 14, color: '#888',
    marginLeft: 12,
  },
  infoValue: { fontSize: 14, fontWeight: '600', color: '#333' },
  actionsSection: {
    flexDirection: 'row', justifyContent: 'space-around',
    marginHorizontal: 16, marginBottom: 32, gap: 8,
  },
  actionButton: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', backgroundColor: '#6C63FF',
    borderRadius: 12, padding: 12, gap: 6,
  },
  mapButton: { backgroundColor: '#4CAF50' },
  deleteButton: { backgroundColor: '#F44336' },
  actionButtonText: { color: '#fff', fontSize: 13, fontWeight: '600' },
});
