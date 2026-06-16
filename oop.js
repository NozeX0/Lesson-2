class LoginManager {
    constructor(limit = 3) {
        this.accounts = new Map();
        this.limit = limit;
    }

    addUser(name, pass) {
        this.accounts.set(name, {
            pass,
            tries: 0,
            locked: false
        });
    }

    signIn(name, pass) {
        const account = this.accounts.get(name);

        if (!account) return "Користувача не знайдено";
        if (account.locked) return "Акаунт заблоковано";

        if (account.pass === pass) {
            account.tries = 0;
            return "Вхід успішний";
        }

        account.tries++;

        if (account.tries >= this.limit) {
            account.locked = true;
            return "Акаунт заблоковано";
        }

        return `Невдала спроба (${account.tries})`;
    }
}

class MessageCenter {
    constructor() {
        this.members = [];
    }

    join(user) {
        this.members.push(user);
    }

    leave(user) {
        this.members = this.members.filter(
            member => member !== user
        );
    }

    send(text) {
        this.members.forEach(member =>
            console.log(`${member}: ${text}`)
        );
    }
}

class TodoList {
    constructor() {
        this.items = [];
    }

    create(title) {
        this.items.push({
            title,
            done: false
        });
    }

    remove(title) {
        this.items = this.items.filter(
            item => item.title !== title
        );
    }

    changeState(title) {
        const item = this.items.find(
            item => item.title === title
        );

        if (item) {
            item.done = !item.done;
        }
    }

    find(text) {
        return this.items.filter(item =>
            item.title.toLowerCase().includes(text.toLowerCase())
        );
    }

    show() {
        console.log(this.items);
    }
}

class CouponManager {
    constructor() {
        this.codes = new Map();
    }

    add(code, count) {
        this.codes.set(code, {
            count,
            used: 0
        });
    }

    activate(code) {
        const current = this.codes.get(code);

        if (!current) return "Промокод не існує";

        if (current.used >= current.count) {
            return "Промокод недійсний";
        }

        current.used++;

        return `Промокод використано (${current.used}/${current.count})`;
    }
}

const login = new LoginManager();
login.addUser("admin", "1234");

console.log(login.signIn("admin", "1111"));
console.log(login.signIn("admin", "2222"));
console.log(login.signIn("admin", "3333"));

const center = new MessageCenter();
center.join("Микита");
center.join("Карина");
center.send("Нова подія!");

const todo = new TodoList();
todo.create("Вивчити Джава скріпт");
todo.create("Зробити лабораторну роботу");
todo.changeState("Вивчити Джава скріпт");
todo.show();
console.log(todo.find("Джава"));

const coupons = new CouponManager();
coupons.add("SALE50", 2);

console.log(coupons.activate("SALE50"));
console.log(coupons.activate("SALE50"));
console.log(coupons.activate("SALE50"));