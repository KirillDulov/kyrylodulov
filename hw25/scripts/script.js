function createDomElement(tagName, textContent, container) {
    const element = document.createElement(tagName);
    element.textContent = textContent;
    container.appendChild(element);
    return element;
}

const container = document.body;
console.log(createDomElement('p', 'This paragraph has been added to the specified container.', container))


function setUserInfoCookie(key, value) {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(value);
    const cookieValue = `${encodedKey}=${encodedValue}`;

    const date = new Date();
    date.setTime(date.getTime() + 10 * 1000);
    let expires = 'expires=' + date.toUTCString();
    document.cookie = `userInfo=${cookieValue}; ${expires}; path=/`;

    console.log(`Cookie "userInfo" успішно збережено: ${cookieValue}`);
}
setUserInfoCookie('language', 'en');


function saveUserInfo(key, value) {
    sessionStorage.setItem(key, value);
    console.log("Saved key: value");
}
function getUserInfo(key) {
    const lastName = sessionStorage.getItem(key);
    console.log("Retrieved key: value")
    return lastName;
}

saveUserInfo('username', 'JohnDoe');
console.log(getUserInfo('username'))