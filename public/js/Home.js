document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    const form = document.getElementById('calorieForm');
    const searchInput = document.getElementById('searchInput');
    const foodList = document.getElementById('foodList');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const age = parseInt(document.getElementById('age').value);
        const weight = parseInt(document.getElementById('weight').value);
        const height = parseInt(document.getElementById('height').value);
        
        let gender;
        const genderElements = document.getElementsByName('gender');
        for (const element of genderElements) {
            if (element.checked) {
                gender = element.value;
                break;
            }
        }

        let bmr;

        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else if (gender === 'female') {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        } else {
            console.error('Invalid gender value');
            return;
        }
        
        const resultElement = document.getElementById('result');
        if (resultElement) {
            resultElement.innerText = `Your BMR is ${bmr.toFixed(2)} calories/day.`;
        } else {
            console.error('Element with ID "result" not found');
        }
    });
    
    searchInput.addEventListener('input', function () {
        const searchValue = this.value.toLowerCase().trim();
        const foodSections = foodList.getElementsByClassName('Food-Section');
        Array.from(foodSections).forEach(function (foodSection) {
            const foodName = foodSection.getElementsByTagName('h2')[0].innerText.toLowerCase();
            if (foodName.includes(searchValue)) {
                foodSection.style.display = 'block';
            } else {
                foodSection.style.display = 'none';
            }
        });
    });
});

fetch('/foods')
    .then(response => response.json())
    .then(foods => {
        const foodList = document.getElementById('foodList');
        foods.forEach(food => {
            const foodSection = document.createElement('div');
            foodSection.classList.add('Food-Section');
            foodSection.innerHTML = `
                <h2>${food.name}</h2>
                <p>Size: ${food.size} gr</p>
                <p>Calorie: ${food.calorie} kcal</p>
            `;
            foodList.appendChild(foodSection);
        });
    })
    .catch(error => console.error('Error fetching foods:', error));

// Window Focus
window.addEventListener("blur", () => {
    document.title = "Is Something Wrong?";
});
window.addEventListener("focus", () => {
    document.title = "CALDET WEB";
});

//Coming Soon Alerts...
function showalerts(){
    alert("Under Construction 👷");
};