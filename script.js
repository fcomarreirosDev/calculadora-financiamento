// Espera o clique no botão "Calcular"
document.getElementById("button-calculator").addEventListener("click", function () {
  // Captura os valores dos inputs
  const valorAVista = parseFloat(document.querySelectorAll("input")[0].value);
  const valorGarantia = parseFloat(document.querySelectorAll("input")[1].value) || 0;
  const valorEntrada = parseFloat(document.querySelectorAll("input")[2].value) || 0;

  // Seleciona a div onde os resultados serão mostrados
  const resultadoDiv = document.getElementById("resultinstallment");

  // Limpa os resultados anteriores
  resultadoDiv.innerHTML = "";

  // Verifica se o valor à vista foi preenchido corretamente
  if (isNaN(valorAVista) || valorAVista <= 0) {
    alert("O valor à vista não pode ser nulo!");
    return;
  }

  // Calcula o valor financiado subtraindo a entrada e a garantia (se houver)
  const valorFinanciado = valorAVista + valorGarantia - valorEntrada;

  // Verifica se o valor financiado é válido
  if (valorFinanciado <= 0) {
    resultadoDiv.innerHTML = "<p>O valor financiado não pode ser menor ou igual a zero.</p>";
    return;
  }

  // Parcelas de 4x a 12x (com juros)
  const taxaCrediario = 0.099; // 9,9% ao mês
  const taxaCartao = 0.0292; // 2,92% ao mês

  let htmlCrediario = "<div style='margin-bottom: 1.5rem;'><h4 style='text-align: center; margin-bottom: 1rem; color: var(--text-dark); border-bottom: 2px solid var(--primary-color); padding-bottom: 0.5rem;'>Crediário</h4>";
  
  // Adiciona a parcela de 3x sem juros ao Crediário
  const parcelasSemJuros = 3;
  const valorParcelaSemJuros = valorFinanciado / parcelasSemJuros;
  const valorFormatadoSemJuros = valorParcelaSemJuros.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  htmlCrediario += `<p><span>${parcelasSemJuros}x de</span> <span><strong>${valorFormatadoSemJuros}</strong> <span class='no-interest'>(sem juros)</span></span></p>`;

  let htmlCartao = "<div><h4 style='text-align: center; margin-bottom: 1rem; color: var(--text-dark); border-bottom: 2px solid var(--primary-color); padding-bottom: 0.5rem;'>Cartão de Crédito</h4>";

  // Loop do Crediário: 4x a 12x com juros
  for (let parcelas = 4; parcelas <= 12; parcelas++) {
    const n = parcelas;
    const pmtCrediario = valorFinanciado * ((taxaCrediario * Math.pow(1 + taxaCrediario, n)) / (Math.pow(1 + taxaCrediario, n) - 1));
    const valorFormatadoCrediario = pmtCrediario.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    htmlCrediario += `<p><span>${parcelas}x de</span> <span><strong>${valorFormatadoCrediario}</strong></span></p>`;
  }

  // Loop do Cartão de Crédito: 6x sem juros, 7x a 12x com juros
  for (let parcelas = 6; parcelas <= 12; parcelas++) {
    const n = parcelas;
    let valorFormatadoCartao = "";

    if (n === 6) {
      // Sem juros
      const pmtCartaoSemJuros = valorFinanciado / n;
      valorFormatadoCartao = pmtCartaoSemJuros.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      htmlCartao += `<p><span>${parcelas}x de</span> <span><strong>${valorFormatadoCartao}</strong> <span class='no-interest'>(sem juros)</span></span></p>`;
    } else {
      // Com juros
      const pmtCartao = valorFinanciado * ((taxaCartao * Math.pow(1 + taxaCartao, n)) / (Math.pow(1 + taxaCartao, n) - 1));
      valorFormatadoCartao = pmtCartao.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      htmlCartao += `<p><span>${parcelas}x de</span> <span><strong>${valorFormatadoCartao}</strong></span></p>`;
    }
  }

  htmlCrediario += "</div>";
  htmlCartao += "</div>";

  resultadoDiv.innerHTML += htmlCrediario;
  resultadoDiv.innerHTML += htmlCartao;
});

// Evento para o ícone de reset (limpar inputs e resultados)
document.getElementById("reset").addEventListener("click", function () {
  // Limpa os campos de input
  document.querySelectorAll("input").forEach(input => input.value = "");

  // Limpa os resultados
  document.getElementById("resultinstallment").innerHTML = "";
});
