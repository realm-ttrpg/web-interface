import "@haliphax/nubbins/dist/nubbins.min.css";

const hi = document.createElement("p");
hi.innerText = "Hi! This text was added dynamically.";
document.querySelector("body > .c")!.appendChild(hi);
