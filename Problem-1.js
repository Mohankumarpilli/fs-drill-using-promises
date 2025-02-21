// Problem 1:
    
//     Using callbacks and the fs module's asynchronous functions, do the following:
//         1. Create a directory of random JSON files
//         2. Delete those files simultaneously 

const fs = require('fs');

function create_folder(){
    return new Promise( (resolve,rejects) => {
        fs.mkdir('./randomFolder', {recursive : true} ,(err) => {
            if(err){
                rejects(err.message);
                return;
            }
            let data = 'Folder is created'
            resolve(data);
        })
    })
}

function create_files(data){
    return new Promise( (resolve,reject) => {
        let count = 0;
        for(let ele of data){
            fs.writeFile(`./randomFolder/${ele}`,`hello ${ele}`,(err) => {
                if(err){
                    reject(err.message);
                    return;
                }
                console.log(ele,'file is created');
                count++;
                if(count==3){
                    resolve('files created');
                }
            });
        }
    })
}

function delete_files(data){
    return new Promise( (resolve,reject) => {
        let count = 0;
        for(let ele = 0; ele < data.length; ele++){
            fs.unlink(`./randomFolder/${data[ele]}`, err => {
                if(err){
                    reject(err.message);
                    return;
                }
                console.log(arr[ele],'file is deleted');
                count++;
                if(count==3){
                    resolve('files created');
                }
            })
        }
    })
}

let arr = ['1.json', '2.json' , '3.json'];

function chaining_promises(){
    create_folder().then( (data) => {
        console.log(data)
        return create_files(arr);
    }).then( (data) => {
        console.log(data);
        return delete_files(arr);
    }).then( (data) => {
        console.log(data);
    }).catch((message) => {
        console.log(message);
    })
}

module.exports = chaining_promises;