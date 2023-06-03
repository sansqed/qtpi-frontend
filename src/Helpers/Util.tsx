export function formatMoney(x:string|number) {
    let str = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    str = str[0]===","? str.slice(1):str
    
    str = str.indexOf('.')>-1? "₱"+str : "₱"+str+".00"

    if(str.indexOf('-')>-1)
        return "-"+str.replace('-','')
    else
        return str
    
}

export const getFullName = (fName:string, mName:string, lName:string) => {
    return fName + (mName.length>0? " "+mName:"") + " " + lName
}