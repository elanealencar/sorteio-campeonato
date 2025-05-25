let duplas = [];
let duplasSorteadas = [];
let sorteioIndex = 0;
let sorteioInterval; // Para controlar o intervalo do sorteio rápido
let duplasDisponiveis = []; // Lista de duplas ainda não sorteadas


document.getElementById("gerarDuplas").addEventListener("click", function() {
    let quantidade = parseInt(document.getElementById("quantidadeDuplas").value);
    let container = document.getElementById("inputsContainer");
    let botaoSortear = document.getElementById("sortearDupla");

    // Limpa os inputs anteriores
    container.innerHTML = "";

    if (quantidade > 0) {
        for (let i = 0; i < quantidade; i++) {
            let input = document.createElement("input");
            input.type = "text";
            input.placeholder = `Nome da dupla ${i + 1}`;
            input.className = "w-full p-2 border rounded mb-2 text-center";
            input.id = `dupla${i}`;
            container.appendChild(input);
        }

        // Mostra o botão de sortear duplas
        botaoSortear.classList.remove("hidden");
    }
});

// Função para embaralhar as duplas
function embaralharDuplas(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Troca os elementos
    }
    return arr;
}

// Função para sortear as duplas sem repetições
document.getElementById("sortearDupla").addEventListener("click", function() {
    let container = document.getElementById("inputsContainer");
    let lista = document.getElementById("listaDuplas");
    let sorteioDisplay = document.getElementById("sorteioRapido"); 


    // Coleta todos os inputs das duplas
    let inputs = container.getElementsByTagName("input");
    duplas = [];

    for (let input of inputs) {
        if (input.value.trim() === "") {
        alert("Por favor, preencha todos os campos antes de sortear.");
        return; // Impede o sorteio se algum input estiver vazio
        }
        duplas.push(input.value.trim());
    }

    // Verifica se todas as duplas são únicas
    let duplasUnicas = new Set();
    let duplaDuplicada = null;

    for (let dupla of duplas) {
        if (duplasUnicas.has(dupla)) {
            duplaDuplicada = dupla; // Captura a primeira dupla duplicada encontrada
            break;
        }
        duplasUnicas.add(dupla);
    }

    if (duplaDuplicada) {
        alert(`Erro! A dupla "${duplaDuplicada}" está cadastrada mais de uma vez.`);
        return; // Retorna e não continua o processo
    }

    if (sorteioIndex === 0) {
        duplasDisponiveis = [...duplas]; // Preenche a lista de duplas disponíveis no primeiro sorteio
        duplasDisponiveis = embaralharDuplas(duplasDisponiveis);
    }

    if (duplasDisponiveis.length > 0) {
        let botaoSortear = document.getElementById("sortearDupla");

        for (let input of inputs) {
            input.disabled = true;
        }

        // Atualiza o botão para indicar que o sorteio está acontecendo
        botaoSortear.textContent = "SORTEANDO...";
        botaoSortear.classList.add("bg-orange-500");
        botaoSortear.classList.remove("hover:bg-green-600");
        botaoSortear.disabled = true; // Impede cliques durante o sorteio

        sorteioDisplay.classList.remove("hidden");

        // Inicia o sorteio rápido mostrando nomes aleatórios
        sorteioInterval = setInterval(() => {
            let duplaAleatoria = duplasDisponiveis[Math.floor(Math.random() * duplasDisponiveis.length)];
            sorteioDisplay.textContent = duplaAleatoria;
        }, 100);


         // Para o sorteio após 2 segundos e fixa o nome sorteado
         setTimeout(() => {
            clearInterval(sorteioInterval);
            let duplaSorteada = duplasDisponiveis.shift(); // Remove a dupla sorteada da lista de disponíveis
            sorteioDisplay.textContent = `${duplaSorteada}`;


            // Adiciona a dupla à lista de sorteados
            let li = document.createElement("li");
            li.textContent = `dupla ${sorteioIndex + 1}: ${duplaSorteada}`;
            li.className = "p-2 border-4 border-orange-500 rounded-lg mb-2 text-center text-xl font-bold";
            lista.appendChild(li);


            // Marca a dupla como sorteada
            duplasSorteadas.push(duplaSorteada);
            sorteioIndex++;

            // Atualiza o botão
            if (duplasDisponiveis.length > 0) {
                botaoSortear.textContent = `Sortear Dupla ${sorteioIndex + 1}`;
                botaoSortear.disabled = false;
                botaoSortear.classList.remove("bg-orange-500");
             } // Reativa o botão else 
             else {
                botaoSortear.textContent = "Sorteio Finalizado!";
                botaoSortear.disabled = true;
                // Exibe o botão de novo sorteio
                document.getElementById("novoSorteio").classList.remove("hidden");
            }

       
        }, 2000);
        } else {
            alert("Preencha todos os campos!");
        }
  
   });

   // Lógica para o botão "Fazer novo sorteio"
    document.getElementById("novoSorteio").addEventListener("click", function() {
    let container = document.getElementById("inputsContainer");
    let lista = document.getElementById("listaDuplas");
    let sorteioDisplay = document.getElementById("sorteioRapido");
    let botaoSortear = document.getElementById("sortearDupla");

    // Limpa os dados
    duplas = [];
    duplasSorteadas = [];
    sorteioIndex = 0;
    duplasDisponiveis = [];
    lista.innerHTML = "";
    sorteioDisplay.textContent = "";

    // Limpa e reabilita os inputs
    let inputs = container.getElementsByTagName("input");
    for (let input of inputs) {
        input.disabled = false;
        input.value = ""; // Limpa os valores dos inputs
    }

    // Esconde o botão de novo sorteio e reexibe o botão de sortear
    document.getElementById("novoSorteio").classList.add("hidden");
    botaoSortear.textContent = "Sortear Dupla 1";
    botaoSortear.disabled = false;
});