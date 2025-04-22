document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.add-button');
    addButton.addEventListener('click', function() {
        const lastBeverage = document.querySelector('.beverage:last-of-type');
        const newBeverage = lastBeverage.cloneNode(true);
        
        const beverageCount = document.querySelectorAll('.beverage').length + 1;
        newBeverage.querySelector('.beverage-count').textContent = `Напиток №${beverageCount}`;
        
        const milkRadios = newBeverage.querySelectorAll('input[type="radio"][name="milk"]');
        milkRadios.forEach(radio => {
            radio.name = `milk-${beverageCount}`;
        });
        
        addButton.parentElement.before(newBeverage);
    });
});