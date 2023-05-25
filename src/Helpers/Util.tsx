export function numberWithCommas(x:any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").slice(1);
}

export const getFullName = (fName:string, mName:string, lName:string) => {
    return fName + (mName.length>0? " "+mName:"") + " " + lName
}