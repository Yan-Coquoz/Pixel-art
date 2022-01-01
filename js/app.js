const app = {
  invader: document.getElementById("invader"),
  divCol: document.querySelector("#select"),
  formCol: document.querySelector("#form_color"),
  btnReset: document.querySelector("#reset_color"),
  btnResetGrille: document.querySelector("#reset_grille"),
  gum: document.querySelector("#gum"),
  tailleGrille: null,
  taillePixel: null,
  color: "black",
  name: prompt("Quel est ton prénom?"),
  tabColor: [],

  init: function () {
    app.btnReset.addEventListener("click", app.colorReset);
    app.btnResetGrille.addEventListener("click", app.grilleReset);
    app.gum.style.backgroundColor = "#fff";
    app.gum.addEventListener("click", app.allWhite);
    app.monTitre();
    app.formDatas();
    app.formColor();
    app.creationGrille();
  },
  /**
   * dire bonjour
   */
  monTitre: function () {
    const title = (document.querySelector("h1").textContent = `Bonjour ${
      app.name || ""
    }`);
    return title;
  },

  /**
   * création de la grille
   */
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
  /**
   * affectation de la couleur
   */
  pixelColor: (evt) => {
    const pixel = evt.target;
    pixel.classList.add("active");
    pixel.style.backgroundColor = app.color;
  },

  /**
   * entrée des valeurs de la grille
   */
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

  /**
   * recuperation des couleurs de l'input
   */
  formColor: () => {
    app.formCol.addEventListener("submit", (evt) => {
      evt.preventDefault();

      // valeur de l'input color
      const pixelColor = document.querySelector("#color");
      //console.log("la couleur sélectionnée ", pixelColor.value);
      app.color = pixelColor.value;

      const selectedColor = document.createElement("div");
      selectedColor.classList.add("select_color");
      selectedColor.style.backgroundColor = pixelColor.value;

      // Je regarde si dans le tableau des couleur, celle selection y est deja
      const foundColor = app.tabColor.find((color) => {
        return (
          color.style.backgroundColor === selectedColor.style.backgroundColor
        );
      });

      if (!foundColor) {
        // je place la couleur dans le tableau
        app.tabColor.push(selectedColor);
      } else {
        const warning = document.createElement("p");
        warning.textContent = "La couleur est déja présente";
        warning.style.color = "white";
        app.formCol.appendChild(warning);
        setTimeout(() => {
          warning.innerHTML = "";
        }, 2000);
      }
      console.log("found Color ", foundColor);
      app.tabColorSelections();
    });
  },

  /*
Selection des couleurs déja selectionner
*/
  tabColorSelections: () => {
    app.tabColor.forEach((element) => {
      app.divCol.appendChild(element);
      element.addEventListener("click", () => {
        // console.log("je selectionne la couleur", element.style.backgroundColor);
        app.color = element.style.backgroundColor;
      });
    });
  },

  /*resets*/
  colorReset: () => {
    app.tabColor = [];
    app.divCol.innerHTML = "";
  },
  grilleReset: () => {
    app.creationGrille();
  },
  allWhite: () => {
    // console.log("white");
    app.color = "#fff";
  },
};

document.addEventListener("DOMContentLoaded", app.init);
