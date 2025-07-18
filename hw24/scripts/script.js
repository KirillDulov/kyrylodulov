function sumArray(numbers) {
    return numbers.reduce((sum, currentValue) => sum + currentValue, 0);
}
const exampleArray = [1, 2, 3, 4, 5]
const sum = sumArray(exampleArray);
console.log('Сума елементів масиву:', sum)


function doubleArrayElements(numbers) {
    return numbers.map(number => number * 2);
}
const exampleArray = [1, 2, 3, 4, 5]
const doubledArray = doubleArrayElements(exampleArray)
console.log('Подвоєні елементи масиву:', doubledArray)


class SkillsManager {
    constructor() {
        this.skills = [];
    }

    addSkill(skill) {
        if (typeof skill === 'string' && skill.length >= 2) {
            const cleanSkill = skill;
            this.skills.push(cleanSkill);
            return cleanSkill;
        }
        return null;
    }
    getAllSkills() {
        return this.skills;
    }
}
const skillsManager = new SkillsManager()
console.log(skillsManager.addSkill('JavaScript'))
console.log(skillsManager.addSkill('CSS'))
console.log(skillsManager.getAllSkills())


function DateCalculator(initialDate) {
    this.currentDate = new Date(initialDate);

    this.addDays = function (days) {
        this.currentDate.setDate(this.currentDate.getDate() + days);
    };

    this.subtractDays = function (days) {
        this.currentDate.setDate(this.currentDate.getDate() - days);
    };

    this.getResult = function () {
        const year = this.currentDate.getFullYear();
        const month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(this.currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
}

const dateCalculator = new DateCalculator('2023-01-01')
dateCalculator.addDays(5)
console.log(dateCalculator.getResult())