import AppHeader from "../AppHeader/AppHeader";

function HeaderOnly({ children }) {
  return (
    <div>
      <AppHeader />
      <div className="content">{children}</div>
    </div>
  );
}

export default HeaderOnly;
