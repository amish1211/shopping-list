import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  remove,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://shopping-cart-dc186-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const addBtn = document.getElementById("add-btn");
const inputField = document.getElementById("input-field");
const shoppingList = document.getElementById("shopping-list");

addBtn.addEventListener("click", () => {
  push(shoppingListInDB, inputField.value);
  clearInputFieldEl();
});

onValue(shoppingListInDB, (snapshot) => {
  if (!snapshot.exists()) {
    shoppingList.innerHTML = "";
    return;
  }

  const data = snapshot.val();
  const items = Object.values(data);
  const ids = Object.keys(data);
  clearShoppingListEl();

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item;
    li.addEventListener("click", () => {
      remove(ref(database, `shoppingList/${ids[index]}`));
    });
    shoppingList.append(li);
  });
});

function clearInputFieldEl() {
  inputField.value = "";
}

function clearShoppingListEl() {
  shoppingList.innerHTML = "";
}
