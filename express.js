let express = require('express');
let mongoose =  require('mongoose');
let DbConnect = require('./db');
let app = express();
DbConnect();
app.use(express.json());
app.use(express.static(__dirname));

let userSchema = mongoose.Schema({
    Name:String,
    Age:Number,
    Course:String
})


let AllUser = mongoose.model('users',userSchema);

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'index.html')
});


app.get('/api/datas',async(req,res)=>{
    let users = await AllUser.find();
    res.send(users)
   
});


app.post('/api/addData',async (req,res)=>{
    const newuser = new AllUser(req.body);
    const resp = await newuser.save();
    if(resp){
        res.status(200).json({"message":"Added Success"})
    }
});


app.delete('/api/delete/:id',async (req,res)=>{
    const idd = req.params.id;
    const result = await AllUser.findOneAndRemove({_id:idd})
    if(result){
        res.status(200).json({"message":"Deleted"});
    }
}); 

app.put('/api/update',async (req,res)=>{
    const id = req.body._id;
    const updatedRec ={
        Name:req.body.Name,
        Age:req.body.Age,
        Course:req.body.Course
    }

    const result = await AllUser.findByIdAndUpdate(id,updatedRec,{new:true})
    if(result){
        res.status(201).json({"message":"Updated"});
    }
});

app.listen(8080,()=>console.log("http://localhost:8080"));