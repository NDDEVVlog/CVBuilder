
export const getData = async(req,res) => {
    console.log(111)
    return res.status(200).json({name:'Nguyen Duy', age:18, job:'student'})
}

