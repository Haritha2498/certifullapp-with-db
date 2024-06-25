const express = require('express');
const path = require('path');
const app = express();

const mongoose=require('mongoose')
const sample =require ('./Models/schema.js')

const dotenv=require('dotenv')
dotenv.config();


const url=process.env.mongodb_uri;
mongoose.connect(
    url
);const database=mongoose.connection;

database.on("error",(error)=>
{
    console.log(error);
});
database.once("connected",()=>
{
    console.log("Database connected")
})




// app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

// let certificates = [];





app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/issue', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'issueCertificate.html'));
});

// Route to handle form submissions
app.post('/submit-form',  async (req, res) => {
    // const { certificateID,courseName, candidateName, grade, date } = req.body;

    // // Store form data in the array
    // certificates.push({ certificateID, courseName, candidateName, grade, date });


    try{
        const data=req.body;
        console.log(data);
        const details=await sample.create(data)           //creates a field in sample collection
        res.status(201).redirect('/thank-you');
    }
    catch(error){
        console.log(error)
        res.status(500).json()
    }

    
    // Redirect to the certificate view page with the details
    // res.redirect(`/certificate?id=${id}`);
});

app.get('/thank-you', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'formsubmitted.html'));
});

app.get('/certificate', (req,res) => {
    res.json(certificates);
})

app.get("/certificate/:id", (req, res) => {
//   const id = req.params.id;
//   const certificate = certificates.find((cert) => cert.certificateID == id);
//   if (!certificate) {
//     return res.status(404).send("Certificate not found");
//   }

  res.sendFile(path.join(__dirname, 'public', 'view.html'));
  
});

app.get('/api/certificate/:id',async (req, res) => {
    const id = req.params.id;
    // const certificate = certificates.find(cert => cert.certificateID == id);
    // if (!certificate) {
    //     return res.status(404).json({ error: 'Certificate not found' });
    // }
    // res.json(certificate);


    const details = await sample.findOne({certi_id: id});

   console.log("details",details);
 
 
    res.json(details);
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});