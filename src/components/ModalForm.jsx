import { useState, useEffect } from "react";

export default function ModalForm({ isOpen, onClose, mode, onSubmit, tactic }) {
  // Estados dos campos do formulário
  const [map, setMap] = useState("");
  const [side, setSide] = useState("");
  const [zone, setZone] = useState("");
  const [description, setDescription] = useState("");
  const [effectiveness, setEffectiveness] = useState("");

  // Atualiza os campos ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && tactic) {
        setMap(tactic.map);
        setSide(tactic.side);
        setZone(tactic.zone);
        setDescription(tactic.description);
        setEffectiveness(tactic.effectiveness);
      } else {
        setMap("");
        setSide("");
        setZone("");
        setDescription("");
        setEffectiveness("");
      }
    }
  }, [isOpen, mode, tactic]);

  return (
    <>
      <dialog id="my_modal_3" className="modal backdrop-blur-sm" open={isOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg py-4">{mode === "edit" ? "Edit Tactic" : "Add Tactic"}</h3>

          {/* Formulário */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit({ map, side, zone, description, effectiveness });
            }}
          >
            {/* Mapa */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Map</legend>
              <select
                className="select"
                value={map}
                onChange={(e) => {
                  setMap(e.target.value);
                }}
              >
                <option disabled value="">
                  Select a map
                </option>
                <option value="Dust2">Dust2</option>
                <option value="Mirage">Mirage</option>
                <option value="Inferno">Inferno</option>
                <option value="Nuke">Nuke</option>
                <option value="Train">Train</option>
                <option value="Overpass">Overpass</option>
                <option value="Ancient">Ancient</option>
              </select>
            </fieldset>
            {/* Side */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Side</legend>
              <select
                className="select"
                value={side}
                onChange={(e) => {
                  setSide(e.target.value);
                }}
              >
                <option disabled value="">
                  Select a side
                </option>
                <option value="CT">Counter-Terrorist (CT)</option>
                <option value="T">Terrorist (T)</option>
              </select>
            </fieldset>
            {/* Zone */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Zone</legend>
              <select
                className="select"
                value={zone}
                onChange={(e) => {
                  setZone(e.target.value);
                }}
              >
                <option disabled value="">
                  Select a zone
                </option>
                <option value="Bombsite A">Bombsite A</option>
                <option value="Bombsite B">Bombsite B</option>
                <option value="Other">Other</option>
              </select>
            </fieldset>
            {/* Description */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Description</legend>
              <textarea
                className="textarea h-24"
                placeholder="Describe your strat..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </fieldset>
            {/* Effectiveness */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Effectiveness</legend>
              <select
                className="select"
                value={effectiveness}
                onChange={(e) => {
                  setEffectiveness(e.target.value);
                }}
              >
                <option disabled value="">
                  Choose level
                </option>
                <option value="Low">Low</option>
                <option value="Mid">Mid</option>
                <option value="High">High</option>
              </select>
            </fieldset>
            {/* Button to submit */}
            <div className="mt-3">
              <button type="submit" className="btn btn-success">
                {mode === "edit" ? "Save Changes" : "Add Tactic"}
              </button>
            </div>
          </form>
          {/* Button to close dialog */}
          <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
            ✕
          </button>
        </div>
      </dialog>
    </>
  );
}
