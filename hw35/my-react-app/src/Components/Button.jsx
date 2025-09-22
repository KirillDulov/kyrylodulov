export default function Button() {

    const handleClick = () => {
        alert("Кнопка натиснута!");
    };

    return (
        <button type="button" onClick={handleClick}>
            Натисни мене
        </button>
    );
}
