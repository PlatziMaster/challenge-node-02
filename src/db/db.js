const fs = require('fs');
const path = require('path')
const getTime = require('../utils/getTime');
const sendSMS =  require('../utils/notification')

const getData = () => {
    let rawdata = fs.readFileSync(path.join(__dirname,'data.json'));
    return JSON.parse(rawdata);
}

const writeData= (records) => {
    console.log(records);
    
    let data = JSON.stringify(records);
    fs.writeFileSync(path.join(__dirname,'data.json'), data);
}

const validateRecord = ({records},value) =>{
    if(records.length === 0){
        return true
    }else{
        const lastRecord = records[records.length - 1]
        if(lastRecord.value==value){
            return false
        }
        return true
    }
}

const addRecord = async (value) =>{

    let data = getData();
    if(validateRecord(data, value)){
        const record = {
            value, timestamp: getTime()
        }
        
        data.records = [...data.records,record]
        writeData(data)
        console.log(`La temperatura actual en poza rica es ${value}`);
        sendSMS(value)
    }
}







module.exports = addRecord