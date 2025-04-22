document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.add-button');
    const form = document.querySelector('form');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.querySelector('.modal-close');

    function updateNumbers() {
        const beverages = document.querySelectorAll('.beverage');
        beverages.forEach((beverage, index) => {
            beverage.querySelector('.beverage-count').textContent = `Напиток №${index + 1}`;
            const milkRadios = beverage.querySelectorAll('input[type="radio"][name^="milk"]');
            milkRadios.forEach(radio => {
                radio.name = `milk-${index + 1}`;
            });
        });
    }
    
    function createDeleteButton(beverage) {
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = '&times;';
        deleteButton.addEventListener('click', function() {
            const beverages = document.querySelectorAll('.beverage');
            if (beverages.length > 1) {
                beverage.remove();
                updateNumbers();
            }
        });

        return deleteButton;
    }

    function getSelectedBeverageText(select) {
        const options = select.options;
        const selectedIndex = select.selectedIndex;
        return options[selectedIndex].text;
    }

    function getSelectedMilkText(beverage) {
        const selectedMilk = beverage.querySelector('input[name^="milk"]:checked');
        switch(selectedMilk.value) {
            case 'usual': return 'обычное';
            case 'no-fat': return 'обезжиренное';
            case 'soy': return 'соевое';
            case 'coconut': return 'кокосовое';
            default: return '';
        }
    }
    
    function getSelectedOptionsText(beverage) {
        const options = [];
        const checkboxes = beverage.querySelectorAll('input[name="options"]:checked');
        
        checkboxes.forEach(checkbox => {
            switch(checkbox.value) {
                case 'whipped cream': options.push('взбитые сливки'); break;
                case 'marshmallow': options.push('зефирки'); break;
                case 'chocolate': options.push('шоколад'); break;
                case 'cinnamon': options.push('корица'); break;
            }
        });
        
        return options.join(', ');
    }
    
    const firstBeverage = document.querySelector('.beverage');
    firstBeverage.appendChild(createDeleteButton(firstBeverage));
    
    addButton.addEventListener('click', function() {
        const lastBeverage = document.querySelector('.beverage:last-of-type');
        const newBeverage = lastBeverage.cloneNode(true);
        const oldDeleteButton = newBeverage.querySelector('.delete-button');
        if (oldDeleteButton) {
            oldDeleteButton.remove();
        }
        newBeverage.appendChild(createDeleteButton(newBeverage));
        addButton.parentElement.before(newBeverage);
        updateNumbers();
    });

    function getBeverageWord(count) {
        const lastDigit = count % 10;
        const lastTwoDigits = count % 100;
        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
            return 'напитков';
        }
        if (lastDigit === 1) {
            return 'напиток';
        }
        if (lastDigit >= 2 && lastDigit <= 4) {
            return 'напитка';
        }
        return 'напитков';
    }
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const beverageCount = document.querySelectorAll('.beverage').length;
        document.getElementById('orderSummary').textContent = 
            `Вы заказали ${beverageCount} ${getBeverageWord(beverageCount)}`;
        
        const orderDetails = document.getElementById('orderDetails');
        orderDetails.innerHTML = '';
        
        const table = document.createElement('table');
        table.className = 'order-table';
        
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Напиток</th>
                <th>Молоко</th>
                <th>Дополнительно</th>
            </tr>
        `;
        table.appendChild(thead);
        const tbody = document.createElement('tbody');
        const beverages = document.querySelectorAll('.beverage');
        
        beverages.forEach(beverage => {
            const row = document.createElement('tr');
            
            const drinkCell = document.createElement('td');
            drinkCell.textContent = getSelectedBeverageText(beverage.querySelector('select'));
            
            const milkCell = document.createElement('td');
            milkCell.textContent = getSelectedMilkText(beverage);
            
            const optionsCell = document.createElement('td');
            optionsCell.textContent = getSelectedOptionsText(beverage);
            
            row.appendChild(drinkCell);
            row.appendChild(milkCell);
            row.appendChild(optionsCell);
            tbody.appendChild(row); 
        });
        
        table.appendChild(tbody); 
        orderDetails.appendChild(table); 
        modalOverlay.style.display = 'flex';
    });
    
    modalClose.addEventListener('click', function() {
        modalOverlay.style.display = 'none';
    });

    updateNumbers();
});