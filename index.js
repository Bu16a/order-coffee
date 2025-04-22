document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.add-button');
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
    updateNumbers();
});