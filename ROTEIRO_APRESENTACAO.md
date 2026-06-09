# Roteiro de Apresentação - CantinhoPet

## 1. Introdução (1 min)

"Bom dia a todos! Hoje vou apresentar o **CantinhoPet**, um aplicativo mobile para cuidar do seu melhor amigo."

> **Objetivo:** Mostrar o que é o app, qual problema resolve
> **Ponto chave:** "App para gerenciar informações de pets com fotos, controle de vacinação e mapa de veterinários"

---

## 2. Tecnologias Utilizadas (1 min)

**Frontend (Mobile):**
- React Native com Expo SDK 56
- React Navigation (navegação entre telas)
- expo-image-picker (câmera e galeria)
- react-native-maps (mapa)
- Axios (comunicação HTTP)

**Backend:**
- Spring Boot 3.4.4
- Spring Data JPA (persistência)
- H2 Database (banco em memória)
- API RESTful

**Diferenciais:**
- Câmera/Galeria para fotos dos pets
- Mapas com clínicas veterinárias
- Autenticação Firebase (bônus)

---

## 3. Modelo de Dados - Classe Pet (1 min)

> Mostrar o código ou diagrama da classe Pet

**Atributos (8 no total, mín. 5 exigidos):**

| Atributo | Tipo | Exemplo |
|----------|------|---------|
| `name` | Texto | "Rex" |
| `species` | Texto | "Cachorro" |
| `breed` | Texto | "Golden Retriever" |
| `weight` | Numérico | 25.5 |
| `birthDate` | Data | 2022-05-15 |
| `isVaccinated` | Booleano | true |
| `color` | Texto | "Caramelo" |
| `photoUrl` | Texto (URL) | "file:///foto.jpg" |

**Destaque:** "Temos 4 tipos de dados: texto, numérico, data e booleano - todos os tipos exigidos."

---

## 4. Demonstração do App (5 min)

### Tela 1: Home (Listagem)
- Abrir o app mostrar a tela inicial vazia
- "Aqui vemos a listagem dos pets cadastrados"
- Puxar para atualizar (refresh)
- Botão flutuante "+" para adicionar

### Tela 2: Cadastro de Pet
- Clicar no "+"
- **Demonstrar a câmera:** "Vou tirar uma foto do pet"
- Preencher nome, espécie (usar chips), raça, peso, data
- Ativar switch "Vacinado"
- Salvar

### Tela 3: Detalhes do Pet
- Clicar no pet na lista
- Mostrar foto, informações completas
- "Aqui vemos todos os dados do pet"
- Botões: Editar, Veterinários, Remover

### Tela 4: Mapa (DIFERENCIAL)
- Clicar em "Veterinários"
- "Este é um dos diferenciais - mapa interativo com clínicas"
- Mostrar markers
- Clicar no callout: "Ligar" e "Abrir no Maps"

### Tela 5: Edição
- Voltar e clicar em "Editar"
- Modificar algum campo
- Salvar e mostrar atualização

---

## 5. Explicação do Código (2 min)

### Backend (Spring Boot)
- **Controller:** Endpoints REST (`/api/pets`) com CRUD completo
- **Service:** Lógica de negócio e validações
- **Repository:** Interface JPA para acesso a dados
- **Model:** Entidade Pet com validações (`@NotBlank`, `@PositiveOrZero`)

### Frontend (React Native)
- **App.js:** Configuração de navegação (Stack Navigator)
- **Screens:** HomeScreen, PetFormScreen, PetDetailScreen, MapScreen
- **API Service:** Conexão com backend via Axios

---

## 6. Firebase Auth (Bônus) (1 min)

> Se configurado, demonstrar

- "Implementei também autenticação com Firebase"
- Mostrar tela de login
- "Isso garante que cada usuário tenha seus próprios pets"

---

## 7. Diferenciais do Projeto (1 min)

1. **Câmera e Galeria:** "O usuário pode fotografar o pet na hora ou escolher da galeria"
2. **Mapa Interativo:** "Mapa com clínicas veterinárias próximas, com opção de ligar ou navegar"
3. **Chips de Espécie:** "Interface amigável com seleção de espécie por chips"
4. **Badges de Status:** "Indicadores visuais de vacinação e peso"
5. **Confirmação de Exclusão:** "Alertas de confirmação para evitar exclusão acidental"

---

## 8. Conclusão (1 min)

- "O CantinhoPet é um aplicativo completo para gestão de pets"
- "Utiliza React Native com Expo, Spring Boot + JPA"
- "Implementa todos os requisitos e vai além com diferenciais"
- "Código disponível no GitHub para consulta"

**Agradecer e abrir para perguntas!**

---

## Dicas para Apresentação

- ✅ Fale com confiança e clareza
- ✅ Mostre o código em pontos estratégicos
- ✅ Enfatize os diferenciais (câmera e mapa)
- ✅ Peça feedback da turma e professor
- ❌ Não leia os slides - use como guia
- ❌ Não apresse a demonstração
