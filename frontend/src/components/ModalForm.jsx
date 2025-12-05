import { useState, useEffect, useRef } from "react";
import Button from "./Button";
import MapImage from "./MapImage";
import { FaEdit } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import Toast from "./Toast";

export default function ModalForm({ isOpen, onClose, mode, onSubmit, tactic }) {
  // Estados dos campos do formulário
  const [map, setMap] = useState("");
  const [side, setSide] = useState("");
  const [zone, setZone] = useState("");
  const [description, setDescription] = useState("");
  const [effectiveness, setEffectiveness] = useState("");
  const mapRef = useRef();

  // Atualiza os campos ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      mapRef.current.focus();
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
          <h3 className="font-bold text-lg py-4 flex items-center gap-2">
            {mode === "edit" ? (
              <>
                <FaEdit size="20" />
                <span>Update tactic #{tactic._id}</span>
              </>
            ) : (
              <>
                <MdAddCircle size="20" />
                <span>Add Tactic</span>
              </>
            )}
          </h3>

          {/* Formulário */}
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (!map || !side || !zone || !description || !effectiveness) {
                alert("Todos os campos são obrigatórios!");
                return;
              }
              onSubmit({ map, side, zone, description, effectiveness });
            }}
          >
            <MapImage map={map} className={"h-48 w-96 object-fit rounded"} />
            {/* Mapa */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Map</legend>
              <select
                ref={mapRef}
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
                maxLength={200}
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
              <Button
                type="submit"
                className={"btn btn-success"}
                children={mode === "edit" ? "Save Changes" : "Add Tactic"}
              ></Button>
            </div>
          </form>
          {/* Button to close dialog */}
          <Button
            className={"btn btn-sm btn-circle btn-ghost absolute right-2 top-2"}
            onOpen={onClose}
            children={"✕"}
          ></Button>
        </div>
      </dialog>
    </>
  );
}
