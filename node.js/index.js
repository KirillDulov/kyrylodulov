// 1
// function isDebugMode() {
// const env = process.env.NODE_ENV?.trim();
// const debug = env === 'development';
// const production = env === 'production';
// 
// console.log('NODE_ENV:', env);
// console.log('Debug mode:', debug);
// console.log('Production mode:', production);
// 
// return debug;
// }
// isDebugMode();
// 
// 
// 2 - 3
// function joinStrings(...args) {
// return args.join(':');
// }
// 
// function encodeToBase64(...args) {
// try {
// const joinedString = joinStrings(...args);
// const encoded = Buffer.from(joinedString, 'utf-8').toString('base64');
// console.log('Успішно закодовано в Base64:', encoded);
// return encoded;
// } catch (error) {
// console.error('Помилка при кодуванні в Base64:', error.message);
// return null;
// }
// }
// 
// function encodeToHex(...args) {
// try {
// const joinedString = joinStrings(...args);
// const encoded = Buffer.from(joinedString, 'utf-8').toString('hex');
// console.log('Успішно закодовано в Hex:', encoded);
// return encoded;
// } catch (error) {
// console.error('Помилка при кодуванні в Hex:', error.message);
// return null;
// }
// }
// 
// function safeDecodeFromBase64(base64String) {
// try {
// const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
// if (!base64Regex.test(base64String) || base64String.length % 4 !== 0) {
// throw new Error('Невірний рядок Base64');
// }
// const decoded = Buffer.from(base64String, 'base64').toString('utf-8');
// console.log('Успішно декодовано Base64:', decoded);
// return decoded;
// } catch (error) {
// console.error('Помилка при декодуванні Base64:', error.message);
// return null;
// }
// }
// 
// function decodeFromHex(hexString) {
// try {
// const hexRegex = /^[0-9a-fA-F]*$/;
// if (!hexRegex.test(hexString) || hexString.length % 2 !== 0) {
// throw new Error('Невірний рядок Hex');
// }
// const decoded = Buffer.from(hexString, 'hex').toString('utf-8');
// console.log('Успішно декодовано Hex:', decoded);
// return decoded;
// } catch (error) {
// console.error('Помилка при декодуванні Hex:', error.message);
// return null;
// }
// }
// 
// const base64Encoded = encodeToBase64('john@email.com', '123', 'extraData')
// 
// const safeBase64Decoded = safeDecodeFromBase64(base64Encoded)
// 
// 
// import { error } from 'console';
// hw55
// *1
// import { writeFile, readFile, unlink } from 'fs/promises';
// import { nextTick } from 'process';
// 
// async function writeFileAsync(filename, content) {
// try {
// await writeFile(filename, content, 'utf8');
// console.log(`Файл успішно записано: ${filename}`);
// } catch (err) {
// console.error('Помилка при записі файлу:', err);
// throw err;
// }
// }
// 
// *2
// async function readFileAsync(filename) {
// try {
// const content = await readFile(filename, 'utf8');
// console.log(`Файл успішно прочитано: ${filename}`);
// return content;
// } catch (err) {
// if (err.code === 'ENOENT') {
// console.error(`Файл не існує: ${filename}`);
// } else {
// console.error('Помилка при читанні файлу:', err);
// }
// throw err;
// }
// }
// 
// *3
// async function deleteFileAsync(filename) {
// try {
// await unlink(filename);
// console.log(`Файл успішно видалено: ${filename}`);
// } catch (err) {
// if (err.code === 'ENOENT') {
// console.error(`Файл не існує: ${filename}`);
// } else {
// console.error('Помилка при видаленні файлу:', err);
// }
// throw err;
// }
// }
// 
// async function main() {
// const filename = 'example.txt';
// const content = 'Привіт, це тестовий файл!';
// 
// try {
// await writeFileAsync(filename, content);
// 
// const readContent = await readFileAsync(filename);
// console.log('Прочитаний вміст:', readContent);
// 
// await deleteFileAsync(filename);
// } catch (err) {
// console.error('Сталася помилка:', err);
// }
// }
// 
// main();


// hw56
function asyncOperationDemo(callback) {
    console.log("Перший виклик");

    process.nextTick(() => {
        try {
            console.log("Виконано nextTick");
            callback("nextTick");
            console.log("Завершено виконання: nextTick");
        } catch (error) {
            console.log("Помилка у nextTick:", error)
        };
    });

    setImmediate(() => {
        try {
            console.log("Виконано setImmediate");
            callback("setImmediate:");
            console.log("Завершено виконання: setImmediate");
        } catch {
            console.log("Помилка у setImmediate:", error);
        };
    });

    setTimeout(() => {
        try {
            console.log("Виконано setTimeout");
            callback("setTimeout");
            console.log("Завершено виконання: setTimeout");
        } catch {
            console.log("Помилка у setTimeout:", error)
        }
    }, 0);

    console.log("Останній виклик");
}

asyncOperationDemo(operation => {
    console.log(`Завершено виконання: ${operation}`);
});