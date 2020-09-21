import React, { useState } from "react";

export interface AccordionProps {
  id: string;
  titre: JSX.Element;
  contenu: JSX.Element;
}

export function Accordion({ id, titre, contenu }: AccordionProps) {
  const [isContenuVisible, setContenuVisible] = useState(false);
  const onTitreClick = () => setContenuVisible(!isContenuVisible);
  const onTitreKeyDown = (e: React.KeyboardEvent) => {
    if ([13, 32].includes(e.charCode)) onTitreClick();
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={onTitreClick}
        onKeyPress={onTitreKeyDown}
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
