const RegistrationForm = {
  props: [],
  template: `
    <h3>Registration</h3>
    <hr/>
    <form autocomplete="off" class="needs-validation" novalidate>
      <text-input label="First name" name="first-name" required="true" type="text"></text-input>
      <text-input label="Last name" name="last-name" required="true" type="text"></text-input>
      <text-input label="Email" name="email" required="true" type="email"></text-input>
      <hr/>
      <input class="btn btn-outline-primary" type="submit" value="Register">
    </form>
    `,
  components: {
    'text-input': TextInput,
  },
  mounted(){
    (function () {
      'use strict';
      let forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }

            form.classList.add('was-validated')
          }, false)
        })
    })()
  }
}
