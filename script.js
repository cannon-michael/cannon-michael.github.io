const filters = document.querySelectorAll("[data-filter]");
const cardGrid = document.querySelector("[data-card-grid]");
const emptyState = document.querySelector("[data-empty-state]");

if (filters.length && cardGrid) {
  const cards = Array.from(cardGrid.querySelectorAll(".research-card"));

  const applyFilters = () => {
    const active = {};

    filters.forEach((filter) => {
      active[filter.dataset.filter] = filter.value;
    });

    let visibleCount = 0;

    cards.forEach((card) => {
      const matches = Object.entries(active).every(([key, value]) => {
        return value === "all" || card.dataset[key] === value;
      });

      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }
  };

  filters.forEach((filter) => {
    filter.addEventListener("change", applyFilters);
  });

  applyFilters();
}
