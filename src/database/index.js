'use strict';
const _ = require('lodash');
const db = require('./db.js');


// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(dataAccessMethod());
        }, 500);
    });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
    const dataAccessMethod = () => _.map(db.usersById, userInfo => userInfo)
    return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = (item) => {
    const dataAccessMethod = () => {
        // fill me in :)
    
        const countOfAges={};
        const filterUserByItem=_.filter(db.usersById,userInfo=>{
            const username=userInfo.username;
            return db.itemsOfUserByUsername[username].includes(item);
        }).forEach(userInfo=>{
            const age=userInfo.age;
            countOfAges[age]=countOfAges[age]+1||1;
        });

        const agesCount=[];
        Object.entries(countOfAges).forEach(([key,value])=>{
            agesCount.push({age:key,count:value});
        })
        return agesCount;

    }
    return mockDBCall(dataAccessMethod);
}

module.exports = {
    getUsers,
    getListOfAgesOfUsersWith
};
