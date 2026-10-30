//ACORDEÃO (ABRIR E FECHAR CONTEÚDOS)
document.querySelectorAll(".titulo-acordeao").forEach(botao => {
    botao.addEventListener("click", () => {
        let conteudo = botao.nextElementSibling; //pegue o próximo elemento
        let simbolo = botao.querySelector("span");

        // Alterna entre block e none usando operador ternário
        conteudo.style.display = conteudo.style.display === "block" ? "none" : "block";
        simbolo.textContent = conteudo.style.display === "block" ? "−" : "+";
    });
});

//LINHA DO TEMPO
function mostrarAno(id, botao) {
    // Esconde todos os eventos de uma vez só
    document.querySelectorAll(".evento").forEach(ev => ev.style.display = "none");
    
    // Remove a classe 'ativo' de todos os botões de anos
    document.querySelectorAll(".anos button").forEach(btn => btn.classList.remove("ativo"));

    // Mostra o evento selecionado e ativa o botão atual
    let eventoSelecionado = document.getElementById(id);
    eventoSelecionado.style.display = "block";
    botao.classList.add("ativo");

    // Rolar suavemente até o marco
    eventoSelecionado.scrollIntoView({ behavior: "smooth", block: "center" });
}

//EIXO E ALIADOS
function mostrarBlocoGuerra(id) {
    let conteudo = document.getElementById(id);
    let estavaAberto = conteudo.style.display === "block";

    // Fecha todos os blocos de guerra em uma linha
    document.querySelectorAll(".conteudo-guerra").forEach(bloco => bloco.style.display = "none");

    // Só reabre se ele já não estivesse aberto antes
    if (!estavaAberto) conteudo.style.display = "block";
}

//QUIZ (DADOS E LÓGICA)
const perguntas = [
    {
        pergunta: "Qual é a principal função do sistema endócrino?",
        alternativas: ["Realizar a digestão dos alimentos.", "Produzir hormônios que regulam funções do organismo.", "Transportar oxigênio pelo corpo.", "Defender o organismo contra vírus."],
        correta: 1,
        explicacao: "O sistema endócrino é responsável por produzir e liberar hormônios que regulam diversas funções do organismo, como crescimento, metabolismo, reprodução e sono."
    },
    {
        pergunta: "Em uma situação de susto ou perigo, o coração acelera e o corpo fica em estado de alerta. Qual hormônio participa dessa resposta?",
        alternativas: ["Insulina.", "Adrenalina.", "Prolactina.", "Melatonina."],
        correta: 1,
        explicacao: "A adrenalina é produzida pela região interna das glândulas suprarrenais, chamadas medulas suprarrenais."
    },
    {
        pergunta: "Qual hormônio é responsável por diminuir a quantidade de glicose no sangue?",
        alternativas: ["Adrenalina.", "Insulina.", "Glucagon.", "Cortisol."],
        correta: 1,
        explicacao: "A insulina é produzida pelo pâncreas e ajuda a glicose a entrar nas células, diminuindo sua concentração no sangue."
    },
    {
        pergunta: "Qual glândula produz os hormônios T3 e T4?",
        alternativas: ["Hipófise.", "Pâncreas.", "Tireoide.", "Ovários."],
        correta: 2,
        explicacao: "A tireoide produz os hormônios T3 (triiodotironina) e T4 (tiroxina), que regulam o metabolismo, o crescimento e o desenvolvimento do corpo."
    },
    {
        pergunta: "Qual é a função da adrenalina no organismo?",
        alternativas: ["Diminuir os batimentos cardíacos.", "Preparar o corpo para situações de alerta e perigo.", "Controlar a produção de leite.", "Diminuir a pressão arterial."],
        correta: 1,
        explicacao: "A adrenalina prepara o organismo para situações de perigo ou estresse, aumentando os batimentos cardíacos, a pressão arterial e a disponibilidade de energia."
    },
    {
        pergunta: "Uma pessoa apresenta cansaço, sonolência, sensação frequente de frio e metabolismo mais lento devido à baixa produção de hormônios tireoidianos. Qual alteração ela pode apresentar?",
        alternativas: ["Hipertireoidismo.", "Síndrome de Cushing.", "Hipotireoidismo.", "Diabetes mellitus"],
        correta: 1,
        explicacao: "O hipotireoidismo acontece quando a tireoide produz uma quantidade insuficiente de hormônios tireoidianos."
    },
    {
        pergunta: "Qual glândula produz o cortisol, hormônio importante na resposta ao estresse e na regulação do metabolismo?",
        alternativas: [" Hipófise", "Glândulas suprarrenais", "Tireoide", "Ovários"],
        correta: 0,
        explicacao: "As glândulas suprarrenais ficam localizadas acima dos rins."
    },
    {
        pergunta: "Qual hormônio é produzido principalmente pela glândula pineal e ajuda a regular o ciclo do sono e da vigília?",
        alternativas: ["Ocitocina", "Adrenalina", "Glucagon", "Melatonina"],
        correta: 1,
        explicacao: "A melatonina é produzida principalmente pela glândula pineal, localizada no cérebro. Ela ajuda a regular o relógio biológico e informa ao organismo que está chegando o período de descanso. Sua produção geralmente aumenta quando escurece e diminui com a exposição à luz."
    },
    {
        pergunta: "Uma pessoa apresenta crescimento excessivo das extremidades, como mãos e pés, devido ao excesso de hormônio do crescimento na vida adulta. Qual condição pode explicar essa alteração?",
        alternativas: ["Diabetes insipidus", "Hipotireoidismo", "Acromegalia", "Nanismo hipofisário"],
        correta: 3,
        explicacao: "A acromegalia é uma doença geralmente causada pela produção excessiva do hormônio do crescimento (GH) na vida adulta."
    },
    {
        pergunta: "Qual alternativa apresenta corretamente uma das principais funções da hipófise?",
        alternativas: ["Filtrar o sangue e produzir urina", "Produzir células responsáveis pelo transporte de oxigênio", "Produzir bile para ajudar na digestão", "Produzir hormônios que regulam outras glândulas endócrinas"],
        correta: 2,
        explicacao: "A hipófise é uma pequena glândula localizada na base do cérebro, conhecida como glândula-mestra."
    }
];

let perguntaAtual = 0;
let pontos = 0;

function mostrarPergunta() {
    let pergunta = perguntas[perguntaAtual];
    
    document.getElementById("progresso").textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById("pergunta").textContent = pergunta.pergunta;
    
    let alternativasContainer = document.getElementById("alternativas");
    alternativasContainer.innerHTML = ""; // Limpa anterior

    pergunta.alternativas.forEach((alternativa, indice) => {
        let botao = document.createElement("button");
        botao.textContent = alternativa;
        botao.onclick = () => verificarResposta(indice);
        alternativasContainer.appendChild(botao);
    });

    document.getElementById("feedback").textContent = "";
    document.getElementById("proxima").style.display = "none";
}

function verificarResposta(indice) {
    let pergunta = perguntas[perguntaAtual];
    let botoes = document.querySelectorAll("#alternativas button");

    botoes.forEach(btn => btn.disabled = true);

    if (indice === pergunta.correta) {
        botoes[indice].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta correta! ${pergunta.explicacao}`;
        pontos++;
    } else {
        botoes[indice].classList.add("errada");
        botoes[pergunta.correta].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta incorreta. ${pergunta.explicacao}`;
    }

    document.getElementById("proxima").style.display = "block";
}

function proximaPergunta() {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    let msg = pontos === perguntas.length ? "Excelente! Você acertou todas!" : 
              pontos >= 7 ? "Muito bom! Ótimo conhecimento." : "Vale a pena revisar o conteúdo.";

    document.getElementById("quiz-container").innerHTML = `
        <h3>Resultado final</h3>
        <p>Você acertou <strong>${pontos}</strong> de <strong>${perguntas.length}</strong> questões.</p>
        <p>${msg}</p>
        <button id='refazer' onclick='refazerQuiz()'>Refazer Quiz</button>
    `;
}

function refazerQuiz() {
    perguntaAtual = 0;
    pontos = 0;
    document.getElementById("quiz-container").innerHTML = `
        <p id="progresso"></p>
        <h3 id="pergunta"></h3>
        <div id="alternativas"></div>
        <p id="feedback"></p>
        <button id="proxima" onclick="proximaPergunta()">Próxima pergunta</button>
    `;
    mostrarPergunta();
}

// Inicialização automática do Quiz
if (document.getElementById("quiz-container")) {
    mostrarPergunta();
}
