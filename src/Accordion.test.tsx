import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

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
 * - TODO: sémantique
 * - TODO: afficher contenu que si le bouton est cliqué
 * - TODO: afficher N titres
 * - TODO: afficher le contenu du titre cliqué
 * - TODO: cacher le contenu du titre non sélectionné
 */

interface AccordionProps {
  titre: string;
  contenu: string;
}

function Accordion({ titre, contenu }: AccordionProps) {
  return (
    <>
      <div>{titre}</div>
      <div>{contenu}</div>
    </>
  );
}

test("Affiche le titre et le contenu de l'item de l'accordéon", () => {
  // When
  render(<Accordion titre="Le titre" contenu="Le contenu" />);

  // Then
  expect(screen.getByText("Le titre")).toBeVisible();
  expect(screen.getByText("Le contenu")).toBeVisible();
});
