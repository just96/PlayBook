import Button from "./Button";
import SearchBar from "./SearchBar";
import FlipLabel from "./FlipLabel";
import { MdAddCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function NavBar({ onOpen, searchTerm, setSearchTerm }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="navbar-start flex flex-col items-center leading-none">
            <FlipLabel />
          </div>
        </div>
        <div className="navbar-center">
          <div className="flex gap-2">
            <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div className="navbar-end">
          <Button
            className={"btn btn-primary"}
            onOpen={onOpen}
            children={
              <>
                <MdAddCircle color="black" size="15" />
                <span>Add Tactic</span>
              </>
            }
          ></Button>
          <Button className={"btn btn-soft btn-error mx-1"} onOpen={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}
