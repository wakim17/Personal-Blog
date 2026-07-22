document.addEventListener('DOMContentLoaded', () => {
  /* --- Theme Toggle Logic --- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');

  // Check for saved theme in localStorage
  let currentTheme = localStorage.getItem('theme');

  // If no saved theme, default to dark (maroon) as per requirements
  if (!currentTheme) {
    currentTheme = 'dark';
  }

  // Apply the theme
  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
    themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
  } else {
    document.documentElement.removeAttribute('data-theme');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
    themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
  }

  themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');

    if (theme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
      themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
      themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
    }
  });

  /* --- Category Filtering Logic --- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const articles = document.querySelectorAll('.feed-grid .card');

  if (filterBtns.length > 0 && articles.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active and aria-selected state
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const selectedCategory = btn.getAttribute('data-category');
        let visibleCount = 0;

        articles.forEach(article => {
          const articleCategory = article.getAttribute('data-category');

          if (selectedCategory === 'All' || selectedCategory === articleCategory) {
            article.classList.remove('hidden');
            visibleCount++;
          } else {
            article.classList.add('hidden');
          }
        });

        // Announce filtered results to screen readers
        const liveRegion = document.getElementById('filter-status');
        if (liveRegion) {
          liveRegion.textContent = `Showing ${visibleCount} of ${articles.length} articles`;
        }
      });
    });
  }

  /* --- Sorting Logic --- */
  const sortSelect = document.getElementById('sort-order');
  const feedGrid = document.getElementById('article-feed');

  if (sortSelect && feedGrid) {
    sortSelect.addEventListener('change', () => {
      const order = sortSelect.value;
      const articleCards = Array.from(feedGrid.querySelectorAll('.card'));

      articleCards.sort((a, b) => {
        const dateA = new Date(a.getAttribute('data-date') || 0);
        const dateB = new Date(b.getAttribute('data-date') || 0);

        return order === 'newest' ? dateB - dateA : dateA - dateB;
      });

      articleCards.forEach(card => feedGrid.appendChild(card));
    });
  }

  /* --- Wide View Reader Toggle Logic --- */
  const viewToggleBtn = document.getElementById('view-toggle');
  const postContainer = document.querySelector('.post-container');

  if (viewToggleBtn && postContainer) {
    const savedView = localStorage.getItem('reader-view');
    const toggleText = viewToggleBtn.querySelector('.toggle-text');

    if (savedView === 'wide') {
      postContainer.classList.add('wide-view');
      if (toggleText) toggleText.textContent = 'Standard View';
    }

    viewToggleBtn.addEventListener('click', () => {
      postContainer.classList.toggle('wide-view');
      const isWide = postContainer.classList.contains('wide-view');

      if (toggleText) {
        toggleText.textContent = isWide ? 'Standard View' : 'Wide View';
      }

      localStorage.setItem('reader-view', isWide ? 'wide' : 'standard');
    });
  }
});
