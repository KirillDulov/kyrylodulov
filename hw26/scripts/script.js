function handleButtonClick(buttonId, message) {
    document.getElementById(buttonId).addEventListener('click', function () {
        console.log(message);
    });
}
handleButtonClick('myButton', 'Button clicked!');

function trackMousePosition() {
    document.addEventListener("mousemove", function (event) {
        myFunction(event);
    });

    function myFunction(e) {
        const x = e.clientX;
        const y = e.clientY;
        let coor = `Mouse X: ${x}, "Mouse Y: ${y}`;
        console.log(coor);
    }
}
console.log(trackMousePosition())

function createTestList() {
    document.body.innerHTML = `
    <ul id="testList">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
    `
}
createTestList()

function setupEventDelegation(selector) {
    const li = document.querySelector(selector);
    li.addEventListener('click', function (event) {
        const clickedElement = event.target;
        const text = clickedElement.textContent.trim();
        console.log(`Item clicked: ${text}`);

    });
}
setupEventDelegation('#testList')