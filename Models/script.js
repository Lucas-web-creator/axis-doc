/* =========================================================
   AXIS DOC — MODELS
   JavaScript principal da página de modelos
========================================================= */


/* =========================================================
   1. CONFIGURAÇÕES
========================================================= */

const APP_ROUTES = {

    menu:
        "../Menu/index.html",

    edition:
        "../Edition/index.html"

};


/* =========================================================
   2. MODELOS DISPONÍVEIS
========================================================= */

/*
 * Os IDs abaixo devem corresponder exatamente
 * aos valores utilizados no HTML através de:
 *
 * data-model=""
 * data-model-action=""
 */

const MODELS = [

    {
        id: "blank",

        name:
            "Documento em branco",

        description:
            "Comece um documento do zero."

    },


    {
        id: "report",

        name:
            "Relatório",

        description:
            "Estrutura organizada para relatórios."

    },


    {
        id: "resume",

        name:
            "Currículo",

        description:
            "Estrutura para apresentação profissional."

    },


    {
        id: "letter",

        name:
            "Carta",

        description:
            "Modelo para cartas e comunicações formais."

    },


    {
        id: "meeting",

        name:
            "Ata de reunião",

        description:
            "Organize informações e decisões de reuniões."

    },


    {
        id: "project",

        name:
            "Projeto",

        description:
            "Estrutura para planejamento e documentação."

    },


    {
        id: "study",

        name:
            "Estudos",

        description:
            "Estrutura para anotações e conteúdos de estudo."

    },


    {
        id: "notes",

        name:
            "Anotações",

        description:
            "Modelo simples para registrar informações."

    },


    {
        id: "proposal",

        name:
            "Proposta",

        description:
            "Estrutura para apresentação de propostas."

    },


    {
        id: "academic",

        name:
            "Documento acadêmico",

        description:
            "Estrutura para trabalhos e documentos acadêmicos."

    }

];


/* =========================================================
   3. ESTADO DA APLICAÇÃO
========================================================= */

const modelsState = {

    selectedModel:
        null

};


/* =========================================================
   4. ELEMENTOS DO DOM
========================================================= */

const elements = {

    /*
     * Botão voltar ao menu.
     */

    menuButton:
        document.getElementById(
            "menuButton"
        ) ||
        document.getElementById(
            "backToMenuButton"
        ) ||
        document.getElementById(
            "returnToMenuButton"
        ),


    /*
     * Grade de modelos.
     */

    modelsGrid:
        document.getElementById(
            "modelsGrid"
        ),


    /*
     * Cards.
     */

    modelCards:
        document.querySelectorAll(
            ".model-card"
        ),


    /*
     * Botões dos modelos.
     */

    modelButtons:
        document.querySelectorAll(
            "[data-model-action]"
        )

};


/* =========================================================
   5. UTILITÁRIOS
========================================================= */


/*
 * Procura um modelo pelo ID.
 */

function getModelById(
    modelId
) {

    return MODELS.find(
        model =>
            model.id === modelId
    );

}


/*
 * Obtém o ID de um modelo através de um card.
 */

function getCardModelId(
    card
) {

    if (!card) {

        return null;

    }


    return (
        card.dataset.model ||
        null
    );

}


/*
 * Obtém o ID de um modelo através
 * de um botão.
 */

function getButtonModelId(
    button
) {

    if (!button) {

        return null;

    }


    return (
        button.dataset.modelAction ||
        null
    );

}


/* =========================================================
   6. SELEÇÃO DE MODELO
========================================================= */

function selectModel(
    modelId
) {

    const model =
        getModelById(
            modelId
        );


    if (!model) {

        console.warn(
            `Modelo "${modelId}" não encontrado.`
        );

        return false;

    }


    modelsState.selectedModel =
        model.id;


    /*
     * Atualiza visualmente o card selecionado.
     */

    elements.modelCards.forEach(
        card => {

            const cardModelId =
                getCardModelId(
                    card
                );


            card.classList.toggle(
                "selected",
                cardModelId === model.id
            );

        }
    );


    return true;

}


/* =========================================================
   7. ABRIR EDITION
========================================================= */

/*
 * Direciona o usuário para o Edition
 * enviando o ID do modelo pela URL.
 *
 * Exemplo:
 *
 * ../Edition/index.html?model=report
 */

function openEdition(
    modelId
) {

    const model =
        getModelById(
            modelId
        );


    /*
     * Impede que um modelo inexistente
     * seja enviado para o Edition.
     */

    if (!model) {

        console.error(
            `Não foi possível abrir o modelo "${modelId}".`
        );

        return;

    }


    /*
     * Guarda o modelo selecionado.
     */

    modelsState.selectedModel =
        model.id;


    /*
     * Monta a URL.
     */

    const editionUrl =
        `${APP_ROUTES.edition}?model=${encodeURIComponent(model.id)}`;


    /*
     * Direciona o navegador.
     */

    window.location.href =
        editionUrl;

}


/* =========================================================
   8. USAR MODELO
========================================================= */

/*
 * Função central utilizada pelos botões
 * "Usar modelo".
 */

function useModel(
    modelId
) {

    if (!modelId) {

        console.warn(
            "Nenhum modelo foi informado."
        );

        return;

    }


    const selected =
        selectModel(
            modelId
        );


    if (!selected) {

        return;

    }


    openEdition(
        modelId
    );

}


/* =========================================================
   9. EVENTOS DOS CARDS
========================================================= */

function initializeModelCards() {

    elements.modelCards.forEach(
        card => {

            const modelId =
                getCardModelId(
                    card
                );


            /*
             * Card sem modelo.
             */

            if (!modelId) {

                console.warn(
                    "Card de modelo sem data-model:",
                    card
                );

                return;

            }


            /*
             * Verifica se o modelo
             * realmente existe.
             */

            const model =
                getModelById(
                    modelId
                );


            if (!model) {

                console.warn(
                    `O modelo "${modelId}" não está cadastrado em MODELS.`
                );

                return;

            }


            /*
             * Clique no card.
             *
             * O botão interno possui seu próprio
             * evento e será tratado separadamente.
             */

            card.addEventListener(
                "click",
                event => {

                    if (
                        event.target.closest(
                            ".model-action"
                        )
                    ) {

                        return;

                    }


                    selectModel(
                        modelId
                    );

                }
            );


            /*
             * Acessibilidade por teclado.
             */

            card.setAttribute(
                "tabindex",
                "0"
            );


            card.addEventListener(
                "keydown",
                event => {

                    /*
                     * Não interfere quando o foco
                     * está no botão interno.
                     */

                    if (
                        event.target.closest(
                            ".model-action"
                        )
                    ) {

                        return;

                    }


                    if (
                        event.key ===
                        "Enter"
                    ) {

                        event.preventDefault();

                        selectModel(
                            modelId
                        );

                    }


                    if (
                        event.key ===
                        " "
                    ) {

                        event.preventDefault();

                        selectModel(
                            modelId
                        );

                    }

                }
            );

        }
    );

}


/* =========================================================
   10. BOTÕES "USAR MODELO"
========================================================= */

function initializeModelButtons() {

    elements.modelButtons.forEach(
        button => {

            const modelId =
                getButtonModelId(
                    button
                );


            /*
             * Botão sem modelo.
             */

            if (!modelId) {

                console.warn(
                    "Botão de modelo sem data-model-action:",
                    button
                );

                return;

            }


            /*
             * Verifica se o modelo existe.
             */

            const model =
                getModelById(
                    modelId
                );


            if (!model) {

                console.warn(
                    `O modelo "${modelId}" não está cadastrado em MODELS.`
                );

                return;

            }


            /*
             * Evento de clique.
             */

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();


                    useModel(
                        modelId
                    );

                }
            );

        }
    );

}


/* =========================================================
   11. BOTÃO VOLTAR AO MENU
========================================================= */

function goToMenu() {

    window.location.href =
        APP_ROUTES.menu;

}


function initializeMenuButton() {

    if (
        !elements.menuButton
    ) {

        console.warn(
            "Botão de retorno ao menu não encontrado."
        );

        return;

    }


    elements.menuButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            goToMenu();

        }
    );

}


/* =========================================================
   12. VALIDAÇÃO DOS MODELOS
========================================================= */

function validateModels() {

    /*
     * Verifica a quantidade.
     */

    if (
        MODELS.length !== 10
    ) {

        console.warn(
            `AXIS DOC: esperado 10 modelos, encontrados ${MODELS.length}.`
        );

    }


    /*
     * Verifica os cards existentes.
     */

    elements.modelCards.forEach(
        card => {

            const modelId =
                getCardModelId(
                    card
                );


            if (!modelId) {

                console.warn(
                    "Card sem data-model:",
                    card
                );

                return;

            }


            const model =
                getModelById(
                    modelId
                );


            if (!model) {

                console.warn(
                    `O modelo "${modelId}" não está cadastrado em MODELS.`
                );

            }

        }
    );


    /*
     * Verifica os botões existentes.
     */

    elements.modelButtons.forEach(
        button => {

            const modelId =
                getButtonModelId(
                    button
                );


            if (!modelId) {

                console.warn(
                    "Botão sem data-model-action:",
                    button
                );

                return;

            }


            const model =
                getModelById(
                    modelId
                );


            if (!model) {

                console.warn(
                    `O modelo "${modelId}" utilizado pelo botão não está cadastrado em MODELS.`
                );

            }

        }
    );

}


/* =========================================================
   13. DIAGNÓSTICO
========================================================= */

/*
 * Exibe no console informações úteis durante
 * o desenvolvimento.
 */

function showModelsDiagnostics() {

    console.log(
        "AXIS DOC — Models inicializado."
    );


    console.log(
        "Modelos cadastrados:",
        MODELS.length
    );


    console.log(
        "Cards encontrados:",
        elements.modelCards.length
    );


    console.log(
        "Botões de modelo encontrados:",
        elements.modelButtons.length
    );

}


/* =========================================================
   14. INICIALIZAÇÃO
========================================================= */

function initializeModelsPage() {

    /*
     * Validação.
     */

    validateModels();


    /*
     * Cards.
     */

    initializeModelCards();


    /*
     * Botões "Usar modelo".
     */

    initializeModelButtons();


    /*
     * Botão voltar ao menu.
     */

    initializeMenuButton();


    /*
     * Diagnóstico.
     */

    showModelsDiagnostics();

}


/* =========================================================
   15. DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeModelsPage();

    }
);
