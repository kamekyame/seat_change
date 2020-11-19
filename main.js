import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

class Seat {
    constructor(isStatic, number, student) {
        if (number === undefined) {
            this.isStatic = isStatic.isStatic || false;
            this.number = isStatic.number;
            this.student = isStatic.student;
        } else {
            this.isStatic = isStatic;
            this.number = number;
            this.student = student;
        }
    }
}
class Student {
    constructor(name, furigana, sex) {
        this.name = name;
        this.furigana = furigana;
        this.sex = sex;
    }
}

const filenameInput = document.querySelector("#filename input")

const app = new Vue({
    el: "#seat",
    data: {
        width: 0,
        height: 0,
        seats: [],
        students: [],
        dir: true,
    },
    methods: {
        init: function (w, h, students, seats) {
            this.width = w;
            this.height = h;
            this.students = students;
            for (let i = 0; i < w * h; i++) {
                const seat = seats.find(e => e.number === i);
                if (seat) Vue.set(this.seats, i, new Seat(seat));
                else Vue.set(this.seats, i, new Seat(false, i));
            }
            this.students.forEach(e => { if (e.sex === 1) console.log(e) });
        },
        widthIndex: function () {
            const a = [];
            for (let i = 0; i < this.width; i++) a.push(i);
            return a;
        },
        heightIndex: function () {
            const a = [];
            for (let i = 0; i < this.height; i++) a.push(i);
            return a;
        },
        getIndex: function (w, h) { return h * this.width + w },
        getSeat: function (n) {
            return this.seats.find(e => e.number === n);
        },
        getStudent: function (n) {
            return this.students.find(e => e.number === n);
        },
        getStudents: function () {
            return this.students.slice().sort((a, b) => {
                return a.number - b.number;
            })
        },
        shaffle: function () {
            const filterdSeats = this.seats.filter(e => !e.isStatic);
            // sort
            for (let i = filterdSeats.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1)); // 0 から i のランダムなインデックス
                [filterdSeats[i].number, filterdSeats[j].number] = [filterdSeats[j].number, filterdSeats[i].number]; // 要素を入れ替えます
            }
        },
        changeStatic: function (w, h, e) {
            const i = this.getIndex(w, h);
            const seat = this.getSeat(i);
            seat.isStatic = !seat.isStatic;
            console.log("changeStatic!");
        },
        nameClick: function (i) {
            document.querySelector("#name-" + i).click();
        },
        changeStudent: function (newNumber, oldNumber) {
            newNumber = parseInt(newNumber);
            oldNumber = parseInt(oldNumber);

            const seat = [
                this.seats.find(e => e.student === newNumber),
                this.seats.find(e => e.student === oldNumber),
            ];

            [seat[0].student, seat[1].student] = [seat[1].student, seat[0].student];

            console.log("changeStudent!!!");
            console.log(newNumber, oldNumber);
        },
        getFileJson: function () {
            this.seats.sort((a, b) => a.number - b.number);
            this.students.sort((a, b) => a.number - b.number);

            return {
                width: this.width,
                height: this.height,
                seats: this.seats,
                students: this.students
            }
        }
    }
});

document.querySelector("#seat-change").onclick = () => {
    app.shaffle();
}

document.querySelector("#seat-download").onclick = () => {
    const json = app.getFileJson();
    const str = JSON.stringify(json);

    var blob = new Blob([str], { "type": "application/json" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.download = (filenameInput.value === "" ? "changed-seat" : filename) + ".json";
    a.href = url;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

document.querySelector("#student-file").onchange = (e) => {
    const file = e.target.files[0];
    filenameInput.value = file.name.match(/(.+).json/)[1];
    const reader = new FileReader();
    reader.onload = () => {
        const json = JSON.parse(reader.result);
        app.init(json.width, json.height, json.students, json.seats);
    }
    reader.readAsText(file);
}

document.querySelector("#change-dir").onclick = (e) => {
    app.dir = !app.dir;
}
