export function initialize()
{
    let applicationDb = indexedDB.open(DATABASE_NAME, CURRENT_VERSION);
    applicationDb.onupgradeneeded = function ()
    {
        let db = applicationDb.result;
        db.createObjectStore("menus", { keyPath: "code" });
        db.createObjectStore("visits", { keyPath: "id" });
        db.createObjectStore("plants", { keyPath: "id" });
        db.createObjectStore("associations", { keyPath: "id" });
        db.createObjectStore("visit_images", { keyPath: "visitId" });
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

export async function getById(collectionName, id)
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

export async function remove(collectionName, id)
{
    let request = new Promise((resolve) =>
    {
        let blazorSchoolIndexedDb = indexedDB.open(DATABASE_NAME, CURRENT_VERSION);
        blazorSchoolIndexedDb.onsuccess = function ()
        {
            let transaction = blazorSchoolIndexedDb.result.transaction(collectionName, "readwrite");
            let collection = transaction.objectStore(collectionName);
            let result = collection.delete(id);

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