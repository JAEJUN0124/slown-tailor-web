"use client";

import { useState } from "react";
import { JoinForm } from "./AccountForms";
import { JoinLayer } from "./AuthLayer";

export function JoinView() {
  const [gate, setGate] = useState(true);
  return (
    <>
      <JoinForm />
      {gate && (
        <JoinLayer
          onForm={() => {
            setGate(false);
            window.scrollTo({ top: 0 });
          }}
        />
      )}
    </>
  );
}
