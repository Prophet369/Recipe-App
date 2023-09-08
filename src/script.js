const input = document.getElementById("userinput");
const button = document.getElementById("search");

function inputLength() {
  return input.value.length;
}

async function ApiRequest() {
  let App_id = "f38cf42b";
  let App_key = "940188b8e6db4aa8f205be61600cb5b5";
  let response = await fetch(
    `https://api.edamam.com/api/recipes/v2?app_id=${App_id}&app_key=${App_key}&type=public&q=${input.value}`
  );
  let data = await response.json();
  ApiData(data);
  input.value = "";
}

function ApiData(data) {
  for (let i = 0; i < data.hits.length; i++) {
    let items = data.hits[i];
    let cards = `<div class="card col-lg-4 col-md-6 col-sm-12" style="width: 18rem;">
  <img src="${items.recipe.image}" class="card-img-top img-fluid" alt="...">
  <div class="card-body">
    <h5 class="card-title">${items.recipe.label}</h5>
    <p class="card-text">Cuisine Type: ${items.recipe.cuisineType[i]}</p>
    <p class="card-text">Diet Label: ${items.recipe.dietLabels[i]}</p>
    <p class="card-text">Calories: ${items.recipe.calories}</p>
    <a href="${items.recipe.url}" target="_blank" class="btn btn-primary">View Recipe</a>
  </div>
</div>`;
    document.getElementById("custom-grid").innerHTML += cards;
  }
}

function addAfterClick() {
  if (inputLength() > 0) {
    ApiRequest();
  }
}

function addAfterKeydown(Event) {
  if (inputLength() > 0 && Event.key === "Enter") {
    ApiRequest();
  }
}

button.addEventListener("click", addAfterClick);
input.addEventListener("keydown", addAfterKeydown);
