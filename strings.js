function getStats(str) {
    let letters = 0;
    let digits = 0;
    let other = 0;

    for (let i = 0; i < str.length; i++) {
        const ch = str[i];

        if (/[a-zа-яіїєґ]/i.test(ch)) {
            letters++;
        } else if (/\d/.test(ch)) {
            digits++;
        } else {
            other++;
        }
    }

    console.log({ letters, digits, other });
}

function twoDigitToText(num) {
    const ones = [
        "", "один", "два", "три", "чотири", "п'ять",
        "шість", "сім", "вісім", "дев'ять"
    ];

    const teens = [
        "десять", "одинадцять", "дванадцять", "тринадцять",
        "чотирнадцять", "п'ятнадцять", "шістнадцять",
        "сімнадцять", "вісімнадцять", "дев'ятнадцять"
    ];

    const tens = [
        "", "", "двадцять", "тридцять", "сорок",
        "п'ятдесят", "шістдесят", "сімдесят",
        "вісімдесят", "дев'яносто"
    ];

    if (num >= 10 && num <= 19) {
        return teens[num - 10];
    }

    const t = Math.floor(num / 10);
    const o = num % 10;

    return `${tens[t]} ${ones[o]}`.trim();
}

function swapCase(str) {
    let res = "";

    for (let i = 0; i < str.length; i++) {
        const ch = str[i];

        if (/\d/.test(ch)) {
            res += "_";
        } else if (ch === ch.toUpperCase()) {
            res += ch.toLowerCase();
        } else {
            res += ch.toUpperCase();
        }
    }

    return res;
}

function cssToCamel(str) {
    let res = "";
    let upper = false;

    for (let i = 0; i < str.length; i++) {
        if (str[i] === "-") {
            upper = true;
        } else {
            res += upper ? str[i].toUpperCase() : str[i];
            upper = false;
        }
    }

    return res;
}

function toAbbreviation(str) {
    return str
        .split(" ")
        .map(w => w[0].toUpperCase())
        .join("");
}

function joinStrings(...args) {
    return args.join("");
}

function calculator(expr) {
    let op;

    if (expr.includes("+")) op = "+";
    else if (expr.includes("-")) op = "-";
    else if (expr.includes("*")) op = "*";
    else if (expr.includes("/")) op = "/";

    const [a, b] = expr.split(op);

    const n1 = Number(a);
    const n2 = Number(b);

    if (op === "+") return n1 + n2;
    if (op === "-") return n1 - n2;
    if (op === "*") return n1 * n2;
    if (op === "/") return n1 / n2;
}

function parseURL(url) {
    const u = new URL(url);

    return {
        protocol: u.protocol.replace(":", ""),
        domain: u.hostname,
        path: u.pathname
    };
}

function customSplit(str, sep) {
    let arr = [];
    let temp = "";

    for (let i = 0; i < str.length; i++) {
        if (str[i] === sep) {
            arr.push(temp);
            temp = "";
        } else {
            temp += str[i];
        }
    }

    arr.push(temp);
    return arr;
}

function print(template, ...args) {
    return template.replace(/%(\d+)/g, (m, i) => {
        return args[i - 1];
    });
}

console.log(getStats("Hello123!!!"));
console.log(twoDigitToText(35));
console.log(swapCase("HeLLo123"));
console.log(cssToCamel("background-color"));
console.log(toAbbreviation("cascading style sheets"));
console.log(joinStrings("Hello", " ", "World"));
console.log(calculator("10+5"));
console.log(parseURL("https://itstep.org/ua/about"));
console.log(customSplit("10/08/2020", "/"));
console.log(print("Today is %1 %2.%3.%4", "Monday", 10, 8, 2020));