import React from "react";
import { render } from "@testing-library/react";
import { fireEvent, screen } from "@testing-library/dom";
import { Accordion } from "./Accordion";

/**
 * Spécifications :
 * - présente une liste de titres
 * - si click sur un titre, alors le contenu est affiché
 * - si on click sur un autre titre que le titre sélectionné, alors l'autre contenu se ferme et le nouveau contenu
 * s'ouvre
 * - accessible
 */

/**
 * TODOLIST :
 * - afficher un titre
 * - afficher un contenu
 * - sémantique titre
 * - sémantique button titre
 * - sémantique contrôle affichage
 * - sémantique contenu
 * - afficher contenu que si le bouton est cliqué
 * - fermer contenu si titre re-cliqué
 * - TODO: afficher N titres
 * - TODO: afficher le contenu du titre cliqué
 * - TODO: cacher le contenu du titre non sélectionné
 */

let id: string;
let texteTitre: string;
let titreElement: JSX.Element;
let texteContenu: string;
let contenuElement: JSX.Element;

beforeEach(() => {
  id = "contenu-1";

  texteTitre = "Le titre";
  titreElement = <h2>{texteTitre}</h2>;

  texteContenu = "Le contenu";
  contenuElement = <p>{texteContenu}</p>;

  render(<Accordion id={id} titre={titreElement} contenu={contenuElement} />);
});

test("Affiche le titre de l'item de l'accordéon", () => {
  const conteneurTexte = screen.getByText(texteTitre);

  expect(conteneurTexte).toBeVisible();
  expect(conteneurTexte.tagName).toBe("H2");
});

test("Affiche le contenu de l'item quand le titre est cliqué, le cache si recliqué", () => {
  const titre = screen.getByText(texteTitre);
  const contenu = screen.getByText("Le contenu");

  expect(contenu).not.toBeVisible();
  fireEvent.click(titre);
  expect(contenu).toBeVisible();
  fireEvent.click(titre);
  expect(contenu).not.toBeVisible();
});

test("Le titre est accessible", () => {
  const conteneurTitre = screen.getByText(texteTitre)!.parentElement!;
  const contenu = screen.getByText("Le contenu");

  conteneurTitre.focus();

  expect(conteneurTitre.tagName).toBe("DIV");
  expect(conteneurTitre).toHaveAttribute("role", "button");
  expect(conteneurTitre).toHaveAttribute("tabindex", "0");

  fireEvent.keyPress(conteneurTitre, { charCode: 13 });
  expect(contenu).toBeVisible();

  fireEvent.keyPress(conteneurTitre, { charCode: 13 });
  expect(contenu).not.toBeVisible();

  fireEvent.keyPress(conteneurTitre, { charCode: 32 });
  expect(contenu).toBeVisible();

  fireEvent.keyPress(conteneurTitre, { charCode: 32 });
  expect(contenu).not.toBeVisible();
});

test("Le lien titre / contenu est accessible", () => {
  const conteneurTitre = screen.getByText(texteTitre)!.parentElement!;
  const conteneurContenu = screen.getByText(texteContenu).parentElement!;

  expect(conteneurTitre).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(conteneurTitre);
  expect(conteneurTitre).toHaveAttribute("aria-expanded", "true");

  expect(conteneurTitre).toHaveAttribute("aria-controls", id);
  expect(conteneurContenu).toHaveAttribute("id", id);
});
