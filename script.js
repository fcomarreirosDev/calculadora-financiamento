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

  // Parcelas de 3x (sem juros)
  const parcelasSemJuros = 3;
  const valorParcelaSemJuros = valorFinanciado / parcelasSemJuros;
  const valorFormatadoSemJuros = valorParcelaSemJuros.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  resultadoDiv.innerHTML += `<p>${parcelasSemJuros}x de <strong>${valorFormatadoSemJuros}</strong> (sem juros)</p>`;

  // Parcelas de 4x a 12x (com juros)
  const taxa = 0.109; // 11,9% ao mês

  for (let parcelas = 4; parcelas <= 12; parcelas++) {
    const i = taxa;
    const n = parcelas;

    const pmt = valorFinanciado * ((i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1));

    const valorFormatado = pmt.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    resultadoDiv.innerHTML += `<p>${parcelas}x de <strong>${valorFormatado}</strong> (com juros)</p>`;
  }
});

// Evento para o ícone de reset (limpar inputs e resultados)
document.getElementById("reset").addEventListener("click", function () {
  // Limpa os campos de input
  document.querySelectorAll("input").forEach(input => input.value = "");

  // Limpa os resultados
  document.getElementById("resultinstallment").innerHTML = "";
});
