function formatDate(day = null, month = null, year = null) {
    const date = new Date();
    returnDay = day ? day : String(date.getDate()).padStart(2, '0');
    returnMonth = month ? month : String(date.getMonth() + 1).padStart(2, '0');
    returnYear = year ? year : String(date.getFullYear());
    return `${returnDay}/${returnMonth}/${returnYear}`;
 
}

function formatDateTransactions(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function monthRange() {
    const today = new Date();

    // Primeiro dia do mês
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

    // Último dia do mês (pegando dia 0 do mês seguinte)
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    firstDayDate = formatDateTransactions(firstDay);
    lastDayDate = formatDateTransactions(lastDay);

    return {
        first: firstDayDate,
        last: lastDayDate
    }
}

function getLastDayOfMonth(year, month) {
    var date = new Date(`${year}-${month}`);
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}


function getCurrentDate() {
    return formatDate();
}

function getDay(type = null) {
    const date = new Date();

    if(type == 'string') {
        return String(date.getDate()).padStart(2, '0');
    }

    return date.getDate();
}

function getMonth(type = null) {
    const date = new Date();

    if(type == 'string') {
        return String(date.getMonth() + 1).padStart(2, '0');
    }

    return date.getMonth();
}

function getYear(type = null) {
    const date = new Date();

    if(type == 'string') {
        return String(date.getFullYear());
    }

    return date.getFullYear();
}

function getUsualDueDate(date) {
    let dateDay = 5;
    let dateMonth = parseInt(date?.substr(3, 2));
    let dateYear = parseInt(date?.substr(6, 4));
    
    let newDate = new Date(`${dateYear}-${String(dateMonth).padStart(2, '0')}-${String(dateDay).padStart(2, '0')}`);
    newDate.setMonth(newDate.getMonth() + 2);
    return formatDate('05', String(newDate.getMonth()).padStart(2, '0'), String(newDate.getFullYear()));
    
}

function getCardDueDate(item, date) {
    let dateMonth = parseInt(date.substr(3, 2));
    let dateDay = parseInt(date.substr(0,2));
    
    const objDateOld = new Date();
    objDateOld.setMonth(dateMonth - 2);
    
    //check if dueDay is inexistent
    let oldLastDay = getLastDayOfMonth(objDateOld.getFullYear(), objDateOld.getMonth());
    let oldCloseDay = parseInt(item.closeDay) > oldLastDay ? String(oldLastDay).padStart(2, '0') : item.closeDay;
    objDateOld.setDate(item.closeDay)
    
    let oldCloseDate = objDateOld;
    
    const objDate = new Date();
    objDate.setMonth(dateMonth - 2);

    let lastDay = getLastDayOfMonth(objDate.getFullYear(), objDate.getMonth() +1);
    
    let closeDay = parseInt(item.closeDay) > lastDay ? String(lastDay).padStart(2, '0') : item.closeDay;

    objDate.setDate(item.closeDay)
    
    let nextCloseDate = objDate;
    
    
    const objDateCurrent = new Date();
    objDateCurrent.setMonth(dateMonth - 1);
    objDateCurrent.setDate(dateDay);

    let objNextDue = null;
    if(objDateCurrent > objDateOld && objDateCurrent <= objDate) {
        objNextDue = new Date();
        objNextDue.setDate(item.dueDay);
        objNextDue.setMonth(dateMonth - 1);
    } else {
        objNextDue = new Date();
        objNextDue.setDate(item.dueDay);
        objNextDue.setMonth(dateMonth);
    }
    
    let nextLastDay = getLastDayOfMonth(objNextDue.getFullYear(), objNextDue.getMonth() +1);
    
    let dueDay = parseInt(item.dueDay) > nextLastDay ? String(nextLastDay).padStart(2, '0') : item.dueDay;
    
    objNextDue.setDate(dueDay);

    day = String(objNextDue.getDate()).padStart(2, '0');
    month = String(objNextDue.getMonth() + 1).padStart(2, '0');
    year = String(objNextDue.getFullYear());
    
    return formatDate(day, month, year);

}

function parseDateToObj(dateString) {
    const parts = dateString.split('/');
    
    // Extrai dia, mês e ano
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Subtrai 1 do mês porque os meses em JavaScript são indexados de 0 a 11
    let year = parseInt(parts[2], 10);
  
    // Se o ano estiver no formato de 2 dígitos, adicione 2000 ou 1900
    if (year < 100) {
      year += (year < 50 ? 2000 : 1900);
    }
  
    // Cria um novo objeto Date
    return new Date(year, month, day);
}

function parseDateToBr(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() retorna 0-11
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
}

// Função para calcular a diferença em meses entre duas datas
function monthDifference(mes1, ano1, mes2, ano2) {
    // Cria objetos Date para o primeiro dia do mês/ano fornecido
    var data1 = new Date(ano1, mes1 - 1); // Meses em JavaScript são 0-11, por isso mes1 - 1
    var data2 = new Date(ano2, mes2 - 1);
  
    // Calcula a diferença em anos e meses
    var anosDiferenca = ano2 - ano1;
    var mesesDiferenca = mes2 - mes1;
  
    // Calcula a diferença total em meses
    var diferencaTotalMeses = (anosDiferenca * 12) + mesesDiferenca;
    return diferencaTotalMeses;
}

function dateToServer(dateStr) {
  const [dia, mes, ano] = dateStr.split("/");
  return `${ano}-${mes}-${dia}`;
}

module.exports = {
    getDay,
    getMonth,
    getYear,
    getCurrentDate,
    getUsualDueDate,
    getCardDueDate,
    parseDateToObj,
    parseDateToBr,
    monthDifference,
    dateToServer,
    monthRange
}


