function ReloadData({ reloadFlag, setReloadFlag }) {
  return (
    <>
      <div className="remove-filter">
        <a
          type="button"
          className="btn btn-success px-3"
          onClick={(e) => {
            e.preventDefault();
            setReloadFlag(!reloadFlag);
          }}
        >
          <i className="fa-solid fa-rotate-right me-2"></i>
          Làm mới dữ liệu
        </a>
      </div>
    </>
  );
}

export default ReloadData;
