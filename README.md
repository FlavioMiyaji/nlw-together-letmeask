# nlw-together-letmeask
NLW Together - Let me ask. ReactJS Web App.

# Aula 1 - 20/06/2021
- [x] Criar o APP:
```
yarn create react-app letmeask --template typescript
```
- [x] Fazer primeiro COMMIT
  - [x] Limpar estrutura desnecessária:
    - [x] Da pasta "public" remover tudo que não é o "index.html";
    - [x] Da pasta "src" remover:
      - [x] App.css;
      - [x] App.test.tsx;
      - [x] index.css;
      - [x] logo.svg;
      - [x] reportWebVitals.ts;
      - [x] setupTests.ts;
    - [x] Arquivo "public/index.html":
      - [x] Limpar a tag "<header>";
        - [x] Manter as tags "meta" e "title";
      - [x] Limpar o tab "<body>";
        - [x] Manter o "noscript" e a "div#root";
    - [x] Arquivo "src/index.tsx":
      - [x] Remover comentários e "repostWebVitals";
      - [x] Remover a importação do "index.css";
    - [x] Arquivo "src/App.tsx":
      - [x] Remover imports;
      - [x] Alterar o conteúdo para "Hello World";
    - [x] Rodar o APP pela primeira vez:
      - [x] Terminal / New Terminal
```
yarn start
```
- [x] Criar o projeto no firebase:
  - [x] console.firebase.google.com
  - [x] br-com-fym-letmeask
  - [x] Authentication:
    - [x] Google
    - [x] Enabled
    - [x] Nome do projeto: letmeask-web
    - [x] Configurar email de suporte
    - [ ] Se um dia houver a necessidade de puclicar essa aplicação existe a necessidade de Automizar o dominio.
  - [x] Realtime Database:
    - [x] Create Database
    - [x] Manter a localização
    - [x] Iniciar no modo bloqueado
    - [x] Button: Enable
  - [x] Project Overview
    - [x] Add an app to get started: WEB
    - [x] App Nickname: LetMeAsk Web
    - [x] Register app
- [x] De volta ao projeto:
```
yarn add firebase
```
  - [x] "src/services/firebase.ts"
  - [x] .env.local
```
REACT_APP_API_KEY
REACT_APP_AUTH_DOMAIN
REACT_APP_DATABASE_URL
REACT_APP_PROJECT_ID
REACT_APP_STORAGE_BUCKET
REACT_APP_MESSAGING_SENDER_ID
REACT_APP_APP_ID
```
  - [x] Segundo COMMIT
- [x] Código do sorteio: #together

# Aula 2 - 22/06/2021
- [x] Terceiro commit (Quick lunch time coding)
```
yarn add node-sass@^5.0.0
```
  - [x] Criando e estilizando a HOME Page
  - [x] Video stop at 37:15.

- [x] Quarto commit:
  - [x] Adicionar componente Button
  - [x] Adicionar NewRoom Page
  - [x] Adicionar Navegação
```
yarn add react-router-dom
```
```
yarn add @types/react-router-dom -D
```
  - [x] Fazer autenticação com o Google
```javascript
const singInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = await auth.signInWithPopup(provider);
  if (!result.user) {
    return;
  }
  const { displayName, photoURL, uid } = result.user;
  if (!displayName || !photoURL) {
    throw new Error('Missing information from Google Account.');
  }
  setUser({
    id: uid,
    name: displayName,
    avatar: photoURL,
  });
};
```
  - [x] Recuperar estado de autenticação
  - [x] Criando hook de autenticação

# Aula 3 - 22/06/2021
  
