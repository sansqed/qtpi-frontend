export const setErrorTrue = (name:string, setError:any) => {
    setError((prev:any) => ({...prev, [name]: true}))
}