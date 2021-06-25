# nlw-together-letmeask
NLW Together - Let me ask. ReactJS Web App.

# Códigos
- [x] 1. #together
  - Porque estamos juntos nessa missão. É com junto com vc que estamos construindo tudo isso. E é por isso que não abrimos mão de nossa comunidade. O NLW é um evento feito para a comunidade se reunir e evoluir em unidade. Esse sincronismo é poderodo. Você já percebeu o quanto estar junto de outros devs que resporam tecnologia, focados em um objetivo comum, compartilhando informações e cooperando faz vc evoluir mais rápido. Essa é a essência no NLW. O nosso time inteiro para pra colocar toda a energia em ajudar cada dev que está com a gente nessa missão. Não existem limites se a gente estiver junto, um ajudando o outro, um contribuindo com o outro. Por isso, sempre que tiver oportunidades como essa, aproveite. Você vai acelerar a evolução de todo o ecossistema. É pra isso que construimos o NLW. Para evoluirmos juntos.
- [x] 2. #unidade
  - Unidade é Ação coletiva, que tende a um unico objetivo; Significa união, integração e cooperação. Na unidade não significa que todos se tornam iguais, que as diferenças desapareçam, mas significa que cada um soma com o grupo ao caminhar junto numa mesma visão. num mesmo propósito com os demais, para chegar no nosso objetivo. O próximo nível.
- [x] 3. #embuscadeevolução
  - O universo é infinito, não existem limites para o que podemos construir, a evolução é necessária, não existe inércia, precisamos estar sempre em busca do próximo nível porque a tecnologia não para de evoluir.
- [ ] 4. #legacy
  - Nos importamos com o legado. É sobre isso. Sobre fazer parte da solução, fazer a diferença no mundo através das linhas de código. Contruir soluções que deixem o mundo melhor, mais próspero.

# Aula 1 - Liftoff - 20/06/2021
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

# Aula 2 - Maximum Speed - 22/06/2021
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

# Aula 3 - In Orbit - 22/06/2021
  
- [x] Fluxo de salas:
  - [x] Criação de salas
  - [x] Entrando na sala
  - [x] Estipulando autorização
```json
{
  "rules": {
    "rooms": {
      ".read": false,
      ".write": "auth != null",
      "$roomId": {
        ".read": true,
        ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)",
        "questions": {
          ".read": true,
          ".write": "auth != null && (!data.exists() || data.parent().child('authorId').val() == auth.id)",
          "likes": {
            ".read": true,
            ".write": "auth != null && (!data.exists() || data.parent().child('authorId').val() == auth.id)",
          },
        }
      }
    }
  }
}
```
  - [x] Página de sala
  - [x] Criando nova pergunta
    - [ ] ```react-hot-toast```
  - [x] Consultando perguntas do Firebase
  - [x] "Ouvindo" novas perguntas
    - [ ] TODO: Check - Read Event Types (Child Added/Changed/Removed/Moved)
    - [ ] https://firebase.google.com/docs/database/admin/retrieve-data#value
  - [ ] Criando hook ``useRoom``

# Aula 4 - Landing - 24/06/2021
- [ ] Conteúdo técnico
  - [x] Estrutura das perguntas (HTML + CSS)
  - [x] Criando hook ``useRoom``
  - [x] Página de sala (admin)
  - [x] Funcionalidade de like
  - [ ] Componente de modal
    - [ ] ```react-modal```
  - [x] Remoção de pergunta
  - [ ] Encerrar sala

# Aula 5 - Surface Exploration - 24/06/2021
