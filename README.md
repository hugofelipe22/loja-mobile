# 🛍️ Loja Mobile

Aplicativo mobile de e-commerce desenvolvido como projeto acadêmico da disciplina de **Mobile Development**.

O projeto foi desenvolvido utilizando React Native com Expo, com consumo de uma API REST real através do Axios e gerenciamento de estado de autenticação utilizando Redux Toolkit.

---

## 👨‍💻 Autor

**Hugo Vieira**

Projeto acadêmico desenvolvido para aplicação prática dos conceitos de desenvolvimento mobile.

---

## 📱 Sobre o projeto

O Loja Mobile é um aplicativo desenvolvido para apresentar produtos de uma loja virtual de maneira simples, responsiva e organizada.

A aplicação permite que o usuário faça login, navegue pelos produtos separados em categorias masculina e feminina, visualize diferentes subcategorias e acesse os detalhes individuais de cada produto.

Os produtos são obtidos dinamicamente através da API REST DummyJSON.

---

## ✨ Funcionalidades

- Tela de login com validação de campos;
- Validação do formato do e-mail;
- Validação das credenciais de acesso;
- Armazenamento temporário dos dados do usuário;
- Gerenciamento de autenticação com Redux Toolkit;
- Listagem de produtos por categoria;
- Separação entre categorias masculina e feminina;
- Navegação entre categorias e subcategorias;
- Consumo de API REST utilizando Axios;
- Tela de detalhes do produto;
- Exibição de nome, descrição, preço, desconto e imagem;
- Navegação para detalhes utilizando o ID do produto;
- Indicador de carregamento durante as requisições;
- Tratamento de erros de comunicação com a API;
- Logout;
- Retorno à tela de login após o logout.

---

## 🗂️ Categorias

### Masculino

- Camisas
- Calçados
- Relógios

### Feminino

- Bolsas
- Vestidos
- Joias
- Calçados
- Relógios

---

## 🛠️ Tecnologias utilizadas

- React Native
- Expo
- TypeScript
- Axios
- Redux Toolkit
- React Redux
- Expo Router
- DummyJSON API

---

## 🌐 API utilizada

O projeto utiliza a API pública **DummyJSON** para obtenção dos produtos.

Documentação oficial:

https://dummyjson.com/docs

As principais requisições utilizadas são:

```text
GET /products/category/{categoria}