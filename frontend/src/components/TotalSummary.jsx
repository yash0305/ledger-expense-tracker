const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(value || 0);

export default function TotalSummary({ total, count }) {
  return (
    <section className="total-card" aria-label="Total expenses">
      <div className="total-card__row">
        <span className="total-card__label">Total spent</span>
        <span className="total-card__count">
          {count} {count === 1 ? "entry" : "entries"}
        </span>
      </div>
      <div className="total-card__amount">{formatCurrency(total)}</div>
      <div className="total-card__rule" aria-hidden="true" />
      <p className="total-card__footnote">
        Balance updates automatically as you add or remove entries.
      </p>
    </section>
  );
}
