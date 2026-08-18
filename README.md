<div align="center">

# AXIS DOC

### Editor de documentos desenvolvido para criação, edição e organização de documentos diretamente no navegador.

<br>

![Status](https://img.shields.io/badge/status-finalizado-185abd?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML5-185abd?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-185abd?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-185abd?style=for-the-badge&logo=javascript&logoColor=white)

</div>

---

## Sobre o projeto

O **AXIS DOC** é uma aplicação web desenvolvida para criação, edição e organização de documentos diretamente no navegador.

O projeto foi construído com foco em uma experiência de utilização semelhante à de editores de documentos tradicionais, mas utilizando uma arquitetura simples baseada exclusivamente em tecnologias do próprio navegador.

A aplicação permite iniciar documentos a partir de modelos predefinidos, editar seu conteúdo e organizar os documentos criados dentro da própria interface.

> [!NOTE]
> O AXIS DOC é um projeto desenvolvido com **HTML, CSS e JavaScript**, sem a utilização de backend, frameworks ou bibliotecas externas para sua estrutura principal.

---

<img width="1895" height="942" alt="image" src="https://github.com/user-attachments/assets/8021166d-b6a4-4fe4-9081-9ee9e07e2b44" />


## Objetivo

O objetivo do AXIS DOC é proporcionar uma experiência simples e organizada para trabalhar com documentos através de uma aplicação web.

Além da utilização prática, o projeto também foi desenvolvido como uma forma de aplicar conceitos de desenvolvimento Front-end em uma aplicação completa, envolvendo:

- Estruturação de páginas;
- Manipulação do DOM;
- Eventos;
- JavaScript no navegador;
- Navegação entre páginas;
- Armazenamento local;
- Gerenciamento de estado;
- Componentização visual;
- Responsividade;
- Acessibilidade;
- Organização de código;
- Interface de edição de documentos.

---

<img width="1898" height="941" alt="image" src="https://github.com/user-attachments/assets/d54fc2df-a0a1-498a-825c-0bb63ff9bac7" />


## Funcionalidades

### Criação de documentos

O AXIS DOC permite iniciar novos documentos através do menu principal.

É possível criar um documento em branco ou utilizar um dos modelos disponíveis na biblioteca de modelos.

---

### Biblioteca de modelos

A aplicação possui **10 modelos de documentos** disponíveis para utilização.

| Modelo | Descrição |
|---|---|
| Documento em branco | Permite iniciar um documento do zero |
| Trabalho acadêmico | Estrutura para trabalhos acadêmicos |
| Relatório | Estrutura para relatórios |
| Currículo | Estrutura para apresentação profissional |
| Carta | Modelo para cartas e comunicações formais |
| Proposta | Estrutura para propostas profissionais e comerciais |
| Ata de reunião | Organização de informações e decisões de reuniões |
| Projeto | Estrutura para planejamento e documentação |
| Orçamento | Organização de valores e informações |
| Documento profissional | Modelo versátil para documentos profissionais |

Cada modelo pode ser selecionado na página **Modelos** e encaminha o usuário diretamente para o editor com a estrutura correspondente.

---

<img width="1900" height="942" alt="image" src="https://github.com/user-attachments/assets/dbdc71ac-5f53-4631-9125-15d93a453667" />


## Editor

O **Edition** é a área responsável pela edição dos documentos.

A partir dele, o usuário pode trabalhar sobre o documento selecionado ou criado.

A página foi desenvolvida para funcionar como o núcleo de edição do AXIS DOC, concentrando as ferramentas necessárias para manipulação do conteúdo.

---

## Organização da aplicação

O AXIS DOC é dividido em diferentes áreas, cada uma responsável por uma função específica.

```text
AXIS DOC
│
├── Menu
│   └── Página principal
│
├── Models
│   └── Biblioteca de modelos
│
├── Edition
│   └── Editor de documentos
│
└── Assets
    └── Recursos visuais da aplicação
