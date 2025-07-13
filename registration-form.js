const RegistrationForm = {
  data() {
    return {
      addressSameChecked: true,
    }
  },
  props: ["items"],
  template: `
    <h3>Registration</h3>
    <hr/>
    <form autocomplete="off" class="needs-validation" novalidate>
      <text-input label="First name" name="first-name" required="true" type="text"></text-input>
      <text-input label="Last name" name="last-name" required="true" type="text"></text-input>
      <text-input label="Email" name="email" required="true" type="email"></text-input>
      <select-input label="Favourite Colour" name="colors" required="true" :items="items"></select-input>
      
      <text-input label="Address" name="address" required="true" type="text"></text-input>
      <text-input label="City/Town" name="city" required="true" type="text"></text-input>
      <text-input label="State/Province" name="province" required="true" type="text"></text-input>
      <text-input label="Zip/Postal" name="zip" required="true" type="text"></text-input>
      
      <check-input v-on:click="addressSame" label="Mailing address same" checked="true" v-model="addressSameChecked"></check-input>

      <div v-if="addressSameChecked==false">  
        <text-input label="Mailing Address" name="mailingaddress" required="false" type="text"></text-input>
        <text-input label="Mailing City/Town" name="mailingcity" required="false" type="text"></text-input>
        <text-input label="Mailing State/Province" name="mailingprovince" required="false" type="text"></text-input>
        <text-input label="Mailing Zip/Postal" name="mailingzip" required="false" type="text"></text-input>
      </div>
      
      <check-input label="I agree to terms and conditions" required="true"></check-input>
      <hr/>
      <input class="btn btn-outline-primary" type="submit" value="Register">
    </form>
    `,
  methods: {
    addressSame(){
      console.log("address same fired");
      if (this.addressSameChecked === true){
        console.log("was checked on click")
        this.addressSameChecked = false;
      } else {
        console.log("was not checked on click");
        this.addressSameChecked = true;
      }
    }
  },
  components: {
    'text-input': TextInput,
    'select-input': SelectInput,
    'check-input': CheckInput,
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
