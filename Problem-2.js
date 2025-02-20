// 1. Read the given file lipsum.txt
// 2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
// 3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
// 4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
// 5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.

const fs = require('fs');

function read_files(path){
    return new Promise ( (resolve,reject) => {
        fs.readFile(path,'utf-8',(err,data) => {
            if(err){
                reject(err.message);
                return;
            }
            resolve(data);
        })
    })
}

function write_files(path,data,message){
    return new Promise( (resolve,reject) => {
        fs.writeFile(path, data,(err) => {
            if(err){
                reject(err.message);
                return;
            }
            resolve(message);
        })
    })
}

function append_files(path,data,message){
    return new Promise( (resolve,reject) => {
        fs.appendFile(path,data, (err) =>{
            if(err){
                reject(err.message);
                return;
            }
            resolve(message);
        })
    })
}

function unlink_files(path){
    return new Promise( (resolve,reject) => {
        fs.unlink(path, (err) => {
            if(err){
                reject(err.message);
                return;
            }
            resolve('deletion completed')
        })
    })
}
function Read_Lipsum(){
    return new Promise( (resolve,rejects) => {
        read_files('../lipsum.txt').then( (data) => {
            resolve(data);
        }).catch( (err) => {
            rejects(err);
        })
    })
}

function Upper_Case_Convertion(data){
    return new Promise( (resolve,reject) => {
        const upper_case = data.toUpperCase();
        
        write_files('./filenames.txt','Upper_case_Content.txt',`2 file Upper_case_Content.txt name is been added to filenames.txt`).then( (data) => {
            console.log(data);
            return write_files('./Upper_case_Content.txt', upper_case,'upper case file is been created')
        }).then( (data) => {
            resolve(data);
        }).catch( (err) => {
            reject(err);
        })
        
    })
}

function Lower_Case_Convertion(){
    return new Promise( (resolve,reject) => {
        read_files('./Upper_case_Content.txt').then( (lower_case) => {
            const sentence =lower_case.toLowerCase().split('. ').sort().map( ele => {
                if(ele.length> 0){
                    return ele;
                }
            });
            append_files('./filenames.txt','\nLower_case_Content.txt','4 Lower_case_content.txt name is added to filenames.txt').then( (data) => {
                console.log(data);
                write_files('./Lower_case_Content.txt', (sentence.join('\n')),'lower case file is been created').then( (data) =>{
                    resolve(data);
                }).catch( (err) => {
                    reject(err);
                })
            }).catch((err) => {
                reject(err)
            })
        }).catch( (err) => {
            reject(err);
        })
    })
}

function Sort_Both_Files(){
    return new Promise( (resolve,reject) => {
        read_files('./Upper_case_Content.txt').then( (upperCase) => {
            read_files('./Lower_case_Content.txt').then( (lowerCase) => {
                const  combinedText = `${upperCase}. ${lowerCase}`;

                let new_data = combinedText.toLowerCase().split(' ').sort();
                append_files('./filenames.txt','\nSorted_files.txt','6 sorted_files.txt name is added to filenames.txt').then( (data) => {
                    console.log(data);
                    write_files('./Sorted_files.txt',(new_data.join('\n')),'file Sorted is created').then( (data) => {
                        resolve(data);
                    }).catch( (err) => {
                        reject(err);
                    })
                }).catch( (err) => {
                    reject(err);
                })
            }).catch( (err) => {
                reject(err);
            })
        }).catch( (err) => {
            reject(err);
        })
    })
}

function Delete_files(){
    return new Promise( (resolve,reject) => {
        read_files('./filenames.txt').then( (data) => {
            let filenames = data.split('\n');
            let count = 1;
            for(let ele of filenames){
                unlink_files(`./${ele}`).then( (data) => {
                    console.log(`${ele}`,data);
                    count++;
                    if(count == filenames.length+1){
                        resolve('8 deleted all files');
                    }
                }).catch( (err)=>{
                    reject(err);
                })

            }
        }).catch( (err)=>{
            reject(err);
        })
    })
}

    
function promise_chaining(){
    Read_Lipsum().then( (data) => {
        console.log('1 lipsum file is readed');
        return Upper_Case_Convertion(data);
    }).then( (data) => {
        console.log('3',data);
        return Lower_Case_Convertion()
    }).then( (data) => {
        console.log('5',data);
        return Sort_Both_Files();
    }).then( (data) => {
        console.log('7',data);
        return Delete_files();
    }).then((data) => {
        console.log(data);
    }).catch( (err) => {
        console.log(err);
    })
}

module.exports = promise_chaining;