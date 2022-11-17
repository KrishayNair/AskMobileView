import React, { useCallback, useState, useMemo } from "react";
import dynamic from "next/dynamic";
const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";

const MDE = ({ value, onChange }) => {
  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: false,
      spellChecker: false,
      toolbar: ["bold", "italic", "link", "image", "quote"],
    };
  }, []);

  return (
    <SimpleMdeReact
      placeholder="Type your question....."
      options={autofocusNoSpellcheckerOptions}
      value={value}
      onChange={onChange}
    />
  );
};

export default MDE;
