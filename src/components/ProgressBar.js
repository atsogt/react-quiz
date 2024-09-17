import React from "react";

export default function ProgressBar({
  index,
  count,
  points,
  maxPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress max={count} value={index + Number(answer !== null)} />
      <p className="progressbar-indicator">
        Question <strong>{index + 1}</strong>/{count}
      </p>
      <p>
        <strong>
          {points}/{maxPoints}
        </strong>
      </p>
    </header>
  );
}
