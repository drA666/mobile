'use strict'

const print = console.log;

// Частина 1

// Дано рядок у форматі "Student1 - Group1; Student2 - Group2; ..."

let studentsStr = "Дмитренко Олександр - ІП-84; Матвійчук Андрій - ІВ-83; Лесик Сергій - ІО-82; Ткаченко Ярослав - ІВ-83; Аверкова Анастасія - ІО-83; Соловйов Даніїл - ІО-83; Рахуба Вероніка - ІО-81; Кочерук Давид - ІВ-83; Лихацька Юлія - ІВ-82; Головенець Руслан - ІВ-83; Ющенко Андрій - ІО-82; Мінченко Володимир - ІП-83; Мартинюк Назар - ІО-82; Базова Лідія - ІВ-81; Снігурець Олег - ІВ-81; Роман Олександр - ІО-82; Дудка Максим - ІО-81; Кулініч Віталій - ІВ-81; Жуков Михайло - ІП-83; Грабко Михайло - ІВ-81; Іванов Володимир - ІО-81; Востриков Нікіта - ІО-82; Бондаренко Максим - ІВ-83; Скрипченко Володимир - ІВ-82; Кобук Назар - ІО-81; Дровнін Павло - ІВ-83; Тарасенко Юлія - ІО-82; Дрозд Світлана - ІВ-81; Фещенко Кирил - ІО-82; Крамар Віктор - ІО-83; Іванов Дмитро - ІВ-82";

// Завдання 1
// Заповніть словник, де:
// - ключ – назва групи
// - значення – відсортований масив студентів, які відносяться до відповідної групи

let studentsGroups = [];

// Ваш код починається тут


studentsStr.split('; ')
    .map(student => student.split(' - '))
    .map(([student, group]) => [student, group] = [[student], group])
    .map(([student, group], _, arr) => {
        for (let j = 0; j < arr.length; j++) {
            if (group == arr[j][1] && student !== arr[j][0]) {
                student.push(arr[j][0][0]);
                arr.splice(j, 1)
            };
            studentsGroups[group] = student.sort()
        };
    });


// Ваш код закінчується тут

print("Завдання 1");
print(studentsGroups);
print();

// Дано масив з максимально можливими оцінками

let points = [12, 12, 12, 12, 12, 12, 12, 16];

// Завдання 2
// Заповніть словник, де:
// - ключ – назва групи
// - значення – словник, де:
//   - ключ – студент, який відносяться до відповідної групи
//   - значення – масив з оцінками студента (заповніть масив випадковими значеннями, використовуючи функцію `randomValue(maxValue: Int) -> Int`)

function randomValue(maxValue) {
    switch (~~(Math.random() * 6)) {
        case 1:
            return Math.ceil((maxValue) * 0.7)
        case 2:
            return Math.ceil((maxValue) * 0.9)
        case 3, 4, 5:
            return maxValue
        default:
            return 0
    };
};

let studentPoints = [];

// Ваш код починається тут
Object.entries(studentsGroups).forEach(([group, students]) => {
    studentPoints[group] = [];
    for (let student of students) {
        studentPoints[group][student] = points.map(point => randomValue(point));
    };
});

// Ваш код закінчується тут

print("Завдання 2");
print(studentPoints);
print();

// Завдання 3
// Заповніть словник, де:
// - ключ – назва групи
// - значення – словник, де:
//   - ключ – студент, який відносяться до відповідної групи
//   - значення – сума оцінок студента

let sumPoints = [];

// Ваш код починається тут

sumPoints = studentPoints;

Object.entries(studentPoints).forEach(([group, students]) => {
    Object.entries(students).forEach(([student, points]) => {
        sumPoints[group][student] = points.reduce((sum, point) => sum += point), 0;
    });
});

// Ваш код закінчується тут

print("Завдання 3");
print(sumPoints);
print();

// Завдання 4
// Заповніть словник, де:
// - ключ – назва групи
// - значення – середня оцінка всіх студентів групи

var groupAvg = []

// Ваш код починається тут

Object.entries(sumPoints).map(([group, students]) => {
    let st = Object.entries(students)
    groupAvg[group] =  st.map(([_, points]) => points).reduce((sum, point) => (sum + point))/st.length
});


// Ваш код закінчується тут

print("Завдання 4")
print(groupAvg)
print()

// Завдання 5
// Заповніть словник, де:
// - ключ – назва групи
// - значення – масив студентів, які мають >= 60 балів

let passedPerGroup = []

// Ваш код починається тут

Object.entries(sumPoints).forEach(([group, students]) => {
    let st = Object.entries(students)
    passedPerGroup[group] = st.filter(([_, points]) => points >= 60).map(([student,_]) => student)
});
// Ваш код закінчується тут

print("Завдання 5")
print(passedPerGroup)
