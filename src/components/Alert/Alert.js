import AlertIcon from "./AlertIcon";

function Alert({ type, message }) {
  return (
    <>
      <div
        className={`alert alert-${type} d-flex align-items-center m-3 py-4`}
        role="alert"
      >
        <h5 className="text-center w-100 m-0">
          <AlertIcon type={type} />
          {message}
        </h5>
      </div>
    </>
  );
}

export default Alert;
