console.log("AXIS DOC — Menu iniciado.");


/* =========================================================
   AXIS DOC — MENU
   Script principal da página Menu

   Responsabilidades:
   - Gerenciar a página inicial
   - Abrir novos documentos
   - Abrir Models
   - Ler documentos salvos
   - Exibir documentos recentes
   - Abrir documentos existentes
   - Excluir documentos
   - Controlar estado vazio
   - Integrar com o armazenamento do Edition
========================================================= */


/* =========================================================
   1. ELEMENTOS DO DOM
========================================================= */

const documentsGrid =
    document.getElementById("documentsGrid");

const emptyDocumentsState =
    document.getElementById("emptyDocumentsState");

const newDocumentButton =
    document.getElementById("newDocumentButton");

const modelsButton =
    document.getElementById("modelsButton");

const viewAllDocumentsButton =
    document.getElementById("viewAllDocumentsButton");

const settingsButton =
    document.getElementById("settingsButton");


/* =========================================================
   2. CONFIGURAÇÕES
========================================================= */

/*
 * Rotas principais da aplicação.
 */

const APP_ROUTES = {

    edition:
        "../Edition/index.html",

    models:
        "../Models/index.html",

    menu:
        "../Menu/index.html"

};


/* =========================================================
   3. ARMAZENAMENTO
========================================================= */

/*
 * IMPORTANTE:
 *
 * Esta chave precisa ser exatamente a mesma utilizada
 * pelo Edition.
 *
 * Edition:
 *
 * axisDoc_documents
 *
 * Menu:
 *
 * axisDoc_documents
 */

const STORAGE_KEY =
    "axisDoc_documents";


/* =========================================================
   4. LEITURA DOS DOCUMENTOS
========================================================= */

/**
 * Obtém o índice de documentos armazenado.
 *
 * @returns {Array}
 */

function getDocuments() {

    const storedDocuments =
        localStorage.getItem(STORAGE_KEY);


    if (!storedDocuments) {

        return [];

    }


    try {

        const documents =
            JSON.parse(storedDocuments);


        if (!Array.isArray(documents)) {

            return [];

        }


        return documents;

    } catch (error) {

        console.error(
            "Não foi possível carregar os documentos.",
            error
        );

        return [];

    }

}


/* =========================================================
   5. FORMATAÇÃO DE DATA E HORA
========================================================= */

/**
 * Converte uma data para o formato brasileiro
 * exibindo dia, mês, ano, hora e minuto.
 *
 * Exemplo:
 *
 * 18/08/2026 • 12:30
 *
 * @param {string|number|Date} date
 * @returns {string}
 */

function formatDocumentDate(date) {

    if (!date) {

        return "Sem data";

    }


    const documentDate =
        new Date(date);


    if (
        Number.isNaN(
            documentDate.getTime()
        )
    ) {

        return "Sem data";

    }


    return documentDate.toLocaleString(
        "pt-BR",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    )
    .replace(
        ",",
        " •"
    );

}


/* =========================================================
   6. CARREGAR DOCUMENTO COMPLETO
========================================================= */

/**
 * Carrega os dados completos de um documento.
 *
 * @param {string} documentId
 * @returns {Object|null}
 */

function getDocumentById(documentId) {

    if (!documentId) {

        return null;

    }


    const storedDocument =
        localStorage.getItem(
            `axisDoc_${documentId}`
        );


    if (!storedDocument) {

        return null;

    }


    try {

        return JSON.parse(
            storedDocument
        );

    } catch (error) {

        console.error(
            "Erro ao ler documento:",
            error
        );

        return null;

    }

}


/* =========================================================
   7. EXCLUSÃO DE DOCUMENTO
========================================================= */

/**
 * Exclui um documento do armazenamento.
 *
 * Remove:
 *
 * - O documento completo
 * - O documento do índice
 *
 * @param {string} documentId
 */

function deleteDocument(documentId) {

    if (!documentId) {

        return;

    }


    /*
     * Confirma a exclusão.
     */

    const confirmed =
        confirm(
            "Tem certeza que deseja excluir este documento?"
        );


    if (!confirmed) {

        return;

    }


    try {

        /*
         * Remove o documento completo.
         */

        localStorage.removeItem(
            `axisDoc_${documentId}`
        );


        /*
         * Recupera o índice atual.
         */

        const documents =
            getDocuments();


        /*
         * Remove o documento do índice.
         */

        const updatedDocuments =
            documents.filter(
                document =>
                    document.id !==
                    documentId
            );


        /*
         * Salva o índice atualizado.
         */

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(
                updatedDocuments
            )
        );


        /*
         * Atualiza a interface.
         */

        renderDocuments();


        console.log(
            "Documento excluído:",
            documentId
        );

    } catch (error) {

        console.error(
            "Não foi possível excluir o documento.",
            error
        );

    }

}


/* =========================================================
   8. CRIAÇÃO DA MINIATURA
========================================================= */

/**
 * Cria a miniatura visual do documento.
 *
 * Não utiliza imagens.
 *
 * @param {Object} documentData
 * @returns {HTMLElement}
 */

function createDocumentThumbnail(documentData) {

    const thumbnail =
        document.createElement("div");

    thumbnail.className =
        "document-thumbnail";


    const page =
        document.createElement("div");

    page.className =
        "document-page";


    /*
     * Tenta obter o conteúdo completo do documento.
     */

    let content =
        "";


    if (documentData) {

        if (
            documentData.pages &&
            documentData.pages.length > 0
        ) {

            content =
                documentData.pages[0].content || "";

        } else if (
            documentData.content
        ) {

            content =
                documentData.content;

        }

    }


    /*
     * Cria uma prévia textual.
     */

    if (content) {

        const preview =
            document.createElement("div");

        preview.className =
            "document-preview";


        /*
         * innerHTML não é utilizado aqui.
         *
         * O conteúdo é transformado em texto para que
         * a miniatura não execute ou interprete HTML.
         */

        const temporaryElement =
            document.createElement("div");

        temporaryElement.innerHTML =
            content;


        preview.textContent =
            temporaryElement.innerText;


        page.appendChild(
            preview
        );

    }


    thumbnail.appendChild(
        page
    );


    return thumbnail;

}


/* =========================================================
   9. CRIAÇÃO DO CARD
========================================================= */

/**
 * Cria um card de documento.
 *
 * @param {Object} documentData
 * @returns {HTMLElement}
 */

function createDocumentCard(documentData) {

    const card =
        document.createElement("article");

    card.className =
        "document-card";


    card.dataset.documentId =
        documentData.id;


    /* -----------------------------------------------------
       Documento completo
    ------------------------------------------------------ */

    const fullDocument =
        getDocumentById(
            documentData.id
        );


    /* -----------------------------------------------------
       Miniatura
    ------------------------------------------------------ */

    const thumbnail =
        createDocumentThumbnail(
            fullDocument
        );


    /* -----------------------------------------------------
       Informações
    ------------------------------------------------------ */

    const information =
        document.createElement("div");

    information.className =
        "document-info";


    /* -----------------------------------------------------
       Nome
    ------------------------------------------------------ */

    const name =
        document.createElement("span");

    name.className =
        "document-name";

    name.textContent =
        documentData.title ||
        "Documento sem título";


    /* -----------------------------------------------------
       Data e hora
    ------------------------------------------------------ */

    const date =
        document.createElement("span");

    date.className =
        "document-date";

    date.textContent =
        formatDocumentDate(
            documentData.updatedAt
        );


    /* -----------------------------------------------------
       Botão de exclusão
    ------------------------------------------------------ */

    const deleteButton =
        document.createElement("button");

    deleteButton.type =
        "button";

    deleteButton.className =
        "delete-document-button";

    deleteButton.textContent =
        "Excluir";


    /* -----------------------------------------------------
       Evento de exclusão
    ------------------------------------------------------ */

    deleteButton.addEventListener(
        "click",
        event => {

            /*
             * Impede o clique de chegar ao card.
             *
             * Caso contrário, o documento poderia ser
             * aberto ao mesmo tempo em que seria excluído.
             */

            event.stopPropagation();


            deleteDocument(
                documentData.id
            );

        }
    );


    /* -----------------------------------------------------
       Montagem das informações
    ------------------------------------------------------ */

    information.appendChild(
        name
    );

    information.appendChild(
        date
    );

    information.appendChild(
        deleteButton
    );


    /* -----------------------------------------------------
       Montagem do card
    ------------------------------------------------------ */

    card.appendChild(
        thumbnail
    );

    card.appendChild(
        information
    );


    /* -----------------------------------------------------
       Acessibilidade
    ------------------------------------------------------ */

    card.setAttribute(
        "role",
        "button"
    );

    card.setAttribute(
        "tabindex",
        "0"
    );


    /* -----------------------------------------------------
       Clique
    ------------------------------------------------------ */

    card.addEventListener(
        "click",
        () => {

            openDocument(
                documentData.id
            );

        }
    );


    /* -----------------------------------------------------
       Teclado
    ------------------------------------------------------ */

    card.addEventListener(
        "keydown",
        event => {

            /*
             * Se o foco estiver no botão de exclusão,
             * o comportamento do card não deve ser executado.
             */

            if (
                event.target ===
                deleteButton
            ) {

                return;

            }


            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openDocument(
                    documentData.id
                );

            }

        }
    );


    return card;

}


/* =========================================================
   10. ESTADO VAZIO
========================================================= */

/**
 * Controla o estado vazio.
 *
 * @param {boolean} hasDocuments
 */

function updateEmptyState(hasDocuments) {

    if (!emptyDocumentsState) {

        return;

    }


    emptyDocumentsState.hidden =
        hasDocuments;

}


/* =========================================================
   11. RENDERIZAÇÃO
========================================================= */

/**
 * Renderiza os documentos salvos.
 */

function renderDocuments() {

    if (!documentsGrid) {

        return;

    }


    const documents =
        getDocuments();


    /* -----------------------------------------------------
       Remove cards anteriores
    ------------------------------------------------------ */

    const existingCards =
        documentsGrid.querySelectorAll(
            ".document-card"
        );


    existingCards.forEach(
        card => {

            card.remove();

        }
    );


    /* -----------------------------------------------------
       Atualiza estado vazio
    ------------------------------------------------------ */

    updateEmptyState(
        documents.length > 0
    );


    if (documents.length === 0) {

        return;

    }


    /* -----------------------------------------------------
       Ordena documentos
       Mais recentemente atualizado primeiro.
    ------------------------------------------------------ */

    documents.sort(
        (a, b) => {

            return new Date(
                b.updatedAt
            ) - new Date(
                a.updatedAt
            );

        }
    );


    /* -----------------------------------------------------
       Cria os cards
    ------------------------------------------------------ */

    documents.forEach(
        documentData => {

            const card =
                createDocumentCard(
                    documentData
                );


            documentsGrid.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   12. NOVO DOCUMENTO
========================================================= */

function createNewDocument() {

    window.location.href =
        APP_ROUTES.edition;

}


/* =========================================================
   13. MODELOS
========================================================= */

function openModels() {

    window.location.href =
        APP_ROUTES.models;

}


/* =========================================================
   14. ABRIR DOCUMENTO
========================================================= */

/**
 * Abre um documento existente na Edition.
 *
 * @param {string} documentId
 */

function openDocument(documentId) {

    if (!documentId) {

        return;

    }


    const url =
        `${APP_ROUTES.edition}?id=${encodeURIComponent(documentId)}`;


    window.location.href =
        url;

}


/* =========================================================
   15. VER TODOS
========================================================= */

function viewAllDocuments() {

    console.info(
        "A visualização completa dos documentos será implementada posteriormente."
    );

}


/* =========================================================
   16. CONFIGURAÇÕES
========================================================= */

function openSettings() {

    console.info(
        "As configurações do AXIS DOC serão implementadas posteriormente."
    );

}


/* =========================================================
   17. EVENTOS
========================================================= */

if (newDocumentButton) {

    newDocumentButton.addEventListener(
        "click",
        createNewDocument
    );

}


if (modelsButton) {

    modelsButton.addEventListener(
        "click",
        openModels
    );

}


if (viewAllDocumentsButton) {

    viewAllDocumentsButton.addEventListener(
        "click",
        viewAllDocuments
    );

}


if (settingsButton) {

    settingsButton.addEventListener(
        "click",
        openSettings
    );

}


/* =========================================================
   18. ATUALIZAÇÃO AUTOMÁTICA
========================================================= */

/*
 * Caso o usuário volte para o Menu utilizando o botão
 * "Voltar" do navegador, o Menu será atualizado.
 */

window.addEventListener(
    "pageshow",
    () => {

        renderDocuments();

    }
);


/*
 * Também observa alterações no localStorage feitas
 * por outra página do mesmo domínio.
 */

window.addEventListener(
    "storage",
    event => {

        if (
            event.key === STORAGE_KEY
        ) {

            renderDocuments();

        }

    }
);


/* =========================================================
   19. INICIALIZAÇÃO
========================================================= */

function initializeMenu() {

    renderDocuments();

}


initializeMenu();
