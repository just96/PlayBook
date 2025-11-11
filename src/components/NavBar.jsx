import Button from "./Button";

export default function NavBar({ onOpen }) {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="navbar-start flex flex-col items-center leading-none">
            <label className="swap swap-flip text-6xl text-center ">
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
            <input type="text" placeholder="Search Tactic..." className="input input-bordered w-24 md:w-auto" />
          </div>
        </div>
        <div className="navbar-end">
          <Button className={"btn btn-primary"} onOpen={onOpen} children={"Add Tactic"}></Button>
        </div>
      </div>
    </>
  );
}
