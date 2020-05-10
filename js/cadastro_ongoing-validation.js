var invalidInputs = 0;
const invalidCharacters = [',', '\\', '+', '-', '*', '=', '!', '#', '$', '%', '¨', '&', '*', '(', ')', '[', ']', '~', '^', ':', ';', '?'];

const alertText = document.querySelector('p');
const submitButton = document.querySelector('input[type=\'submit\']')
const allInputs = document.querySelectorAll('input');

for(let i of allInputs) {
    i.addEventListener('focusout', e => {
        // Checks for empty string.
        if(i.value === '' && !i.classList.contains('invalid-input')) {
            i.classList.add('invalid-input');
            invalidInputs++;
        }else if(i.value !== '' && i.classList.contains('invalid-input')) {
            i.classList.remove('invalid-input');
            invalidInputs--;
        }

        // Checks for unwanted characters.
        for(let j of i.value) {
            if(invalidCharacters.includes(j)) {
                i.classList.add('invalid-input');
                invalidInputs++;
                break;
            }
        }

        // Checks how many filled inputs.
        let filledInputs=0;
        for(let j of allInputs) {
            if(j.value !== '') {
                filledInputs++;
            }
        }

        // Updates submit button if all inputs were filled and there's no invalid filled input.
        if(invalidInputs>0) {
            submitButton.disabled = true;
            alertText.style.display = 'block';
        }else if(filledInputs===18){
            submitButton.disabled = false;
            alertText.style.display = 'none';
        }
    });
}