const express = require("express");
require("dotenv").config()

let app = express();
app.use(express.json());
let arr = [];
let id = 0;
let isdelete = false;

app.get("/Hello1", (req, res) => {
  res.redirect("/Hello");
});
app.get("/Hello", (req, res) => {
  res.send({ msg: "Hello world" });
});
app.get("/ulta", (req, res) => {});

app.post("/createProduct", (req, res) => {
   try { 
    obj = req.body;
    obj.isdelete = false;
    id++;
    obj.id = id;
    if (obj.name && obj.cost && obj.category) {
      let you = arr.find((val) => {
        return val.name == obj.name;
      });
      if (you == null) {
        arr.push(obj);
        res.status(201).send({ issuccessful: true, product: obj });
      }
      else {
        res.send({ issuccessful: false, msg: "Product already exists" });
      }
    } else {
      res.send({ issuccessful: false, msg: "Not a valid detail" });
    }
   
    
   } catch (error) {
    res.status(500).send({issuccessful:false,msg:error})
   }
});
app.put("/updateproduct", (req, res) => {
  try {
    let id = req.query.id;
    let idx = arr.findIndex((val) => val.id == id);
    if (idx >= 0) {
      let obj = arr[idx];
      obj = {
        ...obj,
        ...req.body,
      };
      arr[idx] = obj;
      res.status(200).send({ isSuccess: true, updatedVal: obj });
    } else {
      res.status(404).send({ isSuccess: false, msg: "Product not found" });
    }
  } catch (error) {
    res.status(500).send({issuccessful:false,msg:error})
  }
});
app.delete("/deleteproduct", (req, res) => {
  try {
    let id = req.query.id;
    let idx = arr.findIndex((val) => val.id == id);
    if (idx >= 0) {
      let mi = arr.splice(idx, 1);
      console.log(mi);
      res.status(200).send({ isSuccess: true, deleteproduct1: arr });
    } else {
      res.status(404).send({ isSuccess: false, msg: "Product not found" });
    }
    
  } catch (error) {
    res.status(500).send({issuccessful:false,msg:error})
    
  }
});
app.delete("/softdelete", (req, res) => {
  try {
    let id = req.query.id;
    let idx = arr.find((val) => val.id == id);
    if (idx && idx.isdelete == false) {
      idx.isdelete = true;
      // obj.isdelete=true;
  
      // let mi = arr.splice(idx,1);
      res.status(200).send({ isSuccess: true, deleteproduct1: arr });
      // console.log(mi);
    } else {
      res.status(404).send({ isSuccess: false, msg: "Product not found" });
    }
    
  } catch (error) {
    res.status(500).send({issuccessful:false,msg:error})
    
  }
});

app.get("/allfil", (req, res) => {
  try {
    // let fil = arr.filter((val) => {
    //   return val.isdelete == false;
    // });
    let fil1 = arr.filter((val) => {
      return val.cost>500 && val.cost<1000 && val.isdelete==false;
    });

    if (fil1) {
      res.status(200).send({ product: fil1 });
    }
    
  } catch (error) {
    res.status(500).send({issuccessful:false,msg:error})
    
  }
 
});
app.get("/sort",(req,res)=>{
  try {
    let sort1 = req.query.sort;
    if (sort1=="asc") {
      let arr1 = arr.sort((a,b)=>{
        return a.cost-b.cost;
      })
      res.status(200).send({ product: arr1 });
    }else if(sort1=="desc"){

      let arr2 = arr.sort((a,b)=>{
        return b.cost-a.cost;
      })
      res.status(200).send({ product: arr2 });
    }
    
  } catch (error) {
    res.status(500).send({issuccessful:false,msg:error})
    
  }
})
app.get("/all", (req, res) => {
  try {
    let fil = arr.filter((val) => {
      return val.isdelete == false;
    });
    if (fil) {
      res.status(200).send({ product: fil1 });
    }
    
  } catch (error) {
    res.status(500).send({issuccessful:false,msg:error})
    
  }
 
});
app.listen(process.env.PORT, () => {
  console.log("port started on 8000");
});
