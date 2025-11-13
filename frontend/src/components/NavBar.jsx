import Button from "./Button";
import SearchBar from "./SearchBar";
import { MdAddCircle } from "react-icons/md";

export default function NavBar({ onOpen, searchTerm, setSearchTerm }) {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="navbar-start flex flex-col items-center leading-none">
            <label className="swap swap-flip text-3xl md:text-6xl text-center ">
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" />
              <div className="swap-on">PlayBook</div>
              <div className="swap-off">📖</div>
            </label>
            <span className="text-2xl animate-bounce mt-5">⬆️</span>
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
        </div>
      </div>
    </>
  );
}
