export const setErrorTrue = (name:string, value:any, setError:any) => {
    setError((prev:any) => ({...prev, [name]: value}))
}