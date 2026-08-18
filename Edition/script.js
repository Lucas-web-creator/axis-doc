/* =========================================================
   AXIS DOC — EDITION
   JavaScript principal do editor de documentos
========================================================= */


/* =========================================================
   1. CONFIGURAÇÕES
========================================================= */

const STORAGE_INDEX_KEY =
    "axisDoc_documents";


const APP_ROUTES = {

    menu:
        "../Menu/index.html"

};


/* =========================================================
   2. ESTADO DA APLICAÇÃO
========================================================= */

const editorState = {

    documentId: null,

    title:
        "Documento sem título",

    currentPage:
        1,

    totalPages:
        1,

    zoom:
        100,

    saved:
        true,

    wordCount:
        0,

    characterCount:
        0,

    selectedTable:
        null

};


/* =========================================================
   3. ELEMENTOS DO DOM
========================================================= */

const elements = {

    documentTitle:
        document.getElementById("documentTitle"),

    documentStatus:
        document.getElementById("documentStatus"),

    saveStatus:
        document.getElementById("saveStatus"),


    /* -----------------------------------------------------
       Ações
    ------------------------------------------------------ */

    saveButton:
        document.getElementById("saveDocumentButton"),

    printButton:
        document.getElementById("printDocumentButton"),

    pdfButton:
        document.getElementById("exportPdfButton"),


    /* -----------------------------------------------------
       Navegação
    ------------------------------------------------------ */

    menuButton:
        document.getElementById("menuButton") ||
        document.getElementById("backToMenuButton") ||
        document.getElementById("returnToMenuButton"),


    /* -----------------------------------------------------
       Formatação
    ------------------------------------------------------ */

    undoButton:
        document.getElementById("undoButton"),

    redoButton:
        document.getElementById("redoButton"),

    boldButton:
        document.getElementById("boldButton"),

    italicButton:
        document.getElementById("italicButton"),

    underlineButton:
        document.getElementById("underlineButton"),

    fontFamily:
        document.getElementById("fontFamily"),

    fontSize:
        document.getElementById("fontSize"),

    textColor:
        document.getElementById("textColor"),

    highlightColor:
        document.getElementById("highlightColor"),


    /* -----------------------------------------------------
       Alinhamento
    ------------------------------------------------------ */

    alignLeftButton:
        document.getElementById("alignLeftButton"),

    alignCenterButton:
        document.getElementById("alignCenterButton"),

    alignRightButton:
        document.getElementById("alignRightButton"),

    justifyButton:
        document.getElementById("justifyButton"),


    /* -----------------------------------------------------
       Listas
    ------------------------------------------------------ */

    unorderedListButton:
        document.getElementById("unorderedListButton"),

    orderedListButton:
        document.getElementById("orderedListButton"),


    /* -----------------------------------------------------
       Tabelas
    ------------------------------------------------------ */

    createTableButton:
        document.getElementById("createTableButton") ||
        document.getElementById("insertTableButton") ||
        document.getElementById("tableButton"),

    addRowButton:
        document.getElementById("addRowButton") ||
        document.getElementById("insertRowButton") ||
        document.getElementById("addTableRowButton"),


    /* -----------------------------------------------------
       Inserção
    ------------------------------------------------------ */

    imageButton:
        document.getElementById("imageButton") ||
        document.getElementById("insertImageButton") ||
        document.getElementById("addImageButton"),

    lineButton:
        document.getElementById("lineButton") ||
        document.getElementById("insertLineButton") ||
        document.getElementById("horizontalLineButton"),

    newPageButton:
        document.getElementById("newPageButton") ||
        document.getElementById("createPageButton"),

    pageBreakButton:
        document.getElementById("pageBreakButton") ||
        document.getElementById("insertPageBreakButton"),


    /* -----------------------------------------------------
       Páginas
    ------------------------------------------------------ */

    pagesContainer:
        document.getElementById("documentPages"),

    pageThumbnails:
        document.getElementById("pageThumbnails"),

    addPageButton:
        document.getElementById("addPageButton"),

    pageCount:
        document.getElementById("pageCount"),


    /* -----------------------------------------------------
       Zoom
    ------------------------------------------------------ */

    zoomInButton:
        document.getElementById("zoomInButton"),

    zoomOutButton:
        document.getElementById("zoomOutButton"),

    zoomValue:
        document.getElementById("zoomValue"),

    footerZoomValue:
        document.getElementById("footerZoomValue"),


    /* -----------------------------------------------------
       Estatísticas
    ------------------------------------------------------ */

    wordCount:
        document.getElementById("wordCount"),

    characterCount:
        document.getElementById("characterCount")

};


/* =========================================================
   4. UTILITÁRIOS
========================================================= */

function getPages() {

    return Array.from(
        document.querySelectorAll(
            ".document-page-editor"
        )
    );

}


function getEditableAreas() {

    return Array.from(
        document.querySelectorAll(
            ".page-content"
        )
    );

}


function getCurrentPageContent() {

    const pages =
        getEditableAreas();


    return (
        pages[editorState.currentPage - 1] ||
        null
    );

}


/* =========================================================
   5. TÍTULO
========================================================= */

function updateDocumentTitle() {

    if (!elements.documentTitle) {

        return;

    }


    const title =
        elements.documentTitle.value.trim();


    editorState.title =
        title ||
        "Documento sem título";


    markAsUnsaved();

}


/* =========================================================
   6. ESTADO DE SALVAMENTO
========================================================= */

function markAsUnsaved() {

    editorState.saved =
        false;


    if (elements.saveStatus) {

        elements.saveStatus.textContent =
            "Alterações não salvas";

        elements.saveStatus.classList.add(
            "unsaved"
        );

        elements.saveStatus.classList.remove(
            "error"
        );

    }


    if (elements.documentStatus) {

        elements.documentStatus.textContent =
            "Alterações não salvas";

    }

}


function markAsSaved() {

    editorState.saved =
        true;


    if (elements.saveStatus) {

        elements.saveStatus.textContent =
            "Salvo";

        elements.saveStatus.classList.remove(
            "unsaved",
            "error"
        );

    }


    if (elements.documentStatus) {

        elements.documentStatus.textContent =
            "Salvo";

    }

}


/* =========================================================
   7. ESTATÍSTICAS
========================================================= */

function updateDocumentStatistics() {

    const editableAreas =
        getEditableAreas();


    const text =
        editableAreas
            .map(
                area =>
                    area.innerText
            )
            .join(" ")
            .trim();


    editorState.characterCount =
        text.length;


    editorState.wordCount =
        text
            ? text
                .split(/\s+/)
                .filter(Boolean)
                .length
            : 0;


    if (elements.wordCount) {

        elements.wordCount.textContent =
            `${editorState.wordCount} palavras`;

    }


    if (elements.characterCount) {

        elements.characterCount.textContent =
            `${editorState.characterCount} caracteres`;

    }

}


/* =========================================================
   8. COMANDOS DO EDITOR
========================================================= */

function executeCommand(
    command,
    value = null
) {

    const editor =
        getCurrentPageContent();


    if (!editor) {

        return;

    }


    editor.focus();


    document.execCommand(
        command,
        false,
        value
    );


    markAsUnsaved();

    updateDocumentStatistics();

    updateToolbarState();

}


/* =========================================================
   9. HISTÓRICO
========================================================= */

function undo() {

    executeCommand(
        "undo"
    );

}


function redo() {

    executeCommand(
        "redo"
    );

}


/* =========================================================
   10. FORMATAÇÃO
========================================================= */

function toggleBold() {

    executeCommand(
        "bold"
    );

}


function toggleItalic() {

    executeCommand(
        "italic"
    );

}


function toggleUnderline() {

    executeCommand(
        "underline"
    );

}


/* =========================================================
   11. FONTE
========================================================= */

function changeFontFamily(event) {

    executeCommand(
        "fontName",
        event.target.value
    );

}


function changeFontSize(event) {

    executeCommand(
        "fontSize",
        event.target.value
    );

}


/* =========================================================
   12. CORES
========================================================= */

function changeTextColor(event) {

    executeCommand(
        "foreColor",
        event.target.value
    );

}


function changeHighlightColor(event) {

    executeCommand(
        "hiliteColor",
        event.target.value
    );

}


/* =========================================================
   13. ALINHAMENTO
========================================================= */

function alignLeft() {

    executeCommand(
        "justifyLeft"
    );

}


function alignCenter() {

    executeCommand(
        "justifyCenter"
    );

}


function alignRight() {

    executeCommand(
        "justifyRight"
    );

}


function justifyText() {

    executeCommand(
        "justifyFull"
    );

}


/* =========================================================
   14. LISTAS
========================================================= */

function createUnorderedList() {

    executeCommand(
        "insertUnorderedList"
    );

}


function createOrderedList() {

    executeCommand(
        "insertOrderedList"
    );

}


/* =========================================================
   15. ESTADO DA BARRA
========================================================= */

function updateToolbarState() {

    const commands = {

        bold:
            elements.boldButton,

        italic:
            elements.italicButton,

        underline:
            elements.underlineButton

    };


    Object.entries(commands).forEach(
        ([command, button]) => {

            if (!button) {

                return;

            }


            const active =
                document.queryCommandState(
                    command
                );


            button.classList.toggle(
                "active",
                active
            );

        }
    );

}


/* =========================================================
   16. TABELAS
========================================================= */

/*
 * Cria uma tabela padrão 3x3.
 *
 * A tabela é inserida diretamente na área editável.
 */

function createTable() {

    const editor =
        getCurrentPageContent();


    if (!editor) {

        return;

    }


    editor.focus();


    const table =
        document.createElement("table");

    table.className =
        "editor-table";


    const tbody =
        document.createElement("tbody");


    const rows =
        3;

    const columns =
        3;


    for (
        let rowIndex = 0;
        rowIndex < rows;
        rowIndex++
    ) {

        const row =
            document.createElement("tr");


        for (
            let columnIndex = 0;
            columnIndex < columns;
            columnIndex++
        ) {

            const cell =
                document.createElement(
                    "td"
                );


            cell.innerHTML =
                "&nbsp;";


            row.appendChild(
                cell
            );

        }


        tbody.appendChild(
            row
        );

    }


    table.appendChild(
        tbody
    );


    /*
     * Insere a tabela na posição atual do cursor.
     */

    const selection =
        window.getSelection();


    if (
        selection &&
        selection.rangeCount > 0
    ) {

        const range =
            selection.getRangeAt(0);


        if (
            editor.contains(
                range.commonAncestorContainer
            )
        ) {

            range.deleteContents();

            range.insertNode(
                table
            );

        } else {

            editor.appendChild(
                table
            );

        }

    } else {

        editor.appendChild(
            table
        );

    }


    /*
     * Cria uma área de texto depois da tabela
     * para facilitar a continuação da edição.
     */

    const paragraph =
        document.createElement("p");

    paragraph.innerHTML =
        "<br>";


    table.after(
        paragraph
    );


    /*
     * A tabela recém-criada passa a ser a tabela selecionada.
     */

    selectTable(
        table
    );


    attachTableEvents(
        table
    );


    markAsUnsaved();

    updateDocumentStatistics();

}


/* =========================================================
   17. SELEÇÃO DE TABELA
========================================================= */

function selectTable(table) {

    if (!table) {

        return;

    }


    /*
     * Remove seleção anterior.
     */

    document
        .querySelectorAll(
            ".editor-table.selected-table"
        )
        .forEach(
            previousTable => {

                previousTable.classList.remove(
                    "selected-table"
                );

            }
        );


    /*
     * Seleciona a nova tabela.
     */

    table.classList.add(
        "selected-table"
    );


    editorState.selectedTable =
        table;

}


/* =========================================================
   18. EVENTOS DAS TABELAS
========================================================= */

function attachTableEvents(table) {

    if (!table) {

        return;

    }


    /*
     * Evita adicionar o mesmo evento várias vezes.
     */

    if (
        table.dataset.eventsAttached ===
        "true"
    ) {

        return;

    }


    table.dataset.eventsAttached =
        "true";


    table.addEventListener(
        "click",
        event => {

            const clickedTable =
                event.target.closest(
                    "table"
                );


            if (clickedTable) {

                selectTable(
                    clickedTable
                );

            }

        }
    );


    /*
     * Qualquer alteração dentro da tabela
     * marca o documento como alterado.
     */

    table.addEventListener(
        "input",
        () => {

            markAsUnsaved();

            updateDocumentStatistics();

        }
    );

}


/* =========================================================
   19. ATIVAR EVENTOS DAS TABELAS EXISTENTES
========================================================= */

function initializeTables() {

    const tables =
        document.querySelectorAll(
            ".editor-table"
        );


    tables.forEach(
        table => {

            attachTableEvents(
                table
            );

        }
    );

}


/* =========================================================
   20. ADICIONAR LINHA
========================================================= */

function addTableRow() {

    let table =
        editorState.selectedTable;


    /*
     * Caso nenhuma tabela esteja selecionada,
     * tenta encontrar a tabela mais próxima do cursor.
     */

    if (!table) {

        const selection =
            window.getSelection();


        if (
            selection &&
            selection.rangeCount > 0
        ) {

            let node =
                selection.anchorNode;


            if (
                node &&
                node.nodeType ===
                Node.TEXT_NODE
            ) {

                node =
                    node.parentElement;

            }


            if (node) {

                table =
                    node.closest(
                        "table"
                    );

            }

        }

    }


    if (!table) {

        alert(
            "Selecione uma tabela antes de adicionar uma linha."
        );

        return;

    }


    const tbody =
        table.tBodies[0] ||
        table.createTBody();


    const firstRow =
        tbody.rows[0];


    if (!firstRow) {

        return;

    }


    const columnCount =
        firstRow.cells.length;


    const newRow =
        document.createElement(
            "tr"
        );


    for (
        let index = 0;
        index < columnCount;
        index++
    ) {

        const cell =
            document.createElement(
                "td"
            );


        cell.innerHTML =
            "&nbsp;";


        newRow.appendChild(
            cell
        );

    }


    tbody.appendChild(
        newRow
    );


    selectTable(
        table
    );


    markAsUnsaved();

    updateDocumentStatistics();

}


/* =========================================================
   21. INSERÇÃO DE IMAGEM
========================================================= */

/*
 * Abre o seletor de arquivos e insere a imagem
 * na posição atual do cursor.
 *
 * A imagem é armazenada como Data URL dentro
 * do próprio conteúdo do documento.
 */

function insertImage() {

    const editor =
        getCurrentPageContent();


    if (!editor) {

        return;

    }


    const input =
        document.createElement(
            "input"
        );


    input.type =
        "file";

    input.accept =
        "image/*";


    input.style.display =
        "none";


    document.body.appendChild(
        input
    );


    input.addEventListener(
        "change",
        event => {

            const file =
                event.target.files[0];


            if (!file) {

                input.remove();

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                loadEvent => {

                    const image =
                        document.createElement(
                            "img"
                        );


                    image.src =
                        loadEvent.target.result;


                    image.alt =
                        "Imagem inserida no documento";


                    image.style.maxWidth =
                        "100%";


                    image.style.height =
                        "auto";


                    image.style.display =
                        "block";


                    image.style.margin =
                        "12px 0";


                    editor.focus();


                    const selection =
                        window.getSelection();


                    if (
                        selection &&
                        selection.rangeCount > 0
                    ) {

                        const range =
                            selection.getRangeAt(0);


                        if (
                            editor.contains(
                                range.commonAncestorContainer
                            )
                        ) {

                            range.deleteContents();

                            range.insertNode(
                                image
                            );


                            range.setStartAfter(
                                image
                            );

                            range.collapse(
                                true
                            );


                            selection.removeAllRanges();

                            selection.addRange(
                                range
                            );

                        } else {

                            editor.appendChild(
                                image
                            );

                        }

                    } else {

                        editor.appendChild(
                            image
                        );

                    }


                    markAsUnsaved();

                    updateDocumentStatistics();

                    input.remove();

                };


            reader.readAsDataURL(
                file
            );

        }
    );


    input.click();

}


/* =========================================================
   22. INSERÇÃO DE LINHA
========================================================= */

/*
 * Insere uma linha horizontal na posição atual
 * do cursor.
 */

function insertHorizontalLine() {

    const editor =
        getCurrentPageContent();


    if (!editor) {

        return;

    }


    editor.focus();


    const line =
        document.createElement(
            "hr"
        );


    line.className =
        "editor-horizontal-line";


    const selection =
        window.getSelection();


    if (
        selection &&
        selection.rangeCount > 0
    ) {

        const range =
            selection.getRangeAt(0);


        if (
            editor.contains(
                range.commonAncestorContainer
            )
        ) {

            range.deleteContents();

            range.insertNode(
                line
            );


            const paragraph =
                document.createElement(
                    "p"
                );


            paragraph.innerHTML =
                "<br>";


            line.after(
                paragraph
            );


            const newRange =
                document.createRange();


            newRange.setStart(
                paragraph,
                0
            );


            newRange.collapse(
                true
            );


            selection.removeAllRanges();

            selection.addRange(
                newRange
            );

        } else {

            editor.appendChild(
                line
            );

        }

    } else {

        editor.appendChild(
            line
        );

    }


    markAsUnsaved();

    updateDocumentStatistics();

}


/* =========================================================
   23. NÚMEROS DAS PÁGINAS
========================================================= */

function updatePageNumbers() {

    const pages =
        getPages();


    pages.forEach(
        (page, index) => {

            const number =
                page.querySelector(
                    ".page-number"
                );


            if (number) {

                number.textContent =
                    index + 1;

            }


            page.dataset.page =
                index + 1;

        }
    );


    editorState.totalPages =
        pages.length;


    if (elements.pageCount) {

        elements.pageCount.textContent =
            editorState.totalPages;

    }

}


/* =========================================================
   24. MINIATURAS
========================================================= */

function createPageThumbnail(
    pageNumber
) {

    if (!elements.pageThumbnails) {

        return;

    }


    const thumbnail =
        document.createElement(
            "button"
        );

    thumbnail.type =
        "button";

    thumbnail.className =
        "page-thumbnail";


    thumbnail.dataset.page =
        pageNumber;


    const number =
        document.createElement(
            "span"
        );

    number.className =
        "page-thumbnail-number";


    number.textContent =
        pageNumber;


    const preview =
        document.createElement(
            "span"
        );

    preview.className =
        "page-thumbnail-preview";


    thumbnail.appendChild(
        number
    );

    thumbnail.appendChild(
        preview
    );


    thumbnail.addEventListener(
        "click",
        () => {

            selectPage(
                pageNumber
            );

        }
    );


    elements.pageThumbnails.appendChild(
        thumbnail
    );

}


function updatePageThumbnails() {

    if (!elements.pageThumbnails) {

        return;

    }


    elements.pageThumbnails.innerHTML =
        "";


    for (
        let page = 1;
        page <= editorState.totalPages;
        page++
    ) {

        createPageThumbnail(
            page
        );

    }


    selectPage(
        editorState.currentPage
    );

}


/* =========================================================
   25. SELEÇÃO DE PÁGINA
========================================================= */

function selectPage(
    pageNumber
) {

    const pages =
        getPages();


    const thumbnails =
        document.querySelectorAll(
            ".page-thumbnail"
        );


    if (
        pageNumber < 1 ||
        pageNumber > pages.length
    ) {

        return;

    }


    editorState.currentPage =
        pageNumber;


    pages.forEach(
        (page, index) => {

            page.classList.toggle(
                "active-page",
                index + 1 === pageNumber
            );

        }
    );


    thumbnails.forEach(
        (thumbnail, index) => {

            thumbnail.classList.toggle(
                "active",
                index + 1 === pageNumber
            );

        }
    );


    const selectedPage =
        pages[
            pageNumber - 1
        ];


    if (selectedPage) {

        selectedPage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    updateDocumentStatistics();

}


/* =========================================================
   26. ZOOM
========================================================= */

function updateZoom() {

    const value =
        editorState.zoom;


    if (elements.zoomValue) {

        elements.zoomValue.textContent =
            `${value}%`;

    }


    if (elements.footerZoomValue) {

        elements.footerZoomValue.textContent =
            `${value}%`;

    }


    const pages =
        document.querySelectorAll(
            ".document-page-editor"
        );


    pages.forEach(
        page => {

            page.style.transform =
                `scale(${value / 100})`;

            page.style.transformOrigin =
                "top center";

        }
    );

}


function zoomIn() {

    editorState.zoom =
        Math.min(
            editorState.zoom + 10,
            200
        );


    updateZoom();

}


function zoomOut() {

    editorState.zoom =
        Math.max(
            editorState.zoom - 10,
            50
        );


    updateZoom();

}


/* =========================================================
   27. CRIAÇÃO DE PÁGINA
========================================================= */

function createPage() {

    if (!elements.pagesContainer) {

        return;

    }


    editorState.totalPages++;


    const pageNumber =
        editorState.totalPages;


    const page =
        document.createElement(
            "article"
        );

    page.className =
        "document-page-editor";


    page.dataset.page =
        pageNumber;


    /* -----------------------------------------------------
       Cabeçalho
    ------------------------------------------------------ */

    const header =
        document.createElement(
            "header"
        );

    header.className =
        "document-page-header";


    const headerContent =
        document.createElement(
            "div"
        );

    headerContent.className =
        "page-header-content";

    headerContent.contentEditable =
        "true";


    headerContent.dataset.placeholder =
        "Cabeçalho";


    header.appendChild(
        headerContent
    );


    /* -----------------------------------------------------
       Conteúdo
    ------------------------------------------------------ */

    const content =
        document.createElement(
            "div"
        );

    content.className =
        "page-content";

    content.contentEditable =
        "true";


    content.dataset.placeholder =
        "Comece a escrever aqui...";


    /* -----------------------------------------------------
       Rodapé
    ------------------------------------------------------ */

    const footer =
        document.createElement(
            "footer"
        );

    footer.className =
        "document-page-footer";


    const footerContent =
        document.createElement(
            "div"
        );

    footerContent.className =
        "page-footer-content";

    footerContent.contentEditable =
        "true";


    footerContent.dataset.placeholder =
        "Rodapé";


    const pageNumberElement =
        document.createElement(
            "span"
        );

    pageNumberElement.className =
        "page-number";

    pageNumberElement.textContent =
        pageNumber;


    footer.appendChild(
        footerContent
    );

    footer.appendChild(
        pageNumberElement
    );


    /* -----------------------------------------------------
       Montagem
    ------------------------------------------------------ */

    page.appendChild(
        header
    );

    page.appendChild(
        content
    );

    page.appendChild(
        footer
    );


    elements.pagesContainer.appendChild(
        page
    );


    attachEditorEvents(
        content
    );

    attachEditorEvents(
        headerContent
    );

    attachEditorEvents(
        footerContent
    );


    updatePageNumbers();


    createPageThumbnail(
        pageNumber
    );


    selectPage(
        pageNumber
    );


    markAsUnsaved();

}


/* =========================================================
   28. QUEBRA DE PÁGINA
========================================================= */

/*
 * Cria uma nova página no ponto em que o cursor está.
 *
 * O conteúdo anterior permanece na página atual.
 * O restante do conteúdo depois do cursor é transferido
 * para a nova página.
 */

function insertPageBreak() {

    const currentPage =
        getPages()[
            editorState.currentPage - 1
        ];


    const editor =
        getCurrentPageContent();


    if (
        !currentPage ||
        !editor
    ) {

        return;

    }


    const selection =
        window.getSelection();


    if (
        !selection ||
        selection.rangeCount === 0
    ) {

        createPage();

        return;

    }


    const range =
        selection.getRangeAt(0);


    if (
        !editor.contains(
            range.commonAncestorContainer
        )
    ) {

        createPage();

        return;

    }


    /*
     * Cria a nova página normalmente.
     */

    const oldTotalPages =
        editorState.totalPages;


    createPage();


    const newPage =
        getPages()[
            oldTotalPages
        ];


    if (!newPage) {

        return;

    }


    const newContent =
        newPage.querySelector(
            ".page-content"
        );


    /*
     * Se não houver conteúdo depois do cursor,
     * a nova página simplesmente permanece vazia.
     */

    const afterRange =
        document.createRange();


    afterRange.setStart(
        range.endContainer,
        range.endOffset
    );


    afterRange.setEnd(
        editor,
        editor.childNodes.length
    );


    const fragment =
        afterRange.extractContents();


    if (fragment.textContent.trim() ||
        fragment.querySelector("*")) {

        newContent.appendChild(
            fragment
        );

    }


    /*
     * Coloca o cursor no começo da nova página.
     */

    newContent.focus();


    const newRange =
        document.createRange();


    newRange.selectNodeContents(
        newContent
    );


    newRange.collapse(
        true
    );


    selection.removeAllRanges();

    selection.addRange(
        newRange
    );


    selectPage(
        oldTotalPages + 1
    );


    markAsUnsaved();

    updateDocumentStatistics();

}


/* =========================================================
   29. COLETA DOS DADOS
========================================================= */

function collectDocumentData() {

    const pages =
        getPages();


    return {

        id:
            editorState.documentId,

        title:
            editorState.title,

        updatedAt:
            new Date().toISOString(),

        currentPage:
            editorState.currentPage,

        zoom:
            editorState.zoom,

        pages:
            pages.map(
                page => {

                    const content =
                        page.querySelector(
                            ".page-content"
                        );


                    const header =
                        page.querySelector(
                            ".page-header-content"
                        );


                    const footer =
                        page.querySelector(
                            ".page-footer-content"
                        );


                    return {

                        content:
                            content
                                ? content.innerHTML
                                : "",

                        header:
                            header
                                ? header.innerHTML
                                : "",

                        footer:
                            footer
                                ? footer.innerHTML
                                : ""

                    };

                }
            )

    };

}


/* =========================================================
   30. ID DO DOCUMENTO
========================================================= */

function generateDocumentId() {

    return (

        Date.now().toString(36) +

        "-" +

        Math.random()
            .toString(36)
            .substring(2, 9)

    );

}


/* =========================================================
   31. ÍNDICE DE DOCUMENTOS
========================================================= */

function updateDocumentsIndex(
    documentData
) {

    let documents =
        [];


    try {

        const stored =
            localStorage.getItem(
                STORAGE_INDEX_KEY
            );


        if (stored) {

            const parsed =
                JSON.parse(
                    stored
                );


            if (
                Array.isArray(
                    parsed
                )
            ) {

                documents =
                    parsed;

            }

        }

    } catch (error) {

        console.error(
            "Erro ao ler índice:",
            error
        );

    }


    const existingIndex =
        documents.findIndex(
            document =>
                document.id ===
                documentData.id
        );


    const summary = {

        id:
            documentData.id,

        title:
            documentData.title,

        updatedAt:
            documentData.updatedAt

    };


    if (
        existingIndex >= 0
    ) {

        documents[
            existingIndex
        ] =
            summary;

    } else {

        documents.unshift(
            summary
        );

    }


    /*
     * Mais recentes primeiro.
     */

    documents.sort(
        (a, b) => {

            return new Date(
                b.updatedAt
            ) - new Date(
                a.updatedAt
            );

        }
    );


    localStorage.setItem(
        STORAGE_INDEX_KEY,
        JSON.stringify(
            documents
        )
    );

}


/* =========================================================
   32. SALVAMENTO
========================================================= */

function saveDocument() {

    try {

        if (!editorState.documentId) {

            editorState.documentId =
                generateDocumentId();

        }


        const documentData =
            collectDocumentData();


        /*
         * Salva o documento completo.
         */

        localStorage.setItem(

            `axisDoc_${documentData.id}`,

            JSON.stringify(
                documentData
            )

        );


        /*
         * Atualiza o índice.
         *
         * É esta informação que o Menu utiliza.
         */

        updateDocumentsIndex(
            documentData
        );


        markAsSaved();


        console.log(
            "Documento salvo:",
            documentData
        );


        return true;

    } catch (error) {

        console.error(
            "Erro ao salvar documento:",
            error
        );


        if (elements.saveStatus) {

            elements.saveStatus.textContent =
                "Erro ao salvar";

            elements.saveStatus.classList.add(
                "error"
            );

        }


        return false;

    }

}


/* =========================================================
   33. CARREGAMENTO
========================================================= */

function loadDocument(
    documentId
) {

    try {

        const stored =
            localStorage.getItem(
                `axisDoc_${documentId}`
            );


        if (!stored) {

            console.warn(
                "Documento não encontrado."
            );


            initializeNewDocument();

            return;

        }


        const documentData =
            JSON.parse(
                stored
            );


        editorState.documentId =
            documentData.id;


        editorState.title =
            documentData.title ||
            "Documento sem título";


        editorState.zoom =
            documentData.zoom ||
            100;


        if (elements.documentTitle) {

            elements.documentTitle.value =
                editorState.title;

        }


        if (elements.pagesContainer) {

            elements.pagesContainer.innerHTML =
                "";

        }


        if (elements.pageThumbnails) {

            elements.pageThumbnails.innerHTML =
                "";

        }


        editorState.totalPages =
            0;


        editorState.selectedTable =
            null;


        /*
         * Reconstrói as páginas.
         */

        if (
            documentData.pages &&
            documentData.pages.length
        ) {

            documentData.pages.forEach(
                pageData => {

                    createPageFromData(
                        pageData
                    );

                }
            );

        } else {

            createPage();

        }


        updatePageNumbers();


        editorState.currentPage =
            documentData.currentPage ||
            1;


        if (
            editorState.currentPage >
            editorState.totalPages
        ) {

            editorState.currentPage =
                1;

        }


        selectPage(
            editorState.currentPage
        );


        updateZoom();

        updateDocumentStatistics();

        initializeTables();

        markAsSaved();


        console.log(
            "Documento carregado:",
            documentData
        );

    } catch (error) {

        console.error(
            "Erro ao carregar documento:",
            error
        );


        initializeNewDocument();

    }

}


/* =========================================================
   34. CRIAR PÁGINA A PARTIR DE DADOS
========================================================= */

function createPageFromData(
    pageData
) {

    editorState.totalPages++;


    const pageNumber =
        editorState.totalPages;


    const page =
        document.createElement(
            "article"
        );

    page.className =
        "document-page-editor";


    page.dataset.page =
        pageNumber;


    /* -----------------------------------------------------
       Cabeçalho
    ------------------------------------------------------ */

    const header =
        document.createElement(
            "header"
        );

    header.className =
        "document-page-header";


    const headerContent =
        document.createElement(
            "div"
        );

    headerContent.className =
        "page-header-content";

    headerContent.contentEditable =
        "true";


    headerContent.innerHTML =
        pageData.header || "";


    header.appendChild(
        headerContent
    );


    /* -----------------------------------------------------
       Conteúdo
    ------------------------------------------------------ */

    const content =
        document.createElement(
            "div"
        );

    content.className =
        "page-content";

    content.contentEditable =
        "true";


    content.innerHTML =
        pageData.content || "";


    /* -----------------------------------------------------
       Rodapé
    ------------------------------------------------------ */

    const footer =
        document.createElement(
            "footer"
        );

    footer.className =
        "document-page-footer";


    const footerContent =
        document.createElement(
            "div"
        );

    footerContent.className =
        "page-footer-content";

    footerContent.contentEditable =
        "true";


    footerContent.innerHTML =
        pageData.footer || "";


    const pageNumberElement =
        document.createElement(
            "span"
        );

    pageNumberElement.className =
        "page-number";


    pageNumberElement.textContent =
        pageNumber;


    footer.appendChild(
        footerContent
    );

    footer.appendChild(
        pageNumberElement
    );


    /* -----------------------------------------------------
       Montagem
    ------------------------------------------------------ */

    page.appendChild(
        header
    );

    page.appendChild(
        content
    );

    page.appendChild(
        footer
    );


    elements.pagesContainer.appendChild(
        page
    );


    attachEditorEvents(
        content
    );

    attachEditorEvents(
        headerContent
    );

    attachEditorEvents(
        footerContent
    );


    createPageThumbnail(
        pageNumber
    );


    /*
     * Ativa eventos das tabelas que foram salvas
     * dentro do conteúdo.
     */

    const tables =
        content.querySelectorAll(
            ".editor-table"
        );


    tables.forEach(
        table => {

            attachTableEvents(
                table
            );

        }
    );

}


/* =========================================================
   35. EVENTOS DO EDITOR
========================================================= */

function attachEditorEvents(
    editor
) {

    if (!editor) {

        return;

    }


    editor.addEventListener(
        "input",
        () => {

            markAsUnsaved();

            updateDocumentStatistics();

        }
    );


    editor.addEventListener(
        "keyup",
        () => {

            updateToolbarState();

        }
    );


    editor.addEventListener(
        "mouseup",
        () => {

            updateToolbarState();

        }
    );


    editor.addEventListener(
        "focus",
        () => {

            const page =
                editor.closest(
                    ".document-page-editor"
                );


            if (!page) {

                return;

            }


            const pages =
                getPages();


            const index =
                pages.indexOf(
                    page
                );


            if (index >= 0) {

                editorState.currentPage =
                    index + 1;

            }

        }
    );

}


/* =========================================================
   36. MENU
========================================================= */

/**
 * Volta para o Menu.
 *
 * Se houver alterações não salvas, salva antes.
 */

function goToMenu() {

    if (
        !editorState.saved
    ) {

        const saved =
            saveDocument();


        if (!saved) {

            const leaveAnyway =
                confirm(
                    "Não foi possível salvar o documento. Deseja voltar mesmo assim?"
                );


            if (!leaveAnyway) {

                return;

            }

        }

    }


    window.location.href =
        APP_ROUTES.menu;

}


/* =========================================================
   37. IMPRESSÃO
========================================================= */

function printDocument() {

    window.print();

}


/* =========================================================
   38. PDF
========================================================= */

function exportToPDF() {

    window.print();

}


/* =========================================================
   39. NOVO DOCUMENTO
========================================================= */

function initializeNewDocument() {

    editorState.documentId =
        generateDocumentId();


    editorState.title =
        "Documento sem título";


    editorState.currentPage =
        1;


    editorState.totalPages =
        0;


    editorState.zoom =
        100;


    editorState.selectedTable =
        null;


    if (elements.documentTitle) {

        elements.documentTitle.value =
            editorState.title;

    }


    if (elements.pagesContainer) {

        elements.pagesContainer.innerHTML =
            "";

    }


    if (elements.pageThumbnails) {

        elements.pageThumbnails.innerHTML =
            "";

    }


    createPage();


    selectPage(
        1
    );


    updateZoom();

    updateDocumentStatistics();

    markAsSaved();

}


/* =========================================================
   40. INICIALIZAÇÃO DO DOCUMENTO
========================================================= */

function initializeDocument() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const documentId =
        params.get("id");


    if (documentId) {

        loadDocument(
            documentId
        );

        return;

    }


    initializeNewDocument();

}


/* =========================================================
   41. EVENTOS DOS BOTÕES
========================================================= */


/* ---------------------------------------------------------
   Título
---------------------------------------------------------- */

if (elements.documentTitle) {

    elements.documentTitle.addEventListener(
        "input",
        updateDocumentTitle
    );

}


/* ---------------------------------------------------------
   Salvar
---------------------------------------------------------- */

if (elements.saveButton) {

    elements.saveButton.addEventListener(
        "click",
        saveDocument
    );

}


/* ---------------------------------------------------------
   Menu
---------------------------------------------------------- */

if (elements.menuButton) {

    elements.menuButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            goToMenu();

        }
    );

}


/* ---------------------------------------------------------
   Impressão
---------------------------------------------------------- */

if (elements.printButton) {

    elements.printButton.addEventListener(
        "click",
        printDocument
    );

}


/* ---------------------------------------------------------
   PDF
---------------------------------------------------------- */

if (elements.pdfButton) {

    elements.pdfButton.addEventListener(
        "click",
        exportToPDF
    );

}


/* ---------------------------------------------------------
   Histórico
---------------------------------------------------------- */

if (elements.undoButton) {

    elements.undoButton.addEventListener(
        "click",
        undo
    );

}


if (elements.redoButton) {

    elements.redoButton.addEventListener(
        "click",
        redo
    );

}


/* ---------------------------------------------------------
   Formatação
---------------------------------------------------------- */

if (elements.boldButton) {

    elements.boldButton.addEventListener(
        "click",
        toggleBold
    );

}


if (elements.italicButton) {

    elements.italicButton.addEventListener(
        "click",
        toggleItalic
    );

}


if (elements.underlineButton) {

    elements.underlineButton.addEventListener(
        "click",
        toggleUnderline
    );

}


/* ---------------------------------------------------------
   Fonte
---------------------------------------------------------- */

if (elements.fontFamily) {

    elements.fontFamily.addEventListener(
        "change",
        changeFontFamily
    );

}


if (elements.fontSize) {

    elements.fontSize.addEventListener(
        "change",
        changeFontSize
    );

}


if (elements.textColor) {

    elements.textColor.addEventListener(
        "input",
        changeTextColor
    );

}


if (elements.highlightColor) {

    elements.highlightColor.addEventListener(
        "input",
        changeHighlightColor
    );

}


/* ---------------------------------------------------------
   Alinhamento
---------------------------------------------------------- */

if (elements.alignLeftButton) {

    elements.alignLeftButton.addEventListener(
        "click",
        alignLeft
    );

}


if (elements.alignCenterButton) {

    elements.alignCenterButton.addEventListener(
        "click",
        alignCenter
    );

}


if (elements.alignRightButton) {

    elements.alignRightButton.addEventListener(
        "click",
        alignRight
    );

}


if (elements.justifyButton) {

    elements.justifyButton.addEventListener(
        "click",
        justifyText
    );

}


/* ---------------------------------------------------------
   Listas
---------------------------------------------------------- */

if (elements.unorderedListButton) {

    elements.unorderedListButton.addEventListener(
        "click",
        createUnorderedList
    );

}


if (elements.orderedListButton) {

    elements.orderedListButton.addEventListener(
        "click",
        createOrderedList
    );

}


/* ---------------------------------------------------------
   Tabelas
---------------------------------------------------------- */

if (elements.createTableButton) {

    elements.createTableButton.addEventListener(
        "click",
        createTable
    );

}


if (elements.addRowButton) {

    elements.addRowButton.addEventListener(
        "click",
        addTableRow
    );

}


/* ---------------------------------------------------------
   Imagem
---------------------------------------------------------- */

if (elements.imageButton) {

    elements.imageButton.addEventListener(
        "click",
        insertImage
    );

}


/* ---------------------------------------------------------
   Linha
---------------------------------------------------------- */

if (elements.lineButton) {

    elements.lineButton.addEventListener(
        "click",
        insertHorizontalLine
    );

}


/* ---------------------------------------------------------
   Nova Página — barra superior
---------------------------------------------------------- */

if (elements.newPageButton) {

    elements.newPageButton.addEventListener(
        "click",
        createPage
    );

}


/* ---------------------------------------------------------
   Quebra de Página
---------------------------------------------------------- */

if (elements.pageBreakButton) {

    elements.pageBreakButton.addEventListener(
        "click",
        insertPageBreak
    );

}


/* ---------------------------------------------------------
   Páginas — barra lateral
---------------------------------------------------------- */

if (elements.addPageButton) {

    elements.addPageButton.addEventListener(
        "click",
        createPage
    );

}


/* ---------------------------------------------------------
   Zoom
---------------------------------------------------------- */

if (elements.zoomInButton) {

    elements.zoomInButton.addEventListener(
        "click",
        zoomIn
    );

}


if (elements.zoomOutButton) {

    elements.zoomOutButton.addEventListener(
        "click",
        zoomOut
    );

}


/* =========================================================
   42. ATALHOS DE TECLADO
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        const modifier =
            event.ctrlKey ||
            event.metaKey;


        if (!modifier) {

            return;

        }


        const key =
            event.key.toLowerCase();


        /* -------------------------------------------------
           Salvar
        -------------------------------------------------- */

        if (key === "s") {

            event.preventDefault();

            saveDocument();

        }


        /* -------------------------------------------------
           Negrito
        -------------------------------------------------- */

        if (key === "b") {

            event.preventDefault();

            toggleBold();

        }


        /* -------------------------------------------------
           Itálico
        -------------------------------------------------- */

        if (key === "i") {

            event.preventDefault();

            toggleItalic();

        }


        /* -------------------------------------------------
           Sublinhado
        -------------------------------------------------- */

        if (key === "u") {

            event.preventDefault();

            toggleUnderline();

        }

    }
);


/* =========================================================
   43. PREVENÇÃO DE SAÍDA
========================================================= */

window.addEventListener(
    "beforeunload",
    event => {

        if (
            !editorState.saved
        ) {

            event.preventDefault();

            event.returnValue =
                "";

        }

    }
);


/* =========================================================
   44. INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeDocument();

    }
);
