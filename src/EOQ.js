export const findEOQ = (d,o,c) =>
{
    if(parseInt(c) === 0 || c === '')
    {
        return '';
    }
    else if(parseInt(c) > 0 && d === '' && o === '' )
    {
        return '';
    }
    var sum=0;
    sum = Math.sqrt((2*d*o)/c).toFixed(2)
    return isNaN(sum) ? 0: sum || (isFinite(sum) ? 0: sum);

}

export const findNY = (d,o,c) =>
{
    if(parseInt(c) === 0 || c === '')
    {
        return '';
    }
    else if(parseInt(c) > 0 && d === '' && o === '' )
    {
        return '';
    }
    var sum=0;
    sum = (d/(Math.sqrt((2*d*o)/c))).toFixed(2)
    return isNaN(sum) ? 0: sum || (isFinite(sum) ? 0: sum);

}

export const findLead = (d,o,c,day) =>
{
    var non = '';
    if(parseInt(day) === 0 || parseInt(c) === 0 || day === '' || c === '')
    {
        return non;
    }
    else if(parseInt(c) > 0 && d === '' && o === '' )
    {
        return '';
    }
    else if(parseInt(day)>366)
    {
        return '';
    }
    var sum=0;
    sum = (parseInt(day)/findNY(d,o,parseInt(c))).toFixed(2)
    return (isNaN(sum) ? 0: sum) || (isFinite(sum) ? 0: sum);

}