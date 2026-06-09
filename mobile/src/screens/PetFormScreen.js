import { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Alert, ActivityIndicator, Switch, Image, Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { petService } from '../services/api';

const SPECIES = ['Cachorro', 'Gato', 'Ave', 'Peixe', 'Roedor', 'Réptil', 'Outro'];

export default function PetFormScreen({ route, navigation }) {
  const { petId } = route.params || {};
  const isEditing = !!petId;

  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [color, setColor] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [showSpeciesPicker, setShowSpeciesPicker] = useState(false);

  useEffect(() => {
    if (isEditing) {
      loadPet();
      navigation.setOptions({ title: 'Editar Pet' });
    }
  }, [petId]);

  const loadPet = async () => {
    try {
      const response = await petService.findById(petId);
      const pet = response.data;
      setName(pet.name);
      setSpecies(pet.species);
      setBreed(pet.breed || '');
      setWeight(pet.weight ? String(pet.weight) : '');
      setBirthDate(pet.birthDate || '');
      setIsVaccinated(pet.isVaccinated);
      setColor(pet.color || '');
      setPhotoUrl(pet.photoUrl || '');
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os dados do pet.');
      navigation.goBack();
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setPhotoUrl(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à câmera para tirar fotos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setPhotoUrl(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Atenção', 'O nome do pet é obrigatório.');
      return;
    }
    if (!species) {
      Alert.alert('Atenção', 'Selecione a espécie do pet.');
      return;
    }

    const petData = {
      name: name.trim(),
      species,
      breed: breed.trim() || null,
      weight: weight ? parseFloat(weight) : null,
      birthDate: birthDate || null,
      isVaccinated,
      color: color.trim() || null,
      photoUrl: photoUrl || null,
    };

    setSaving(true);
    try {
      if (isEditing) {
        await petService.update(petId, petData);
      } else {
        await petService.create(petData);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o pet.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.photoSection}>
        <TouchableOpacity onPress={takePhoto} style={styles.photoContainer}>
          {photoUrl ? (
            <Image source={{ uri: photoUrl }} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Ionicons name="camera" size={32} color="#ccc" />
              <Text style={styles.photoHint}>Foto</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
          <Ionicons name="images-outline" size={20} color="#6C63FF" />
          <Text style={styles.galleryButtonText}>Galeria</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nome do pet"
        />

        <Text style={styles.label}>Espécie *</Text>
        <View style={styles.speciesRow}>
          {SPECIES.map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.speciesChip, species === s && styles.speciesChipActive]}
              onPress={() => setSpecies(s)}
            >
              <Text style={[styles.speciesChipText, species === s && styles.speciesChipTextActive]}>
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Raça</Text>
        <TextInput
          style={styles.input}
          value={breed}
          onChangeText={setBreed}
          placeholder="Ex: Golden Retriever"
        />

        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              keyboardType="decimal-pad"
              placeholder="0.0"
            />
          </View>
          <View style={styles.half}>
            <Text style={styles.label}>Data de Nascimento</Text>
            <TextInput
              style={styles.input}
              value={birthDate}
              onChangeText={setBirthDate}
              placeholder="AAAA-MM-DD"
            />
          </View>
        </View>

        <Text style={styles.label}>Cor</Text>
        <TextInput
          style={styles.input}
          value={color}
          onChangeText={setColor}
          placeholder="Ex: Caramelo, Preto, Branco"
        />

        <View style={styles.switchRow}>
          <Text style={styles.label}>Vacinado</Text>
          <Switch
            value={isVaccinated}
            onValueChange={setIsVaccinated}
            trackColor={{ false: '#ccc', true: '#6C63FF' }}
            thumbColor={isVaccinated ? '#4B44CC' : '#f4f3f4'}
          />
        </View>

        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>
              {isEditing ? 'Atualizar Pet' : 'Cadastrar Pet'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  photoSection: { alignItems: 'center', paddingVertical: 24, backgroundColor: '#fff' },
  photoContainer: {
    width: 120, height: 120, borderRadius: 60,
    borderWidth: 2, borderColor: '#ddd',
    justifyContent: 'center', alignItems: 'center',
    overflow: 'hidden',
  },
  photo: { width: 120, height: 120, borderRadius: 60 },
  photoPlaceholder: { alignItems: 'center' },
  photoHint: { fontSize: 12, color: '#ccc', marginTop: 4 },
  galleryButton: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: 12, padding: 8,
  },
  galleryButtonText: { color: '#6C63FF', marginLeft: 6, fontSize: 14 },
  form: { padding: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: '#fff', borderRadius: 8, borderWidth: 1,
    borderColor: '#ddd', padding: 12, fontSize: 15,
  },
  row: { flexDirection: 'row', gap: 12 },
  half: { flex: 1 },
  speciesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  speciesChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd',
  },
  speciesChipActive: { backgroundColor: '#6C63FF', borderColor: '#6C63FF' },
  speciesChipText: { fontSize: 13, color: '#666' },
  speciesChipTextActive: { color: '#fff', fontWeight: '600' },
  switchRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginTop: 12,
  },
  saveButton: {
    backgroundColor: '#6C63FF', borderRadius: 12,
    padding: 16, alignItems: 'center', marginTop: 24,
    marginBottom: 40,
  },
  saveButtonDisabled: { opacity: 0.6 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
