export function formatMoney(x:string|number) {
    let str = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    str = str[0]===","? str.slice(1):str
    
    str = str.indexOf('.')==str.length-3? "₱"+str : 
            str.indexOf('.')==str.length-2? "₱"+str+"0":
            "₱"+str+".00"

    if(str.indexOf('-')>-1)
        return "-"+str.replace('-','')
    else
        return str
    
}

export const moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
  
    // These options are needed to round to whole numbers if that's what you want.
    // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

export const getFullName = (fName:string, mName:string, lName:string) => {
    return fName + (mName.length>0? " "+mName:"") + " " + lName
}