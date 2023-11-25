export function initialize()
{
    let applicationDb = indexedDB.open(DATABASE_NAME, CURRENT_VERSION);
    applicationDb.onupgradeneeded = function ()
    {
        let db = applicationDb.result;
        db.createObjectStore("options", { keyPath: "menu" });
        db.createObjectStore("visits", { keyPath: "id" });
    }
}

export function deleteDatabase()
{
    let applicationDb = indexedDB.deleteDatabase(DATABASE_NAME);
    applicationDb.onsuccess = function ()
    {
        console.log("Database deleted successfully");
    }
}

export function set(collectionName, value)
{
    let applicationDb = indexedDB.open(DATABASE_NAME, CURRENT_VERSION);

    applicationDb.onsuccess = function ()
    {
        let transaction = applicationDb.result.transaction(collectionName, "readwrite");
        let collection = transaction.objectStore(collectionName)
        collection.put(value);
    }
}

export async function get(collectionName)
{
    let request = new Promise((resolve) =>
    {
        let applicationDb = indexedDB.open(DATABASE_NAME, CURRENT_VERSION);
        applicationDb.onsuccess = function ()
        {
            let transaction = applicationDb.result.transaction(collectionName, "readonly");
            let collection = transaction.objectStore(collectionName);
            let result = collection.getAll();

            result.onsuccess = function (e)
            {
                resolve(result.result);
            }
        }
    });

    return await request;
}

export async function getByKey(collectionName, id)
{
    let request = new Promise((resolve) =>
    {
        let blazorSchoolIndexedDb = indexedDB.open(DATABASE_NAME, CURRENT_VERSION);
        blazorSchoolIndexedDb.onsuccess = function ()
        {
            let transaction = blazorSchoolIndexedDb.result.transaction(collectionName, "readonly");
            let collection = transaction.objectStore(collectionName);
            let result = collection.get(id);

            result.onsuccess = function (e)
            {
                resolve(result.result);
            }
        }
    });

    return await request;
}

let CURRENT_VERSION = 1;
let DATABASE_NAME = "FiscalLabApp";