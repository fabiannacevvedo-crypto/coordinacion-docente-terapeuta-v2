import React from "react";
import { CheckCircle2, AlertTriangle, AlertOctagon } from "lucide-react";

export const SemaforoBadge = ({ estado }) => {
  const norm = (estado || "").toLowerCase();

  if (norm === "bueno") {
    return (
      <span className="badge semaforo-bueno">
        <CheckCircle2 size={13} />
        <span>Bueno</span>
      </span>
    );
  }

  if (norm === "regular") {
    return (
      <span className="badge semaforo-regular">
        <AlertTriangle size={13} />
        <span>Regular</span>
      </span>
    );
  }

  return (
    <span className="badge semaforo-atencion">
      <AlertOctagon size={13} />
      <span>Atencion</span>
    </span>
  );
};
