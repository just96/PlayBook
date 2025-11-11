import MapImage from "./MapImage";

export default function DetailsModal({ isOpen, onClose, tactic }) {
  if (!isOpen || !tactic) return null;

  return (
    <>
      <dialog id="my_modal_3" className="modal backdrop-blur-sm" open={isOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg py-4">
            Tactic Details <strong>#{tactic.id}</strong>
          </h3>
          <MapImage map={tactic.map} className="rounded" />
          {/* Mapa */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Map</legend>
            <select className="select" value={tactic.map} disabled>
              <option>{tactic.map}</option>
            </select>
          </fieldset>
          {/* Side */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Side</legend>
            <select className="select" value={tactic.side} disabled>
              <option>{tactic.side}</option>
            </select>
          </fieldset>
          {/* Zone */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Zone</legend>
            <select className="select" value={tactic.zone} disabled>
              <option>{tactic.zone}</option>
            </select>
          </fieldset>
          {/* Description */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Description</legend>
            <textarea
              className="textarea h-24"
              placeholder="Describe your strat..."
              value={tactic.description}
              disabled
            ></textarea>
          </fieldset>
          {/* Effectiveness */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Effectiveness</legend>
            <select className="select" value={tactic.effectiveness} disabled>
              <option>{tactic.effectiveness}</option>
            </select>
          </fieldset>
          {/* Button to close dialog */}
          <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
            ✕
          </button>
        </div>
      </dialog>
    </>
  );
}
