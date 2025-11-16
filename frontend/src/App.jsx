import "./App.css";
import { useState, useEffect } from "react";

// Componentes
import NavBar from "./components/NavBar";
import TableList from "./components/TableList";
import ModalForm from "./components/ModalForm";
import Toast from "./components/Toast";
import DeleteModal from "./components/DeleteModal";
import DetailsModal from "./components/DetailsModal";

// // Dados iniciais
// import { tacticsData } from "./data/tacticsData";

function App() {
  // Estado principal
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [tactics, setTactics] = useState([]);
  const [selectedTactic, setSelectedTactic] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("http://localhost:3000/tactics");
        const data = await res.json();
        setTactics(data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  // console.log(tactics);

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

  function handleDetail(tactic) {
    setSelectedTactic(tactic);
    setIsDetailsOpen(true);
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
      setToastMessage("Tactic updated successfully!");
    }
    setIsFormOpen(false);
  }

  // Filtra as táticas
  const filteredTactics = searchTerm
    ? tactics.filter(
        (tactic) =>
          tactic.map.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tactic.side.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tactic.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tactic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tactic.effectiveness.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : tactics;

  return (
    <>
      <NavBar onOpen={() => handleOpen("add")} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      <TableList
        handleOpen={handleOpen}
        tacticData={filteredTactics}
        onDelete={handleDelete}
        onDetails={handleDetail}
      />
      <ModalForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        mode={modalMode}
        tactic={selectedTactic}
      />
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={submitDelete}
        tactic={selectedTactic}
      />
      <DetailsModal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} tactic={selectedTactic} />
    </>
  );
}

export default App;
