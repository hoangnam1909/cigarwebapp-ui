function Alert({ type, message }) {
  return (
    <div class={`alert alert-${type}`} role="alert">
      {message}
    </div>
  );
}

export default Alert;
