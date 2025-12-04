import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchTactics = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/tactics");
      const data = await res.json();
      setTactics(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }

    fetchTactics();
  }, [navigate]);

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

  async function submitDelete() {
    try {
      await fetch(`http://localhost:3000/tactics/${selectedTactic._id}`, {
        method: "DELETE",
      });
      setTactics((prev) => prev.filter((tactic) => tactic._id !== selectedTactic._id));
      setToastMessage("Tactic deleted successfully!");
      setIsDeleteOpen(false);
    } catch (error) {
      console.error(error);
      setToastMessage("Error deleting tactic");
    }
  }

  // Submete os dados do formulário
  async function handleSubmit(data) {
    try {
      let response;
      if (modalMode === "add") {
        response = await fetch("http://localhost:3000/tactics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const newTactic = await response.json();
        setTactics((prev) => [...prev, newTactic]);
        setToastMessage("Tactic added successfully!");
      } else if (modalMode === "edit" && selectedTactic) {
        response = await fetch(`http://localhost:3000/tactics/${selectedTactic._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const updatedTactic = await response.json();
        setTactics((prev) => prev.map((tactic) => (tactic._id === selectedTactic._id ? updatedTactic : tactic)));
        setToastMessage("Tactic updated successfully!");
      }
      await fetchTactics();
      setIsFormOpen(false);
    } catch (error) {
      console.error(error);
      setToastMessage("Error saving tactic");
    }
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

      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : (
        <TableList
          handleOpen={handleOpen}
          tacticData={filteredTactics}
          onDelete={handleDelete}
          onDetails={handleDetail}
        />
      )}

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
