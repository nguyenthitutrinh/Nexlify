// Load sidebar and topbar
document.addEventListener('DOMContentLoaded', function() {
  // Load sidebar
  fetch('sidebar.html')
    .then(response => response.text())
    .then(html => {
      document.body.insertAdjacentHTML('afterbegin', html);
      setActiveNav();
    });

  // Load topbar
  fetch('topbar.html')
    .then(response => response.text())
    .then(html => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        sidebar.insertAdjacentHTML('afterend', html);
      }
    });
});

// Set active navigation based on current page
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'dashboard';
  const navItems = document.querySelectorAll('.nav-item[data-page]');
  
  navItems.forEach(item => {
    if (item.getAttribute('data-page') === currentPage) {
      item.classList.add('active');
      // Open parent if in submenu
      const parent = item.closest('.nav-sub');
      if (parent) {
        parent.classList.add('open');
        parent.previousElementSibling.classList.add('open');
      }
    }
  });
}

// Toggle navigation submenu
function toggleNav(el) {
  el.classList.toggle('open');
  el.nextElementSibling.classList.toggle('open');
}

// Toggle profile dropdown
function toggleProfileDropdown() {
  const dropdown = document.getElementById('profileDropdown');
  if (dropdown) {
    dropdown.classList.toggle('open');
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
  const profileBtn = document.querySelector('.profile-btn');
  const dropdown = document.getElementById('profileDropdown');
  
  if (dropdown && profileBtn) {
    if (!profileBtn.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.classList.remove('open');
    }
  }
});

// Logout function
function logout() {
  if (confirm('Bạn có chắc muốn đăng xuất?')) {
    // Redirect to login page
    window.location.href = 'login.html';
  }
}

// Page transitions
(function(){
  document.body.style.opacity='0';
  document.body.style.transition='opacity .2s ease';
  window.addEventListener('load',function(){
    document.body.offsetHeight;
    document.body.style.opacity='1';
  });
  document.addEventListener('click',function(e){
    var link=e.target.closest('a.nav-item');
    if(!link) return;
    var href=link.getAttribute('href');
    if(!href||href==='#') return;
    e.preventDefault();
    document.body.style.opacity='0';
    setTimeout(function(){ window.location.href=href; },200);
  });
})();
