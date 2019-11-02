document.addEventListener('DOMContentLoaded', function () {
  let sideNavs = document.querySelectorAll('.sidenav')
  let currentPage = window.location.hash.substr(1).toLowerCase()

  // Activate sidebar navs
  let sideNav = M.Sidenav.init(sideNavs)[0]

  // No requested specific page?
  if (currentPage === "") currentPage = "home"

  loadNav()
  loadPage()

  /**
   * Load available navigation
   * fill loaded navigation to nav.
   *
   * @return  void
   */
  function loadNav() {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status !== 200) return

        document.querySelectorAll('.topnav, .sidenav')
          .forEach(function (nav) {
            nav.innerHTML = xhr.responseText
          })

        // Load page on navigation clicked
        document.querySelectorAll('.brand-logo, .topnav a, .sidenav a')
          .forEach(function (navigation) {
            navigation.addEventListener('click', function () {
              // close sidenav
              sideNav.close()

              loadPage(navigation.getAttribute('href').substr(1))
            })
          })
      }
    }
    xhr.open('GET', 'nav.html', true)
    xhr.send()
  }

  /**
   * Load requested page.
   *
   * @param   page    target page to load
   * @return  void
   */
  function loadPage(page) {
    if (typeof page === 'undefined') page = currentPage

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        let bodyContent = document.getElementById('BodyContent')

        if (this.status === 200) {
          bodyContent.innerHTML = xhr.responseText
        } else if (this.status === 404) {
          bodyContent.innerHTML = `
                                  <p class="center-align"><img src="/images/sick.png"></p>
                                  <p class="center-align">Halaman tidak ditemukan</p>
                                  `
        } else {
          bodyContent.innerHTML = `
                                  <p class="center-align"><img src="/images/sick.png"></p>
                                  <p class="center-align">Ups.. halaman tidak dapat diakses</p>
                                  `
        }
      }
    }
    xhr.open('GET', `/pages/${page}.html`, true)
    xhr.send()
  }
})
