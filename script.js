// Referências aos elementos do HTML
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const gameBox = document.getElementById('game-box');
const scoreBox = document.getElementById('score-box');
const scoreText = document.getElementById('score-text');
const restartButton = document.getElementById('restart-btn');
const odsContextElement = document.getElementById('ods-context');

// Variáveis de estado do jogo
let shuffledQuestions, currentQuestionIndex;
let score = 0;

// Perguntas do Quiz
const questions = [
    {
        ods: "ODS 1: Erradicação da Pobreza",
        question: "Qual é o principal objetivo do ODS 1?",
        answers: [
            { text: "Acabar com a pobreza em todas as suas formas", correct: true },
            { text: "Promover a educação de qualidade", correct: false },
            { text: "Garantir o acesso à água potável", correct: false },
            { text: "Construir cidades sustentáveis", correct: false }
        ]
    },
    {
        ods: "ODS 4: Educação de Qualidade",
        question: "O ODS 4 visa garantir o acesso à educação inclusiva, equitativa e de qualidade e promover oportunidades de aprendizagem ao longo da vida para todos. Verdadeiro ou Falso?",
        answers: [
            { text: "Verdadeiro", correct: true },
            { text: "Falso", correct: false }
        ]
    },
    {
        ods: "ODS 5: Igualdade de Gênero",
        question: "Qual das seguintes ações NÃO contribui para o ODS 5 (Igualdade de Gênero)?",
        answers: [
            { text: "Garantir a participação plena das mulheres em cargos de liderança.", correct: false },
            { text: "Eliminar todas as formas de violência contra mulheres e meninas.", correct: false },
            { text: "Manter diferenças salariais baseadas em gênero.", correct: true },
            { text: "Assegurar o acesso universal à saúde sexual e reprodutiva.", correct: false }
        ]
    },
    {
        ods: "ODS 6: Água Potável e Saneamento",
        question: "O ODS 6 busca assegurar a disponibilidade e gestão sustentável da água e saneamento para:",
        answers: [
            { text: "Apenas para países desenvolvidos", correct: false },
            { text: "Apenas para áreas urbanas", correct: false },
            { text: "Para todos e todas", correct: true },
            { text: "Apenas para a indústria", correct: false }
        ]
    },
     {
        ods: "ODS 7: Energia Limpa e Acessível",
        question: "Qual fonte de energia é considerada limpa e alinhada com o ODS 7?",
        answers: [
            { text: "Carvão", correct: false },
            { text: "Energia Solar", correct: true },
            { text: "Petróleo", correct: false },
            { text: "Gás Natural", correct: false }
        ]
    },
    {
        ods: "ODS 13: Ação Contra a Mudança Global do Clima",
        question: "O ODS 13 foca em tomar medidas urgentes para combater a mudança do clima e seus impactos. Que fenômeno é o principal alvo dessa ação?",
        answers: [
            { text: "O buraco na camada de ozônio", correct: false },
            { text: "A chuva ácida", correct: false },
            { text: "O aquecimento global", correct: true },
            { text: "A desertificação", correct: false }
        ]
    },
    {
        ods: "ODS 14: Vida na Água",
        question: "Qual é a maior ameaça aos oceanos, combatida pelo ODS 14?",
        answers: [
            { text: "Poluição por plásticos e pesca predatória", correct: true },
            { text: "Construção de portos", correct: false },
            { text: "Navegação de cruzeiros", correct: false },
            { text: "Turismo costeiro", correct: false }
        ]
    }
];

// Adiciona os listeners aos botões
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

restartButton.addEventListener('click', startGame);

// Inicia o jogo
startGame();

function startGame() {
    score = 0;
    gameBox.classList.remove('hide');
    scoreBox.classList.add('hide');
    // Embaralha as perguntas para que a ordem seja diferente a cada jogo
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
        showScore();
    }
}

function showQuestion(questionData) {
    odsContextElement.innerText = questionData.ods;
    questionElement.innerText = questionData.question;
    questionData.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    
    // Atualiza a pontuação
    if (correct) {
        score++;
    }

    // Aplica as classes para o feedback visual
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        button.disabled = true; // Desabilita todos os botões após a escolha
    });

    // Mostra o botão de próxima pergunta se houver mais perguntas
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        // Se for a última pergunta, mostra um botão para ver o resultado
        nextButton.innerText = "Ver Resultado";
        nextButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

function showScore() {
    gameBox.classList.add('hide');
    scoreBox.classList.remove('hide');
    scoreText.innerText = `Sua pontuação: ${score} de ${shuffledQuestions.length}`;
    nextButton.innerText = "Próxima"; // Reseta o texto do botão para o próximo jogo
    nextButton.classList.add('hide');
}