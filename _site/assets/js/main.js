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
  } else {
    document.documentElement.removeAttribute('data-theme');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }

  themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');

    if (theme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  });

  /* --- Category Filtering Logic --- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const articles = document.querySelectorAll('.feed-grid .card');

  if (filterBtns.length > 0 && articles.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const selectedCategory = btn.getAttribute('data-category');

        articles.forEach(article => {
          const articleCategory = article.getAttribute('data-category');

          if (selectedCategory === 'All' || selectedCategory === articleCategory) {
            article.classList.remove('hidden');
          } else {
            article.classList.add('hidden');
          }
        });
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
