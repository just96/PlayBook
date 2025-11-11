export default function Button({ className, onOpen, children, ...props }) {
  return (
    <button className={className} onClick={onOpen} {...props}>
      {children}
    </button>
  );
}
