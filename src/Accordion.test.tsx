import React, { useState } from "react";
import { render } from "@testing-library/react";
import { screen, fireEvent } from "@testing-library/dom";

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

interface AccordionProps {
  id: string;
  titre: JSX.Element;
  contenu: JSX.Element;
}

function Accordion({ id, titre, contenu }: AccordionProps) {
  const [isContenuVisible, setContenuVisible] = useState(false);
  const onTitreClick = () => setContenuVisible(!isContenuVisible);
  const onTitreKeyDown = (e: React.KeyboardEvent) => {
    if (["13", "32"].includes(e.key)) onTitreClick();
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={onTitreClick}
        onKeyDown={onTitreKeyDown}
        aria-expanded={isContenuVisible}
        aria-controls={id}
      >
        {titre}
      </div>
      <div id={id} hidden={!isContenuVisible}>
        {contenu}
      </div>
    </>
  );
}

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

  expect(conteneurTitre.tagName).toBe("DIV");
  expect(conteneurTitre).toHaveAttribute("role", "button");
  expect(conteneurTitre).toHaveAttribute("tabindex", "0");

  fireEvent.keyDown(conteneurTitre, { key: "13" });
  expect(contenu).toBeVisible();

  fireEvent.keyDown(conteneurTitre, { key: "13" });
  expect(contenu).not.toBeVisible();

  fireEvent.keyDown(conteneurTitre, { key: "32" });
  expect(contenu).toBeVisible();

  fireEvent.keyDown(conteneurTitre, { key: "32" });
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
