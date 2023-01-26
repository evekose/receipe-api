exports.getAll=async (req, res)=>{
    let connection
    try{
        connection = await pool.getConnection()
        const rows=await connection.query("SELECT id, name FROM customers")
        console.log(rows)
        res.send(rows)

        
    }catch(error){
        throw error

    }finally{
        if(connection)return connection.end()
    }
}