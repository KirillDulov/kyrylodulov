function isValidEmail(email) {
    const regExp = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,6}$/;
    return regExp.test(email);
}
console.log(isValidEmail('example@example.com'))
console.log(isValidEmail('invalid-email'))

function isValidUrl(url) {
  const validUrl = /^(https?):\/\/([^:/]+)(?::(\d+))?([^?#]*)(\?[^#]*)?(#.*)?$/;
  return validUrl.test(url);
}
console.log(isValidUrl('https://www.example.com'))
console.log(isValidUrl('invalid-url'))