function Currency(nStr,type)
{
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    let typeCurrency = !type ? '' : type=='dollar' ? '$' :'Rp.'
    let curency = x1 + x2;
    return `${typeCurrency}${curency}`
}

export {
    Currency
}