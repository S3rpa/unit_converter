document.addEventListener('DOMContentLoaded', function() {
    const conversionTypeSelect = document.getElementById('conversion-type');
    const inputValue = document.querySelector('.number-input');
    const resultContainer = document.querySelector('.result-container'); 
    const swapButton = document.getElementById('swap');
    const saveButton = document.getElementById('save');

    conversionTypeSelect.addEventListener('change', handleConversion);
    inputValue.addEventListener('input', handleConversion);
    swapButton.addEventListener('click', swapValues);
    saveButton.addEventListener('click', saveConversion);

    function handleConversion() {
        const type = conversionTypeSelect.value;
        const input = parseFloat(inputValue.value);
        if (!isNaN(input)) {
            resultContainer.value = convert(type, input).toFixed(2);
        }
    }

    // Función que realiza la conversión según el tipo seleccionado
    function convert(type, value) {
        switch (type) {
            case 'km-to-miles':
                return value * 0.621371;
            case 'miles-to-km':
                return value / 0.621371;
            case 'feet-to-meters':
                return value * 0.3048;
            case 'meters-to-feet':
                return value / 0.3048;
            case 'cm-to-inches':
                return value * 0.393701;
            case 'inches-to-cm':
                return value / 0.393701;
            default:
                return value;
        }
    }

    function swapValues() {
        let [from, to] = conversionTypeSelect.value.split('-to-');
        conversionTypeSelect.value = `${to}-to-${from}`;
        let tempValue = inputValue.value;
        inputValue.value = resultContainer.value; 
        resultContainer.value = tempValue; 

        handleConversion();
    }

    function saveConversion() {
        const conversionTypeText = conversionTypeSelect.options[conversionTypeSelect.selectedIndex].textContent;
        const savedConversionsContainer = document.getElementById('saved-conversions');
        
        // Crea un nuevo elemento para la conversión guardada
        const savedItem = document.createElement('div');
        savedItem.classList.add('saved-item');
        savedItem.innerHTML = `
            <span>${inputValue.value} ${conversionTypeText.split(' a ')[0]} = ${resultContainer.value} ${conversionTypeText.split(' a ')[1]}</span>
            <button class="delete-button" onclick="deleteSavedResult(this)">X</button>
        `;

        savedConversionsContainer.appendChild(savedItem);

        
        inputValue.value = '';
        resultContainer.value = '';
    }

    
    window.deleteSavedResult = function(element) {
        const itemToRemove = element.closest('.saved-item');
        itemToRemove.remove();
    }
});

