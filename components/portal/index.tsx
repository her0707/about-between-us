"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
  key?: string | null;
  selector: string;
}

const Portal = ({ children, key = "", selector }: Props) => {
  const [portalContainer, setPortalContainer] = useState<Element | null>(null);

  useEffect(() => {
    setPortalContainer(document.querySelector(selector));

    return () => setPortalContainer(null);
  }, [selector]);

  return portalContainer && createPortal(children, portalContainer, key);
};

export default Portal;
