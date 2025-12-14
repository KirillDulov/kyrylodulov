const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const PORT = process.env.PORT || 3000;
const MAX_BODY_SIZE = 1 * 1024 * 1024;

function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function sendHTML(res, status, html) {
    const buffer = Buffer.from(html, 'utf8');

    res.writeHead(status, {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Length': buffer.length,
        'X-Content-Type-Options': 'nosniff'
    });

    res.end(buffer);
}

function sendFile(res, filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return sendHTML(res, 500, '<h1>Server Error</h1>');
        }

        sendHTML(res, 200, data);
    });
}

const server = http.createServer((req, res) => {
    console.log('METHOD >', req.method);
    console.log('URL >', req.url);

    if (req.method === 'GET') {
        if (req.url === '/') {
            return sendFile(res, path.join(__dirname, 'html', 'index.html'));
        }

        if (req.url === '/about') {
            return sendFile(res, path.join(__dirname, 'html', 'about.html'));
        }

        if (req.url === '/contact') {
            return sendFile(res, path.join(__dirname, 'html', 'contact.html'));
        }

        if (req.url === '/form') {
            return sendFile(res, path.join(__dirname, 'html', 'form.html'));
        }

        return sendHTML(res, 404, '<h1>Page Not Found</h1>');
    }

    if (req.method === 'POST') {
        if (req.url === '/submit') {
            let body = '';
            let size = 0;

            req.on('data', chunk => {
                size += chunk.length;

                if (size > MAX_BODY_SIZE) {
                    sendHTML(res, 413, '<h1>Payload Too Large</h1>');
                    req.destroy();
                    return;
                }

                body += chunk.toString();
            });

            req.on('end', () => {
                const formData = querystring.parse(body);

                const name = formData.name ? escapeHTML(formData.name.trim()) : '';
                const email = formData.email ? escapeHTML(formData.email.trim()) : '';

                if (!name || !email) {
                    return sendHTML(res, 400, '<h1>Invalid form data</h1>');
                }

                const html = `
                    <h1>Form Submitted</h1>
                    <p>Name: ${name}</p>
                    <p>Email: ${email}</p>
                `;

                return sendHTML(res, 200, html);
            });

            req.on('error', () => {
                sendHTML(res, 500, '<h1>Server Error</h1>');
            });

            return;
        }
    }

    sendHTML(res, 405, '<h1>Method Not Allowed</h1>');
});

server.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});

// hw58
// 1
const crypto = require('crypto');
const { pbkdf2Sync, randomBytes } = crypto;

function generateHash(input) {
    return crypto
        .createHash('sha256')
        .update(input, 'utf8')
        .digest('hex');
}

console.log(generateHash('Hello, World!'))

// 2
const password = 'superSecret123'
const salt = randomBytes(16).toString('hex')
const hash = generatePasswordHash(password, salt)

function generatePasswordHash(password, salt, iterations = 10000, keylen = 64, digest = 'sha512') {
    if (typeof password !== 'string' || typeof salt !== 'string') {
        throw new TypeError('Password and salt must be strings');
    }

    return pbkdf2Sync(password, salt, iterations, keylen, digest)
        .toString('hex');
}

console.log(hash);

// 3

const inputPassword = 'superSecret123'
const isCorrect = verifyPassword(inputPassword, hash, salt);

function verifyPassword(
    inputPassword,
    storedHash,
    salt,
    iterations = 10000,
    keylen = 64,
    digest = 'sha512',
) {
    if (typeof inputPassword !== 'string' || typeof storedHash !== 'string' || typeof salt !== 'string') {
        throw new TypeError('Input password, stored hash and salt must be strings');
    }

    const hashToCompare = pbkdf2Sync(inputPassword, salt, iterations, keylen, digest).toString('hex');
    return hashToCompare === storedHash;
}

console.log(isCorrect ? 'Пароль вірний.' : 'Пароль невірний.')

// hw59

// 1
const zlib = require('zlib');

async function compressFile(filePath) {
    try {
        await fs.promises.access(filePath);
        const compressedPath = `${filePath}.gz`;

        let finalPath = compressedPath;
        let counter = 1;

        while (fs.existsSync(finalPath)) {
            finalPath = `${filePath}(${counter}).gz`;
            counter++;
        }

        const readStream = fs.createReadStream(filePath);
        const writeStream = fs.createWriteStream(finalPath);
        const gzip = zlib.createGzip();

        readStream
            .pipe(gzip)
            .pipe(writeStream);

        await new Promise((resolve, reject) => {
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });

        return finalPath;

    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('Файл не знайдено');
        }

        throw new Error('Помилка під час компресії');
    }
}

// 2
async function decompressFile(compressedFilePath, destinationFilePath) {
    try {
        await fs.promises.stat(compressedFilePath);

        let finalPath = destinationFilePath;
        let counter = 1;

        while (fs.existsSync(finalPath)) {

            const ext = path.extname(destinationFilePath);
            const base = path.basename(destinationFilePath, ext);

            finalPath = path.join(path.dirname(destinationFilePath), `${base}(${counter})${ext}`);
            counter++;
        }

        const readStream = fs.createReadStream(compressedFilePath);
        const writeStream = fs.createWriteStream(finalPath);
        const gunzip = zlib.createGunzip();

        readStream.pipe(gunzip).pipe(writeStream);

        await new Promise((resolve, reject) => {
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });

        return finalPath;

    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('Файл не знайдено');
        }
        throw new Error('Помилка під час розпакування');
    }
}

async function performCompressionAndDecompression() {
    try {
        const compressedResult = await compressFile('./source.txt')
        console.log(compressedResult)
        const decompressedResult = await decompressFile(compressedResult, './source_decompressed.txt')
        console.log(decompressedResult)
    } catch (error) {
        console.error('Error during compression or decompression:', error)
    }
}
performCompressionAndDecompression()
