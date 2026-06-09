<p align="center">
  <img src="assets/logo.svg" width="400" alt="CantinhoPet">
</p>

<p align="center">
  Aplicativo mobile para cadastro e gerenciamento de pets com autenticação, fotos, mapa de clínicas veterinárias e muito mais.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.85-61DAFB?logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/Expo-56-000020?logo=expo&logoColor=white"/>
  <img src="https://img.shields.io/badge/Spring_Boot-3.4-6DB33F?logo=spring&logoColor=white"/>
  <img src="https://img.shields.io/badge/Firebase_Auth-FFCA28?logo=firebase&logoColor=black"/>
  <img src="https://img.shields.io/badge/Java-25-ED8B00?logo=java&logoColor=white"/>
  <img src="https://img.shields.io/badge/license-MIT-green"/>
</p>

---

## 📋 Sobre

O **CantinhoPet** é um aplicativo desenvolvido como projeto de avaliação final da disciplina de Desenvolvimento Mobile. Ele permite que tutores cadastrem seus animais de estimação, armazenem fotos, visualizem informações importantes e encontrem clínicas veterinárias próximas.

### Funcionalidades

- 📸 **Cadastro de pets** com foto (câmera ou galeria)
- 🏷️ **Espécies pré-definidas** (Cachorro, Gato, Ave, Peixe, Roedor, Reptil, Outro)
- 💉 **Controle de vacinação**
- 📍 **Mapa de clínicas veterinárias** (Google Maps + OpenStreetMap)
- 🔐 **Autenticação Firebase** (email/senha com verificação de senha forte)
- 👤 **Dados isolados por usuário** — cada tutor vê apenas seus pets
- 📱 **Pull-to-refresh**, badges, alertas nativos

---

## 🚀 Tecnologias

### Frontend (Mobile)

| Tecnologia | Versão | Finalidade |
|---|---|---|
| React Native | 0.85.3 | Framework mobile cross-platform |
| Expo SDK | 56 | Toolchain de desenvolvimento |
| React Navigation | 7.x | Navegação entre telas |
| Axios | 1.7.9 | Requisições HTTP |
| Firebase Auth | 12.14 | Autenticação de usuários |
| expo-image-picker | 56 | Câmera e galeria |
| expo-location | 56 | GPS e localização |
| react-native-webview | 13.16 | Mapa OpenStreetMap |

### Backend

| Tecnologia | Versão | Finalidade |
|---|---|---|
| Spring Boot | 3.4.4 | Framework web |
| Java | 25 | Runtime |
| Spring Data JPA | — | Persistência / ORM |
| H2 Database | — | Banco de dados embarcado |
| Hibernate Validator | — | Validação de dados |

---

## 📸 Screens

<p align="center">
  <i>(Adicione prints do aplicativo aqui)</i>
</p>

| Tela | Descrição |
|---|---|
| **Login** | Autenticação com email/senha via Firebase |
| **Home** | Lista de pets com badges de peso e vacinação |
| **Formulário** | Cadastro/edição com foto, chips de espécie e campos |
| **Detalhes** | Informações completas do pet |
| **Mapa** | Clínicas veterinárias próximas (Google Maps + OSM) |

---

## 🎯 Requisitos Atendidos

| Requisito | Status |
|---|---|
| React Native | ✅ |
| Backend para persistência (Spring Boot + JPA) | ✅ |
| Objeto com 5+ atributos (literal, numérico, data, boolean) | ✅ 8 atributos |
| Aplicativo autoral | ✅ |
| Trabalho individual | ✅ |
| **Diferenciais** | |
| Câmera e Galeria | ✅ |
| Mapa interativo (Google Maps + OSM) | ✅ |
| GPS / Localização | ✅ |
| Alertas nativos | ✅ |
| Chips de seleção de espécie | ✅ |
| Badges de status | ✅ |
| Autenticação Firebase (bônus) | ✅ |

---

## 🛠️ Como Rodar

### Pré-requisitos

- Java 25
- Node.js 20+
- Expo Go (no celular)
- Maven

### 1. Clone e entre no diretório

```bash
git clone https://github.com/seu-usuario/cantinhopet.git
cd cantinhopet
```

### 2. Inicie o backend

```bash
cd backend
mvn spring-boot:run
```

O backend roda em `http://localhost:8080`.  
Console H2: `http://localhost:8080/h2-console`

### 3. Inicie o mobile

```bash
cd mobile
npm install
npx expo start
```

Escaneie o QR Code com o **Expo Go** no seu celular.

### Ou use o script único

```bash
./start.sh
```

Inicia backend e mobile em paralelo.

---

## 📁 Estrutura do Projeto

```
CantinhoPet/
├── backend/                          # API REST (Spring Boot)
│   └── src/main/java/com/cantinhopet/
│       ├── model/Pet.java            # Entidade JPA
│       ├── repository/               # Acesso a dados
│       ├── service/                  # Lógica de negócio
│       └── controller/               # Endpoints REST
├── mobile/                           # App React Native (Expo)
│   └── src/
│       ├── screens/                  # Telas do app
│       │   ├── LoginScreen.js        # Autenticação
│       │   ├── HomeScreen.js         # Lista de pets
│       │   ├── PetFormScreen.js      # Cadastro/edição
│       │   ├── PetDetailScreen.js    # Detalhes do pet
│       │   └── MapScreen.js          # Mapa veterinário
│       ├── contexts/AuthContext.js   # Estado de autenticação
│       └── services/
│           ├── api.js                # Cliente HTTP (Axios)
│           └── firebase.js           # Config Firebase
├── assets/                           # Logos e recursos
└── start.sh                          # Script de inicialização
```

---

## 📡 API Endpoints

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/pets` | Lista pets do usuário logado |
| `GET` | `/api/pets/{id}` | Busca pet por ID |
| `POST` | `/api/pets` | Cria novo pet |
| `PUT` | `/api/pets/{id}` | Atualiza pet |
| `DELETE` | `/api/pets/{id}` | Remove pet |
| `PUT` | `/api/pets/{id}/photo` | Atualiza URL da foto |

Todas as requisições exigem o header `X-User-Id` com o UID do Firebase.

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

<p align="center">
  Feito com ❤️ para a disciplina de Desenvolvimento Mobile
</p>
