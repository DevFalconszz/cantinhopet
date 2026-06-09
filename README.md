<p align="center">
  <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="180" y2="180">
        <stop stop-color="#6C63FF"/>
        <stop offset="1" stop-color="#7C6FF0"/>
      </linearGradient>
      <linearGradient id="g2" x1="0" y1="0" x2="180" y2="180">
        <stop stop-color="#6C63FF"/>
        <stop offset="1" stop-color="#9B8DF5"/>
      </linearGradient>
      <linearGradient id="g3" x1="0" y1="0" x2="180" y2="180">
        <stop stop-color="#FF6B6B"/>
        <stop offset="1" stop-color="#FF9F43"/>
      </linearGradient>
      <filter id="s">
        <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#6C63FF" flood-opacity="0.2"/>
      </filter>
    </defs>

    <!-- Outer ring -->
    <circle cx="90" cy="90" r="88" fill="#F5F3FF"/>
    <circle cx="90" cy="90" r="82" fill="none" stroke="#6C63FF" stroke-width="1" opacity="0.08"/>

    <!-- Decorative dots on ring -->
    <circle cx="90" cy="10" r="2.5" fill="#6C63FF" opacity="0.15"/>
    <circle cx="90" cy="170" r="2.5" fill="#6C63FF" opacity="0.15"/>
    <circle cx="10" cy="90" r="2.5" fill="#6C63FF" opacity="0.15"/>
    <circle cx="170" cy="90" r="2.5" fill="#6C63FF" opacity="0.15"/>
    <circle cx="33" cy="33" r="2" fill="#6C63FF" opacity="0.1"/>
    <circle cx="147" cy="33" r="2" fill="#6C63FF" opacity="0.1"/>
    <circle cx="33" cy="147" r="2" fill="#6C63FF" opacity="0.1"/>
    <circle cx="147" cy="147" r="2" fill="#6C63FF" opacity="0.1"/>

    <!-- Main circle badge -->
    <circle cx="90" cy="90" r="62" fill="#fff" filter="url(#s)"/>
    <circle cx="90" cy="90" r="59" fill="none" stroke="#6C63FF" stroke-width="0.5" opacity="0.15"/>

    <!-- House roof shape (Cantinho = home) -->
    <path d="M90 42 L52 72 L52 74 L90 50 L128 74 L128 72Z" fill="url(#g1)" opacity="0.06"/>

    <!-- Paw print - main pad -->
    <path d="M90 112 
             C70 112 56 102 56 88 
             C56 77 63 68 73 68 
             C80 68 86 74 90 80 
             C94 74 100 68 107 68 
             C117 68 124 77 124 88 
             C124 102 110 112 90 112Z" 
          fill="url(#g2)"/>

    <!-- Toe pads -->
    <ellipse cx="66" cy="82" rx="9" ry="11" fill="url(#g2)" transform="rotate(-16 66 82)"/>
    <ellipse cx="82" cy="72" rx="8" ry="10" fill="url(#g2)" transform="rotate(-5 82 72)"/>
    <ellipse cx="98" cy="72" rx="8" ry="10" fill="url(#g2)" transform="rotate(5 98 72)"/>
    <ellipse cx="114" cy="82" rx="9" ry="11" fill="url(#g2)" transform="rotate(16 114 82)"/>

    <!-- Paw highlights -->
    <ellipse cx="66" cy="82" rx="3" ry="4" fill="#fff" opacity="0.3"/>
    <ellipse cx="82" cy="72" rx="2.5" ry="3.5" fill="#fff" opacity="0.3"/>
    <ellipse cx="98" cy="72" rx="2.5" ry="3.5" fill="#fff" opacity="0.3"/>
    <ellipse cx="114" cy="82" rx="3" ry="4" fill="#fff" opacity="0.3"/>
    <circle cx="90" cy="100" r="3" fill="#fff" opacity="0.2"/>

    <!-- Small heart -->
    <path d="M90 132 C87 129 82 124 82 120 C82 117 84 115 87 115 C88 115 90 116 90 117 C90 116 92 115 93 115 C96 115 98 117 98 120 C98 124 93 129 90 132Z" fill="url(#g3)" opacity="0.5"/>

    <!-- Brand text -->
    <text x="90" y="164" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" font-size="14" font-weight="800" fill="#6C63FF" letter-spacing="4">CANTINHO</text>
    <text x="90" y="177" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" font-size="9" font-weight="700" fill="#A78BFA" letter-spacing="6">PET</text>
  </svg>
</p>

<h1 align="center">CantinhoPet</h1>

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
