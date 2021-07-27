const app = {
  invader: document.getElementById("invader"),
  divCol: document.querySelector("#select"),
  formCol: document.querySelector("#form_color"),
  btnReset: document.querySelector("#reset_color"),
  btnResetGrille: document.querySelector("#reset_grille"),
  tailleGrille: null,
  taillePixel: null,
  color: "black",
  name: prompt("Quel est ton prénom?"),
  tabColor: [],

  init: function () {
    app.btnReset.addEventListener("click", app.colorReset);
    app.btnResetGrille.addEventListener("click", app.grilleReset);
    app.monTitre();
    app.formDatas();
    app.formColor();
    app.creationGrille();
  },

  monTitre: function () {
    const title = (document.querySelector("h1").textContent = `Bonjour ${
      app.name || ""
    }`);
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
    pixel.classList.add("active");

    if (pixel.classList.contains("active")) {
      pixel.style.backgroundColor = app.color;
    } else {
      pixel.classList.remove("active");
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
    app.formCol.addEventListener("submit", (evt) => {
      evt.preventDefault();

      // valeur de l'input color
      const pixelColor = document.querySelector("#color");
      console.log("la couleur sélectionnée ", pixelColor.value);
      app.color = pixelColor.value;

      const selectedColor = document.createElement("div");
      selectedColor.classList.add("select_color");
      selectedColor.style.backgroundColor = pixelColor.value;

      console.log("selectedColor ", selectedColor.style.backgroundColor); // ! hexadecimal

      // je place la couleur dans le tableau
      app.tabColor.push(selectedColor);

      // todo: si une couleur est déja présente, ne pas la rajouter au tableau
      // ! probleme , les couleurs recus de l'input sont en hexadeciale en sortie de tableau elle sont en rgb
      const foundColor = app.tabColor.find((el) => {
        console.log("couleur ", el.style.backgroundColor);
        console.log("select ", selectedColor.style.backgroundColor);
        el.style.backgroundColor == selectedColor.style.backgroundColor;
      });
      console.log("found Color ", foundColor);
      app.tabColorSelections();
    });
  },

  tabColorSelections: () => {
    app.tabColor.forEach((element) => {
      app.divCol.appendChild(element);
      element.addEventListener("click", () => {
        console.log("je selectionne la couleur", element.style.backgroundColor);
        app.color = element.style.backgroundColor;
      });
    });
  },
  colorReset: () => {
    app.tabColor = [];
    app.divCol.innerHTML = "";
  },
  grilleReset: () => {
    app.creationGrille();
  },
};

document.addEventListener("DOMContentLoaded", app.init);
