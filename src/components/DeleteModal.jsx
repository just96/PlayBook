import Button from "./Button";

export default function DeleteModal({ isOpen, onClose, onConfirm, tactic }) {
  return (
    <>
      <dialog id="my_modal_2" className="modal backdrop-blur-sm" open={isOpen}>
        <div className="modal-box">
          {/* if there is a button in form, it will close the modal */}
          <Button
            className={"btn btn-sm btn-circle btn-ghost absolute right-2 top-2"}
            onOpen={onClose}
            children={"✕"}
          ></Button>
          <h3 className="font-bold text-lg">Sure you want to delete this tactic? #{tactic?.id || "?"}</h3>
          <div className="divider"></div>
          <Button className={"btn btn-error"} onOpen={onConfirm} children={"Delete"}></Button>
          <Button className={"btn btn-accent"} onOpen={onClose} children={"Cancel"}></Button>
        </div>
      </dialog>
    </>
  );
}
