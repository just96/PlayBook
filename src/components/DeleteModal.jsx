export default function DeleteModal({ isOpen, onClose, onConfirm }) {
  return (
    <>
      <dialog id="my_modal_2" className="modal" open={isOpen}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Sure you want to delete this tactic?</h3>
          <div className="divider"></div>
          <button className="btn btn-error" onClick={onConfirm}>
            Delete
          </button>
          <button className="btn btn-accent" onClick={onClose}>
            Cancel
          </button>
        </div>
      </dialog>
    </>
  );
}
