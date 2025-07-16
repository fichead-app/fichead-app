# FicHead App

> Um aplicativo de ebooks inspirado no Skoob, desenvolvido com React Native, Expo e TypeScript.

## 📱 Sobre o Projeto

O FicHead é um aplicativo mobile de biblioteca digital que permite aos usuários descobrir, ler e gerenciar seus ebooks favoritos. O app foi desenvolvido baseado no design do Skoob, oferecendo uma experiência moderna e intuitiva para leitores digitais.

## 🚀 Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Linguagem de programação tipada
- **Expo Router** - Sistema de navegação (estilo Next.js)
- **Zustand** - Gerenciamento de estado
- **Expo Vector Icons** - Ícones
- **React Native Reanimated** - Animações

## 📁 Estrutura do Projeto

```
fichead-app/
├── app/                          # Rotas do app (Expo Router)
│   ├── (tabs)/                   # Rotas com tabs
│   │   ├── _layout.tsx           # Layout das tabs
│   │   ├── index.tsx             # Home screen
│   │   ├── explore.tsx           # Explorar livros
│   │   ├── library.tsx           # Biblioteca pessoal
│   │   └── profile.tsx           # Perfil do usuário
│   ├── auth/                     # Autenticação
│   │   ├── login.tsx             # Login
│   │   ├── forgot-password.tsx   # Esqueci senha
│   │   ├── verify-code.tsx       # Verificação OTP
│   │   └── reset-success.tsx     # Sucesso reset
│   ├── onboarding/               # Onboarding
│   │   ├── index.tsx             # Boas-vindas
│   │   ├── gender.tsx            # Seleção gênero
│   │   ├── age.tsx               # Seleção idade
│   │   ├── genres.tsx            # Seleção gêneros
│   │   ├── profile.tsx           # Completar perfil
│   │   └── success.tsx           # Sucesso cadastro
│   ├── _layout.tsx               # Layout raiz
│   └── index.tsx                 # Splash screen
├── components/                   # Componentes reutilizáveis
│   ├── Button.tsx                # Botão customizado
│   ├── Input.tsx                 # Campo de input
│   ├── Layout.tsx                # Layout base
│   ├── Modal.tsx                 # Modal
│   └── Loading.tsx               # Componentes de loading
├── constants/                    # Constantes
│   └── theme.ts                  # Temas (light/dark)
├── stores/                       # Stores Zustand
│   ├── themeStore.ts             # Gerenciamento de tema
│   └── userStore.ts              # Gerenciamento de usuário
├── types/                        # Definições de tipos
│   └── theme.ts                  # Tipos do tema
└── assets/                       # Imagens e recursos
```

## 🎨 Design System

### Cores

**Light Theme:**
- Primary: `#FF8A00` (Laranja principal)
- Secondary: `#FFF3E6` (Laranja claro)
- Background: `#FFFFFF`
- Surface: `#F8F9FA`
- Text: `#1A1A1A`

**Dark Theme:**
- Primary: `#FF8A00` (Laranja principal)
- Secondary: `#2D1810` (Laranja escuro)
- Background: `#0F172A`
- Surface: `#1E293B`
- Text: `#F1F5F9`

### Tipografia

- **Font Sizes:** 12px, 14px, 16px, 18px, 24px, 32px
- **Font Weights:** 300, 400, 500, 600, 700

### Espaçamentos

- **XS:** 4px
- **SM:** 8px
- **MD:** 16px
- **LG:** 24px
- **XL:** 32px
- **XXL:** 40px

## 📱 Funcionalidades

### ✅ Implementadas

1. **Splash Screen**
   - Tela de carregamento inicial
   - Logo animado
   - Redirecionamento automático

2. **Onboarding**
   - Tela de boas-vindas
   - Seleção de gênero
   - Seleção de faixa etária
   - Escolha de gêneros literários preferidos
   - Completar perfil
   - Confirmação de cadastro

3. **Autenticação**
   - Login com email/senha
   - Esqueci minha senha
   - Verificação por código OTP
   - Reset de senha bem-sucedido
   - Login social (placeholders)

4. **Home Screen**
   - Saudação personalizada
   - Barra de pesquisa
   - Categorias de livros
   - Livros em destaque
   - Recomendações personalizadas

5. **Componentes Reutilizáveis**
   - Button (4 variantes)
   - Input (com validação)
   - Layout base
   - Modal customizado
   - Loading components

6. **Sistema de Temas**
   - Tema claro/escuro
   - Troca automática baseada no sistema
   - Componentes responsivos ao tema

7. **Gerenciamento de Estado**
   - Store de usuário (Zustand)
   - Store de tema (Zustand)
   - Persistência de dados mockada

### 🚧 Em Desenvolvimento

- [ ] Tela de exploração
- [ ] Biblioteca pessoal
- [ ] Perfil do usuário
- [ ] Detalhes do livro
- [ ] Leitor de ebook
- [ ] Sistema de favoritos
- [ ] Reviews e ratings
- [ ] Pesquisa avançada
- [ ] Sincronização com API

## 🛠️ Instalação

### Pré-requisitos

- Node.js (>= 16.x)
- npm ou yarn
- Expo CLI
- React Native development environment

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/fichead-app.git
cd fichead-app
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Inicie o projeto**
```bash
npm start
# ou
yarn start
# ou
expo start
```

4. **Execute no dispositivo**
- Escaneie o QR code com o app Expo Go
- Ou execute em emulador: `expo run:android` / `expo run:ios`

## 📝 Scripts Disponíveis

```bash
npm start          # Inicia o servidor de desenvolvimento
npm run android    # Executa no emulador Android
npm run ios        # Executa no simulador iOS
npm run web        # Executa no navegador
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
API_URL=https://sua-api.com
```

### Configuração do Expo

As configurações estão no arquivo `app.json`:

```json
{
  "expo": {
    "name": "FicHead",
    "slug": "fichead-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "userInterfaceStyle": "automatic"
  }
}
```

## 🎯 Próximos Passos

1. **Integração com API**
   - Implementar serviços de API
   - Autenticação real
   - Sincronização de dados

2. **Funcionalidades Avançadas**
   - Push notifications
   - Modo offline
   - Compartilhamento social
   - Análise de leitura

3. **Melhorias de UX**
   - Animações mais fluidas
   - Feedback háptico
   - Acessibilidade

4. **Performance**
   - Lazy loading
   - Cache de imagens
   - Otimização de bundle

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ por [Seu Nome]

---

⭐ Se este projeto te ajudou, não esqueça de dar uma estrela!