document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let newVal = '';
    let operator = '';
    let oldVal = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const val = button.textContent;

            if (val === 'C') {
                newVal = '';
                operator = '';
                oldVal = '';
                display.textContent = '0';
                return;
            }

            if (val === '←') {
                newVal = newVal.slice(0, -1);
                display.textContent = newVal || '0';
                return;
            }

            if (['+', '-', '*', '/'].includes(val)) {
                if (newVal) {
                    if (oldVal && operator) {
                        oldVal = operate(oldVal, newVal, operator);
                    } else {
                        oldVal = newVal;
                    }
                    newVal = '';
                }
                operator = val;
                display.textContent = operator;
                return;
            }

            if (val === '=') {
                if (oldVal && newVal && operator) {
                    display.textContent = operate(oldVal, newVal, operator);
                    oldVal = '';
                    newVal = '';
                    operator = '';
                }
                return;
            }

            if (val === '.') {
                if (!newVal.includes('.')) {
                    newVal += val;
                }
            } else {
                newVal += val;
            }

            display.textContent = newVal;
        });
    });

    function operate(a, b, op) {
        const num1 = parseFloat(a);
        const num2 = parseFloat(b);

        if (isNaN(num1) || isNaN(num2)) return '';

        switch (op) {
            case '+':
                return (num1 + num2).toString();
            case '-':
                return (num1 - num2).toString();
            case '*':
                return (num1 * num2).toString();
            case '/':
                return (num2 !== 0) ? (num1 / num2).toString() : 'Error';
            default:
                return '';
        }
    }
});
