Claro! Vou criar um README para o seu projeto de front-end em Vue.js. Esse README incluirá informações sobre os recursos utilizados, configuração e execução do projeto.

```markdown
# AG-main Front-end

Este é o front-end para o projeto AG-main, uma plataforma de gestão de projetos desenvolvida em Vue.js. O front-end é responsável por interagir com a API desenvolvida em Java e Spring Boot, permitindo a visualização e manipulação de dados relacionados a projetos, clientes e atividades.

## Recursos Utilizados

- **Vue.js**: Framework JavaScript para a construção da interface do usuário.
- **Vue Router**: Gerenciador de rotas para navegação entre páginas.
- **Vuex**: Gerenciador de estado global (não utilizado diretamente neste projeto, mas útil para projetos maiores).
- **Axios**: Biblioteca para fazer requisições HTTP para a API.
- **Jest**: Framework de testes para garantir a qualidade do código.
- **Vue Test Utils**: Utilitário de testes para Vue.js.
- **Flush Promises**: Biblioteca auxiliar para esperar a resolução de promessas em testes.

## Estrutura de Pastas

```
src/
│
├── assets/                  # Arquivos estáticos como imagens e estilos
│
├── components/              # Componentes Vue.js
│   ├── AtividadeComponent.vue
│   ├── ClienteComponent.vue
│   └── ProjetoComponent.vue
│
├── views/                   # Páginas da aplicação
│   └── Home.vue             # Página inicial
│
├── router/                  # Configuração de rotas
│   └── index.js
│
├── store/                   # Gerenciamento de estado global (se utilizado)
│   └── index.js
│
├── tests/                   # Testes unitários
│   ├── components/
│   │   ├── AtividadeComponent.spec.js
│   │   ├── ClienteComponent.spec.js
│   │   └── ProjetoComponent.spec.js
│   └── setup.js             # Configuração dos testes
│
├── App.vue                  # Componente raiz
└── main.js                  # Entrada principal da aplicação
```

## Requisitos

Para executar este projeto, você precisará das seguintes ferramentas:

- **Node.js**: [Download e Instalação](https://nodejs.org/)
- **npm** (gerenciador de pacotes do Node.js) ou **yarn** (opcional)

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/ag-main-frontend.git
    cd ag-main-frontend
    ```

2. Instale as dependências:

    Com npm:
    ```bash
    npm install
    ```

    Ou com yarn:
    ```bash
    yarn install
    ```

## Configuração

Antes de executar o projeto, você precisa garantir que a API do back-end esteja em execução. A API deve estar acessível nos endpoints especificados nos métodos Axios (por padrão, `/projeto`, `/cliente` e `/atividade`).

## Execução

Para iniciar o servidor de desenvolvimento e rodar o front-end, execute o seguinte comando:

Com npm:
```bash
npm run serve
```

Ou com yarn:
```bash
yarn serve
```

A aplicação estará disponível em [http://localhost:8080](http://localhost:8080).

## Testes

Para rodar os testes unitários, utilize o seguinte comando:

Com npm:
```bash
npm run test:unit
```

Ou com yarn:
```bash
yarn test:unit
```

Os testes garantem que os componentes funcionem conforme o esperado e lidam adequadamente com erros.

## Contribuição

Se você deseja contribuir para o projeto, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma nova branch para suas alterações.
3. Faça as alterações e envie um pull request para o repositório original.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Contato

Para mais informações ou dúvidas, entre em contato com [rfscheidt@gmail.com](mailto:rfscheidt@gmail.com).

---

Este README fornece uma visão geral completa sobre o projeto, incluindo como configurá-lo e executá-lo. Se precisar de mais alguma coisa, estou à disposição!
```