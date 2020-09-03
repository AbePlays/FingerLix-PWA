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
    }
  });
});
