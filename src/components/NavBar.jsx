export default function NavBar({ onOpen }) {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <a className="btn btn-ghost text-2xl">PlayBook</a>
        </div>
        <div className="navbar-center">
          <div className="flex gap-2">
            <input type="text" placeholder="Search Tactic..." className="input input-bordered w-24 md:w-auto" />
          </div>
        </div>
        <div className="navbar-end">
          <button className="btn btn-primary" onClick={onOpen}>
            Add Tactic
          </button>
        </div>
      </div>
    </>
  );
}
