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
 * - TODO: afficher un contenu
 * - TODO: afficher contenu que si le bouton est cliqué
 * - TODO: afficher N titres
 * - TODO: afficher le contenu du titre cliqué
 * - TODO: cacher le contenu du titre non sélectionné
 */

interface AccordionProps {
  titre: string;
}

function Accordion({ titre }: AccordionProps) {
  return <>{titre}</>;
}

test("Affiche le titre de l'item de l'accordéon", () => {
  // When
  render(<Accordion titre="Le titre" />);

  // Then
  expect(screen.getByText("Le titre")).toBeVisible();
});
