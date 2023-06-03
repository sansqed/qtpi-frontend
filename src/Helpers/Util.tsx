export function numberWithCommas(x:string|number) {
    let str = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str[0]===","? str.slice(1):str
}

export const getFullName = (fName:string, mName:string, lName:string) => {
    return fName + (mName.length>0? " "+mName:"") + " " + lName
}