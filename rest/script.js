const {error} = require('console'); // display in the console 
const express = require('express'); //import express framework
const fs = require('fs'); // file system module
const app = express();  // creating express app
const port=3000;
const cors= require('cors');
app.use(cors());
app.use(express.json());

app.get('/students', (req, res) =>{
    fs.readFile('./students.json', 'utf-8', (err,data)=>{
        if(err){
            res.status(500).send('File reader error.');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.post('/students', (req,res)=>{
    const newStudent=req.body;
    fs.readFile('./students.json','utf-8',(err,data)=>{
        if(err){
            res.status(500).send('File reader error.');
            return;
        }
        const students=JSON.parse(data);
        students.push(newStudent);
        fs.writeFile('./students.json', JSON.stringify(students,null,2), (err)=>{
            if(err){
                res.status(500).send('File writer error.');
                return;
            }
            res.status(201).send("saved.");
        });
    });
});


app.delete('/students/:id', (req, res)=>{
    const studentId=parseInt(req.params.id);
    fs.readFile('./students.json', 'utf-8', (err,data)=>{
        if(err){
            res.status(500).send("File reader error.");
            return;
        }
        let students=JSON.parse(data);
        const index=students.findIndex(student=>student.id == studentId);

        if (index === -1) {
            res.status(404).send("Öğrenci bulunamadı.");
            return;
        }

        // Öğrenciyi diziden çıkar
        students.splice(index, 1);

        fs.writeFile('./students.json', JSON.stringify(students, null, 2), err => {
            if (err) {
                console.error(err); // Hata detaylarını konsola yazdır
                res.status(500).send('Dosyaya yazma hatası.');
                return;
            }
            res.status(200).send("Başarı ile silindi.");
        });
    });
});


app.put('/students/:id', (req,res) =>{
    const studentId=parseInt(req.params.id);
    const updatedStudent=req.body;

    fs.readFile('./students.json','utf-8',(err,data)=>{
        if(err){
            console.error(err);
            res.status(500).send("file reader error.");
            return;
        }
        let students=JSON.parse(data);
        const index=students.findIndex(student=> student.id ===studentId);

        if(index===-1){
            res.status(404).send("student not found.");
            return;
        }

        students[index]={...students[index], ...updatedStudent};

        fs.writeFile('./students.json',JSON.stringify(students, null, 2), err=>{
            if(err){
                console.log(err);
                res.status(500).send("file writer error.");
                return;
            }
            res.status(200).send("updated.");
        });
    });
});



//course CRUD

app.get('/courses', (req,res)=>{
    fs.readFile('./courses.json', 'utf-8', (err,data)=>{
        if(err){
            res.status(500).send('File reader error.');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.post('/courses', (req, res)=>{
    const newCourse=req.body;
    fs.readFile('./courses.json', 'utf-8', (err,data) =>{
        if(err){
            res.status(500).send('File reader error.');
            return;
        }
        const courses=JSON.parse(data);
        courses.push(newCourse);
        fs.writeFile('./courses.json', JSON.stringify(courses,null,2), (err)=>{
            if(err){
                res.status(500).send('File writer error.');
                return;
            }
            res.status(201).send("saved");
        });
    });
});

app.put('/courses/:id', (req,res) =>{
    const courseId=parseInt(req.params.id);
    const updatedCourse=req.body;

    fs.readFile('./courses.json','utf-8',(err,data)=>{
        if(err){
            console.error(err);
            res.status(500).send("file reader error.");
            return;
        }
        let courses=JSON.parse(data);
        const index=courses.findIndex(course=> course.id ===courseId);

        if(index===-1){
            res.status(404).send("course not found.");
            return;
        }

        courses[index]={...courses[index], ...updatedCourse};

        fs.writeFile('./courses.json',JSON.stringify(courses, null, 2), err=>{
            if(err){
                console.log(err);
                res.status(500).send("file writer error.");
                return;
            }
            res.status(200).send("updated.");
        });
    });
});

app.delete('/courses/:id', (req, res)=>{
    const courseId=parseInt(req.params.id);
    fs.readFile('./courses.json', 'utf-8', (err,data)=>{
        if(err){
            res.status(500).send("File reader error.");
            return;
        }
        let courses=JSON.parse(data);
        const index=courses.findIndex(course=>course.id == courseId);

        if (index === -1) {
            res.status(404).send("kurs bulunamadı.");
            return;
        }

        // Öğrenciyi diziden çıkar
        courses.splice(index, 1);

        fs.writeFile('./courses.json', JSON.stringify(courses, null, 2), err => {
            if (err) {
                console.error(err); // Hata detaylarını konsola yazdır
                res.status(500).send('Dosyaya yazma hatası.');
                return;
            }
            res.status(200).send("Başarı ile silindi.");
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});