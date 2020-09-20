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
 * - TODO: sémantique button
 * - TODO: sémantique contenu
 * - TODO: afficher contenu que si le bouton est cliqué
 * - TODO: fermer contenu si titre re-cliqué
 * - TODO: afficher N titres
 * - TODO: afficher le contenu du titre cliqué
 * - TODO: cacher le contenu du titre non sélectionné
 */

interface AccordionProps {
  titre: JSX.Element;
  contenu: string;
}

function Accordion({ titre, contenu }: AccordionProps) {
  const [isContenuVisible, setContenuVisible] = useState(false);
  const onTitreClick = () => setContenuVisible(!isContenuVisible);

  return (
    <>
      <button onClick={onTitreClick}>{titre}</button>
      <div hidden={!isContenuVisible}>{contenu}</div>
    </>
  );
}

let texteTitre: string;
let titreElement: JSX.Element;

beforeEach(() => {
  texteTitre = "Le titre";
  const titleElement = <h2>{texteTitre}</h2>;

  render(<Accordion titre={titleElement} contenu="Le contenu" />);
});

test("Affiche le titre de l'item de l'accordéon", () => {
  expect(screen.getByText(texteTitre)).toBeVisible();
  expect(screen.getByText(texteTitre).tagName).toBe("H2");
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
