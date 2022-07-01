  const getDateAndTime = (stringDate)=> {
    const date = new Date(stringDate)
    const day = date.getDate()
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const year = date.getFullYear()

    const hour = date.getHours()
    const minutes = date.getMinutes()

    return `${day}/${month}/${year} ${hour}:${minutes  < 10 ? `0${minutes}` : minutes }`
  }

  export default getDateAndTime