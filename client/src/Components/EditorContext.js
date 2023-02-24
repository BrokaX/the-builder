import React, { createContext, useState } from 'react';

export const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const [editor, setEditor] = useState(null);

  return (
    <EditorContext.Provider value={{ editor, setEditor }}>
      {children}
    </EditorContext.Provider>
  );
};
