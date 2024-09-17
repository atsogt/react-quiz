import React from "react";

export default function FinishScreen({ points, maxPoints }) {
  const percentage = (points / maxPoints) * 100;
  return (
    <div className="result">
      You scored <strong>{points}</strong> out of {maxPoints} (
      {Math.ceil(percentage)})
    </div>
  );
}
