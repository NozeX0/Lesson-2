const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

(async function () {
    const order = [];

    while (true) {
        let answer = (await ask('Хочеш додати товар до замовлення? (так/ні): ')).toLowerCase();

        if (answer === 'ні') {
            break;
        }

        if (answer === 'так') {
            let product = (await ask('Оберіть позицію (кола / піца): ')).toLowerCase();
            let size = (await ask('Вкажіть розмір (S / M): ')).toUpperCase();
            let price = Number(await ask('Вкажіть ціну: '));

            const item = {
                name: product,
                size: size,
                price: price
            };

            order.push(item);
        }
    }

    rl.close();

    let total = 0;
    let pizzaTotal = 0;
    let colaTotal = 0;

    const summary = {};

    for (let item of order) {
        total += item.price;

        if (item.name === 'піца') {
            pizzaTotal += item.price;
        }

        if (item.name === 'кола') {
            colaTotal += item.price;
        }

        const key = `${item.name} ${item.size}`;
        summary[key] = (summary[key] || 0) + 1;
    }

    console.log('\n--- ФІНАЛЬНЕ ЗАМОВЛЕННЯ ---');

    console.log('\nСписок товарів (назва + кількість):');
    for (let key in summary) {
        console.log(`${key}: ${summary[key]} шт.`);
    }

    console.log(`\nЗагальна сума замовлення: ${total}`);

    console.log(`🍕 Сума піци: ${pizzaTotal}`);
    console.log(`🥤 Сума коли: ${colaTotal}`);

})();