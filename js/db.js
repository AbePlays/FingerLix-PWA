// Offline database
db.enablePersistence().catch((e) => {
  if (e.code === "failed-precondition") {
    // Multiple tabs opened
    console.log("Persistence failed");
  } else if (e.code === "unimplemented") {
    // Functionality not available
    console.log("Persistence is not available");
  }
});

db.collection("recipes").onSnapshot((snapshot) => {
  //   console.log(snapshot.docChanges());
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      renderRecipe(change.doc.data(), change.doc.id);
    }

    if (change.type === "removed") {
      removeRecipe(change.doc.id);
    }
  });
});

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value,
  };

  db.collection("recipes")
    .add(recipe)
    .catch((e) => console.log(e));

  form.title.value = "";
  form.ingredients.value = "";
});

const recipeContainer = document.querySelector(".recipes");
recipeContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "I") {
    const id = event.target.getAttribute("data-id");
    db.collection("recipes").doc(id).delete();
  }
});
