console.log('yummy food!');


//creates HTML element
foodFactory = (foodItem) => {
    return `
                <div class="food-item">
                    <h2>${foodItem.name}</h2>
                    <p><strong>Ingredients:</strong> ${foodItem.ingredients}</p>
                    <p><strong>Country:</strong> ${foodItem.country}</p>
                    <p><strong>Calories:</strong> ${foodItem.calories}</p>
                    <p><strong>Fat:</strong> ${foodItem.fat}</p>
                    <p><strong>Sugar:</strong> ${foodItem.sugar}</p>
                </div>
            `
}

//appends HTML element to DOM
addFoodToDom = (foodAsHTML) => {
    const el = document.querySelector('#container');
    el.innerHTML += foodAsHTML;
}


function getData() {

fetch("http://localhost:8088/favoriteFood")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log(food); 

            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    food.ingredients = productInfo.product.ingredients_text;
                    food.country = productInfo.product.countries;
                    food.calories = productInfo.product.nutriments.energy;
                    food.fat = productInfo.product.nutriments.fat_serving;
                    food.sugar = productInfo.product.nutriments.sugars_serving;
                
                    const foodAsHTML = foodFactory(food);
                    addFoodToDom(foodAsHTML);
                })
        })
    })

}

//event listener on button to activate getData function
const button = document.querySelector('#btn-getData');
button.addEventListener('click', getData);

