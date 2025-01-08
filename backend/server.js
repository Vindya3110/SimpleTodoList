
const express =require('express')
const mysql=require('mysql')
const cors=require('cors')

const app=express();
app.use(cors());
app.use(express.json())
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Deva@2507',
    database: 'todolist',
    });
 
connection.connect((err)=>{
    if(err) throw err
    console.log("Connected to mysql");
    const creatTableQuery=`create table if not exists todo(
        id INT AUTO_INCREMENT PRIMARY KEY,
        todo VARCHAR(255)
    )`;
    connection.query(creatTableQuery,(err)=>{
        if(err) throw err 
        console.log("todo table created");
    });
});    

app.post("/todo",async(req,res)=>{
    console.log("posting");
    const data=req.body.todo;
    const query='insert into todo (todo) values(?)';
    connection.query(query,[data],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500);
        }
        const newTodo = { id: result.insertId, todo: data };
    res.status(201).send(newTodo);
        // res.status(200).send(result);
    });
})

app.get("/todo",async(req,res)=>{
    const query="select * from todo";
    connection.query(query,(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500);
        }
        res.status(200).send(result);
    })

})

app.delete("/todo/:id",(req,res)=>{
    const {id}=req.params;
    const query="DELETE FROM todo WHERE id=?";
    connection.query(query,[id],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500);
        }
        res.status(200).send(result);
    })
})

const PORT = 8080;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
