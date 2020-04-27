import Axios from 'axios'

class ClientArea {
  constructor() {
    this.injectHTML()
    this.form = document.querySelector(".client-area__form")
    this.field = document.querySelector(".client-area__input")
    this.contentArea = document.querySelector(".client-area__content-area")
    this.events()
  }

  events() {
    this.form.addEventListener("submit", e => {
      e.preventDefault()
      this.sendRequest()
    })
  }

  sendRequest() {
    Axios.post('https://silly-nobel-c8f0fe.netlify.com/.netlify/functions/secret-area', {password: this.field.value}).then(response => {
      this.form.remove()
      this.contentArea.innerHTML = response.data
    }).catch(() => {
      this.contentArea.innerHTML = `<p class="client-area__error">That secret phrase is not correct. Try again.</p>`
      this.field.value = ''
      this.field.focus()
    })
  }

  injectHTML() {
    document.body.insertAdjacentHTML('beforeend', `
    <div class="client-area">
      <div class="wrapper wrapper--medium">
        <h2 class="section-title section-title--blue">Sign up for our newsletter</h2>
        <form class="client-area__form" action="">
          <input class="client-area__input" type="text" placeholder="Enter email address">
          <button class="btn btn--orange">Submit</button>
        </form>
        <div class="client-area__content-area"></div>
      </div>
    </div>
    `)
  }
}

export default ClientArea