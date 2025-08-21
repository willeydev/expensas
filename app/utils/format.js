function formatMoney(value) {
    if(!value) {
      return null;
    }
    var valorLimpo = value.replace(/[^\d]/g, '');

    // Formata para ter duas casas decimais
    var numero = parseFloat(valorLimpo) / 100;

    // Formata o número com ponto para separar milhares e vírgula para separar decimais
    return numero.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function formatMoneyToDash(value, correction = true) {

    value = Number(value);
   // Converter o número para uma string com duas casas decimais
   let numberStr = value.toFixed(2);

   // Substituir o ponto decimal por uma vírgula
   numberStr = numberStr.replace('.', ',');
 
   // Adicionar separadores de milhar
   let parts = numberStr.split(',');
   let integerPart = parts[0];
   let decimalPart = parts[1];
   
   // Regex para adicionar pontos como separadores de milhar
   let integerWithThousandSeparators = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
 
   // Concatenar a parte inteira com a parte decimal
   let formattedNumber = integerWithThousandSeparators + ',' + decimalPart;
 
   return formattedNumber;
}

function moneyToFloat(str) {
    // Remove espaços em branco
    let cleanedStr = str.trim();

    // Remove separadores de milhar (se houver)
    cleanedStr = cleanedStr.replace(/\./g, '');
    
    // Substitui a vírgula por ponto
    cleanedStr = cleanedStr.replace(',', '.');
    
    // Converte a string limpa para um número de ponto flutuante
    let number = parseFloat(cleanedStr);
    
    return number;
}

module.exports = {
    formatMoney,
    moneyToFloat,
    formatMoneyToDash
}