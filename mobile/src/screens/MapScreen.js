import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ActivityIndicator,
  TouchableOpacity, Modal,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';

export default function MapScreen({ route }) {
  const { species } = route.params || {};
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOsm, setShowOsm] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setUserLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      }
      setLoading(false);
    })();
  }, []);

  const lat = userLocation?.latitude || -23.5505;
  const lng = userLocation?.longitude || -46.6333;
  const query = encodeURIComponent(
    species ? `clínica veterinária para ${species}` : 'clínica veterinária'
  );
  const searchUrl = `https://www.google.com/maps/dir/${lat},${lng}/${query}`;

  const openGoogleMaps = () => {
    Linking.openURL(searchUrl).catch(() => {});
  };

  const osmHtml = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<style>
  * { margin: 0; padding: 0; }
  html, body, #map { width: 100%; height: 100%; }
</style>
</head>
<body>
<div id="map"></div>
<script>
  var map = L.map('map').setView([${lat}, ${lng}], 14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OSM',
    maxZoom: 19
  }).addTo(map);
  L.circleMarker([${lat}, ${lng}], {
    radius: 8, fillColor: '#6C63FF', color: '#fff',
    weight: 3, fillOpacity: 1
  }).addTo(map).bindPopup('Você');
</script>
</body>
</html>`;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.fallback}>
        <Ionicons name="search-outline" size={64} color="#ccc" />
        <Text style={styles.title}>Buscar clínicas veterinárias</Text>
        <Text style={styles.sub}>
          O Google Maps não funciona dentro do app.{'\n'}
          Clique abaixo para abrir no aplicativo.
        </Text>

        <TouchableOpacity style={styles.btn} onPress={openGoogleMaps}>
          <Ionicons name="logo-google" size={20} color="#fff" />
          <Text style={styles.btnText}>Buscar no Google Maps</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} onPress={() => setShowOsm(true)}>
          <Ionicons name="map" size={20} color="#6C63FF" />
          <Text style={styles.btnSecondaryText}>Ver minha localização (OSM)</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showOsm} animationType="slide" onRequestClose={() => setShowOsm(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Sua localização (OSM)</Text>
            <TouchableOpacity onPress={() => setShowOsm(false)}>
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
          </View>
          <WebView
            style={styles.modalMap}
            source={{ html: osmHtml }}
            scrollEnabled={false}
            bounces={false}
            javaScriptEnabled={true}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  fallback: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    padding: 32, backgroundColor: '#f5f5f5',
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333', marginTop: 20, marginBottom: 8 },
  sub: { fontSize: 14, color: '#999', textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  btn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#4285F4', paddingVertical: 16, paddingHorizontal: 32,
    borderRadius: 14, width: '100%',
  },
  btnText: { color: '#fff', fontSize: 17, fontWeight: '600' },
  btnSecondary: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 16, paddingHorizontal: 32,
    borderRadius: 14, borderWidth: 2, borderColor: '#6C63FF',
    width: '100%', marginTop: 12,
  },
  btnSecondaryText: { color: '#6C63FF', fontSize: 17, fontWeight: '600' },
  modalContainer: { flex: 1, backgroundColor: '#fff' },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, paddingTop: 50,
    borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  modalTitle: { fontSize: 17, fontWeight: 'bold', color: '#333' },
  modalMap: { flex: 1 },
});
