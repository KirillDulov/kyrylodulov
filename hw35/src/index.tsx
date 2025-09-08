import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.scss';
// import bike from './image/bmw_s1000rr.jpeg';
// import HTMLImageElement from './image/bmw_s1000rr.jpeg';
// import document from './image/bmw_s1000rr.jpeg'
// 
// 
// 
// let img: HTMLImageElement = document.createElement('img');
// img.src = bike;
// document.body.appendChild(img);
// 
// console.log('im entry point12');

const container = document.getElementById('root');
createRoot(container!).render(<App />);

// Task 1
function sumArray(numbers: any) {
    return numbers.reduce((acc: any, num: any) => acc + num, 0)

}
console.log(sumArray([1, 2, 3, 4]))
console.log(sumArray([]))

// Task2
type User = {
    name: string;
    age: number;
    isActive: boolean;
};

function createUser(name: string, age: number, isActive: boolean = true): User {
    return {
        name,
        age,
        isActive
    };
}

const newUser = createUser('Анна', 25, true)
console.log(newUser)


// Task 3
enum OrderStatus {
    'Pending',
    'Shipped',
    'Delivered',
    'Cancelled'
}

function getOrderMessage(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Pending:
      return "Замовлення очікує на обробку";
    case OrderStatus.Shipped:
      return "Замовлення було відправлено";
    case OrderStatus.Delivered:
      return "Замовлення доставлено";
    case OrderStatus.Cancelled:
      return "Замовлення скасовано";
    default:
      throw new Error("Невідомий статус замовлення");
  }
}


console.log(getOrderMessage(OrderStatus.Pending))
console.log(getOrderMessage(OrderStatus.Shipped))
console.log(getOrderMessage(OrderStatus.Delivered))
console.log(getOrderMessage(OrderStatus.Cancelled))