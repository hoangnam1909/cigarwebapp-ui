function AlertIcon({ type }) {
  if (type == "danger" || type == "warning") {
    return <i className="fa-solid fa-triangle-exclamation me-2"></i>;
  }

  if (type == "success") {
    return <i className="fa-solid fa-circle-check me-2"></i>;
  }

  return <i className="fa-solid fa-circle-info me-2"></i>;
}

export default AlertIcon;
