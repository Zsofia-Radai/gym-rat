import { createContext, useContext, useEffect, useState } from "react";

const TemplatesContext = createContext(null);

export function TemplatesProvider({ children }) {
  const [templates, setTemplates] = useState(() => {
    const storedTemplates = localStorage.getItem("templates");

    return storedTemplates ? JSON.parse(storedTemplates) : [];
  });

  useEffect(() => {
    localStorage.setItem("templates", JSON.stringify(templates));
  }, [templates]);

  const createTemplate = (name, exercises) => {
    return {
      id: crypto.randomUUID(),
      name: name,
      exercises: exercises,
    };
  };

  const addTemplate = (name, exercises) => {
    const newTemplate = createTemplate(name, exercises);
    setTemplates((prev) => [...prev, newTemplate]);
  };

  const deleteTemaple = (id) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTemplate = (id, name, exercises) => {
    setTemplates((prev) =>
      prev.map((t) => {
        return t.id === id ? { ...t, name, exercises } : t;
      }),
    );
  };

  return (
    <TemplatesContext.Provider
      value={{
        templates,
        addTemplate,
        deleteTemaple,
        updateTemplate,
      }}
    >
      {children}
    </TemplatesContext.Provider>
  );
}

export function useTemplates() {
  const context = useContext(TemplatesContext);

  if (!context) {
    throw new Error("useTemplates must be used inside TemapltesProvider");
  }

  return context;
}
