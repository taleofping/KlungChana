export const convert = (value) =>
{
    if(value>=1000000000)
    {
        value=(value/1000000000).toFixed(2)+"B";
    }
    else if(value>=1000000)
    {
        value=(value/1000000).toFixed(2)+"M"
    }
    else if(value>=1000)
    {
        value=(value/1000).toFixed(2)+"K";
    }
    return value;
}