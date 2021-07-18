const app = {
  invader: document.getElementById("invader"),
  tailleGrille: 20,
  taillePixel: 15,
  color: "black",

  init: function () {
    app.monTitre();
    app.formDatas();
    app.formColor();
    app.creationGrille();
  },

  monTitre: function () {
    const title = (document.querySelector("h1").textContent =
      "Hello Space Invader");
    return title;
  },

  creationGrille: function () {
    // Je purifie la grille
    app.invader.innerHTML = "";

    // Gestion de la grille
    // taille de la grille
    for (let ligne = 0; ligne < app.tailleGrille; ligne++) {
      let rows = document.createElement("div");
      rows.classList.add("rows");

      // j'ajoute le ligne dans invader
      app.invader.appendChild(rows);

      // taille de l'ensemble
      for (let col = 0; col < app.tailleGrille; col++) {
        let cols = document.createElement("div");
        cols.classList.add("cols");

        // Taille du pixel
        cols.style.width = `${app.taillePixel}px`;
        cols.style.height = `${app.taillePixel}px`;

        cols.addEventListener("click", app.pixelColor);
        rows.appendChild(cols);
      }
    }
  },
  pixelColor: (evt) => {
    const pixel = evt.target;
    pixel.classList.toggle("active");
    if (pixel.classList.contains("active")) {
      pixel.style.backgroundColor = app.color;
    } else {
      app.color = pixel.style.backgroundColor = "white";
    }
  },
  formDatas: () => {
    const form = document.querySelector("#form_tailles");
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      const tailleGr = document.querySelector("#taille_grille");
      const taillePx = document.querySelector("#taille_pixel");

      app.tailleGrille = Number(tailleGr.value);
      app.taillePixel = Number(taillePx.value);

      app.creationGrille();
    });
  },
  formColor: () => {
    const formCol = document.querySelector("#form_color");

    formCol.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const pixelColor = document.querySelector("#color");
      console.log(pixelColor.value);
      app.color = pixelColor.value;
    });
  },
};

document.addEventListener("DOMContentLoaded", app.init);
