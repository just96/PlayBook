import "./App.css";
import { useState } from "react";

// Componentes
import NavBar from "./components/NavBar";
import TableList from "./components/TableList";
import ModalForm from "./components/ModalForm";
import Toast from "./components/Toast";
import DeleteModal from "./components/DeleteModal";

// Dados iniciais
import { tacticsData } from "./data/tacticsData";

function App() {
  // Estado principal
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [tactics, setTactics] = useState(tacticsData);
  const [selectedTactic, setSelectedTactic] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  // Abre o modal com modo "add" ou "edit"
  function handleOpen(mode, tactic = null) {
    setModalMode(mode);
    setSelectedTactic(tactic);
    setIsFormOpen(true);
  }

  function handleDelete(tactic) {
    setSelectedTactic(tactic);
    setIsDeleteOpen(true);
  }

  function submitDelete() {
    setTactics((prev) => prev.filter((tactic) => tactic.id !== selectedTactic.id));
    setToastMessage("Tactic deleted successfully!");
    setIsDeleteOpen(false);
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
    setIsFormOpen(false);
  }

  return (
    <>
      <NavBar onOpen={() => handleOpen("add")} />
      <div className="mt-4 mx-auto w-max">
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      </div>
      <TableList handleOpen={handleOpen} tacticData={tactics} onDelete={handleDelete} />
      <ModalForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        mode={modalMode}
        tactic={selectedTactic}
      />
      <DeleteModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} onConfirm={submitDelete} />
    </>
  );
}

export default App;
