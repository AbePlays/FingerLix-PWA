if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => console.log("Service Worker registered", reg))
    .catch((e) => console.log("Service Worker not registered", e));
}
