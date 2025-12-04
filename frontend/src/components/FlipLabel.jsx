export default function FlipLabel({ onText = "PlayBook", offText = "📖" }) {
  return (
    <>
      <label className="swap swap-flip text-3xl md:text-6xl text-center ">
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" />
        <div className="swap-off">{onText}</div>
        <div className="swap-on">{offText}</div>
      </label>
      <span className="text-2xl animate-bounce mt-5">⬆️</span>
    </>
  );
}
