import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('userAddress.db')
export const  init = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS address (id INTEGER PRIMARY KEY NOT NULL,name TEXT NOT NULL,tlp REAL NOT NULL,address TEXT NOT NULL,mark_as TEXT NOT NULL,primary_address TEXT NOT NULL,image TEXT NOT NULL,lat TEXT NOT NULL,lang TEXT NOT NULL);',
                [],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                },
            );
        });
    });
}
// await dispatch(usersAction.addUserAddress(formState.inputValues.name,formState.inputValues.tlp,formState.inputValues.address,formState.inputValues.mark_as,formState.inputValues.primary_address,formState.inputValues.image,formState.inputValues.lat,formState.inputValues.lang))

export const insertPlace = (name,tlp,address,mark_as,primary_address,image,lat,lang) => {
    console.log(name,tlp,address,mark_as,primary_address,image,lat,lang)
    const promise = new Promise((resolve,reject) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO address (name,tlp,address,mark_as,primary_address,image,lat,lang) values (?,?,?,?,?,?,?,?) ',
            [name,tlp,address,mark_as,primary_address,image,lat,lang],
            (_,result) => {
                console.log(result)
                resolve(result)
            },
            (_,err) => {
                console.log(err)
                reject(err)
            })
        })
    })
    return promise
}


export const fetchPlace = () => {
    const promise = new Promise((resolve,reject) => {
        db.transaction((tx) => {
            tx.executeSql('select * from address',
            [],
            (_,result) => {
                resolve(result)
            },
            (_,err) => {
                console.log(err)
                reject(err)
            })
        })
    })
    return promise
}