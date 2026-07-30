export default function Header() {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="app-header">
      <div className="app-header__mark" aria-hidden="true">
        §
      </div>
      <div>
        <h1 className="app-header__title">Ledger</h1>
        <p className="app-header__subtitle">Personal expense tracker · {today}</p>
      </div>
    </header>
  );
}
