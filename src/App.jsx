import "./App.css";
import { useState } from "react";

// Componentes
import NavBar from "./components/NavBar";
import TableList from "./components/TableList";
import ModalForm from "./components/ModalForm";
import Toast from "./components/Toast";

// Dados iniciais
import { tacticsData } from "./data/tacticsData";

function App() {
  // Estado principal
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [tactics, setTactics] = useState(tacticsData);
  const [selectedTactic, setSelectedTactic] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  // Abre o modal com modo "add" ou "edit"
  function handleOpen(mode, tactic = null) {
    setModalMode(mode);
    setSelectedTactic(tactic);
    setIsOpen(true);
  }

  // Submete os dados do formulário
  function handleSubmit(data) {
    if (modalMode === "add") {
      const newTactic = { id: Date.now(), ...data };
      setTactics((prev) => [...prev, newTactic]);
      setToastMessage("Tactic added successfully!");
    } else if (modalMode === "edit" && selectedTactic) {
      setTactics((prev) => prev.map((tactic) => (tactic.id === selectedTactic.id ? { ...tactic, ...data } : tactic)));
      setToastMessage("Tactic edited successfully!");
    }
    setIsOpen(false);
  }

  return (
    <>
      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      <NavBar onOpen={() => handleOpen("add")} />
      <TableList handleOpen={handleOpen} tacticData={tactics} />
      <ModalForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        mode={modalMode}
        tactic={selectedTactic}
      />
    </>
  );
}

export default App;
