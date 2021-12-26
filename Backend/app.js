const express = require('express');
const app = new express();
const cors = require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;
const trainerData = require('./src/model/signupModel');  // This is the model containing trainer sign up data
// MULTER:
const DIR = '../Frontend/src/assets/uploads';
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,DIR);
    },
    filename:(req,file,cb)=>{
        const fileName = file.originalname.toLocaleLowerCase().split(' ').join('-');
        cb(null,fileName);
    }
});
var upload = multer({
    storage:storage,
    limits:{
        fileSize:1024 * 1024 * 5
    },
    // fileFilter:(req, file, cb)=>{
    //     if(file.mimetype == "image/png" || file.mimetype == "image/jpp" || file.mimetype == "image/jpeg"){
    //         cb(null,true);
    //     } else{
    //         cb(null,false);
    //         return cb(new Error('Only .png, .jpg and .jpeg format allowed'));
    //     }
    // }
});
function verifyToken(req,res,next){
  if(!req.headers.authorization){
      return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  // console.log("tokenHEADER"+token);
  if(token=='null'){
      return res.status(401).send('Unauthorized req')
  }
  try {
    let payload = jwt.verify(token,'SECRET-KEY');
    req.userId = payload.subject
  } catch (err) {
    console.error("INVALID TOKEN SECRET KEY");
    return res.status(401).send("Unauthorized request. Only access to authorized entry");
  }
  next();
}
// app. use starts here:
app.use(express.json()) //This is instead of using body parser
app.use(express.urlencoded({ extended: true }));
// app.use('/public',express.static('./public'))
app.use(cors());

const signUpRouter = require('./src/routes/signUpRoute');
app.post('/registerTrainer',signUpRouter);
const loginRouter = require('./src/routes/loginRoute')
app.post('/login', loginRouter)


app.get('/trainers',verifyToken,function(req,res){      //getting trainers details
    trainerData.find({ isApproved:"false"})
    .then(function(trainers){
      console.log("success")
        res.send(trainers);

    });
});
app.get('/trainerdtl',verifyToken,function(req,res){      //getting trainers details
    trainerData.find({ isAllocated: "false" ,isApproved:"true"  })
    .then(function(trainers){
      console.log("success")
        res.send(trainers);

    });
});

app.put('/approve',verifyToken,(req,res)=>{   //aprrove trainers
    console.log(req.body)
    id=req.body._id;
    emptype=req.body.emptype;
    console.log(emptype);


    trainerData.findByIdAndUpdate({"_id":id},{$set:{
        "isApproved":"true",
        "emptype":emptype
      }})
      .then(function(){
        res.send()
      })
      })
      app.get('/:id',(req,res)=>{
        const id=req.params.id;
        console.log(id)
            trainerData.findOne({"_id":id})
            .then((trainer)=>{
                res.send(trainer);
            })
        
      
      })

      app.put('/allocate',verifyToken,function(req,res){     //allocate trainers
    console.log(req.file);
    id=req.body._id;
        courseid=req.body.courseid,
        batchid=req.body.batchid,
        scheduletime=req.body.scheduletime,
        startdate=req.body.startdate,
        enddate=req.body.enddate,
        venue=req.body.venue,

    trainerData.findByIdAndUpdate({"_id":id},{$set:{
        "courseid":courseid,
       "batchid":batchid,
        "scheduletime":scheduletime,
        "startdate":startdate,
       "enddate":enddate,
        "venue":venue,
        "isAllocated":"true" //employment type

        }})
        .then(function(){
          res.send()
        })
        })


        app.delete('/reject/:id',(req,res)=>{
            id=req.params.id;
         console.log(id);
            trainerData.findByIdAndDelete({"_id":id})
        .then(()=>{
            console.log("success delete");
            res.send();
        })
    })

// trainer profile

app.get('/profile/:id',verifyToken,function(req,res){
    const id= req.params.id;
    
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')
    trainerData.findOne({"_id":id})
    
          .then(function(trainerData){
              // console.log("Profile = "+trainerData);
              res.send(trainerData);
          });
});



// to edit trainer profile


app.put('/editprofile',verifyToken,upload.single('img'),(req,res)=>{
  // Here imgFile will store the image file from file input if its selected OR
  // If no file was selected in edit profile page then just keep the same file name from db which is previously stored during sign up
  let imgFile = req.file;
  if(imgFile){
    imgFile = imgFile.filename;
  }else{
    // keep the image saved during signup
    imgFile = req.body.dbImage
  }

  id = req.body._id,
  trainerName = req.body.name,
  email = req.body.email,
  phone = req.body.phone,
  address = req.body.address,
  h_qualification = req.body.h_qualification,
  skillSet = req.body.skillSet,
  company_name = req.body.company_name,
  designation = req.body.designation,
  img = imgFile

  trainerData.findByIdAndUpdate({_id:id},
                          {$set:{"name":trainerName,
                                "email":email,
                                "phone":phone,
                                "address":address,
                                "h_qualification":h_qualification,
                                "skillSet":skillSet,
                                "company_name":company_name,
                                "designation":designation,
                                "img":img}})
              .then(()=>{
                res.send();
              })
  
// app.post('/editprofile',function(req,res){
//     res.header("Access-Control-Allow-Origin","*");
//     res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS');
//     console.log(req.body);


//     var trainerData ={
//         _id : req.body.trainerData._id,
//         name : req.body.trainerData.name,
//         email : req.body.trainerData.email,
//         phone : req.body.trainerData.phone,
//         address : req.body.trainerData.address,
//         h_qualification : req.body.trainerData.h_qualification,
//         skillSet : req.body.trainerData.skillSet,
//         company_name : req.body.trainerData.company_name,
//         designation : req.body.trainerData.designation,
//         courses : req.body.trainerData.courses,
//         img : req.body.trainerData.img
       
    
//     }


});


app.listen(port,()=>{console.log("Server ready at "+port);})