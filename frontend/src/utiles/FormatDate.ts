
 const FormatDate = (dateString: string): string =>{
    return new Date(dateString).toLocaleString("en-US",
        {
            year:"numeric",
            month:"short",
            day:"numeric",
            hour:"numeric",
            minute:"numeric"
        })

}

 const FormatDateOnly = (dateString: string): string =>{
    return new Date(dateString).toLocaleString("en-US",
        {
            year:"numeric",
            month:"short",
            day:"numeric",

        })

}

export {FormatDate, FormatDateOnly}