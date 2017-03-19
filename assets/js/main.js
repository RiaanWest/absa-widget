var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCbsO5CllIyxtSaVpET2VNayssy7TnwS10",
  authDomain: "fire-starter-ce95c.firebaseapp.com",
  databaseURL: "https://fire-starter-ce95c.firebaseio.com",
  storageBucket: "fire-starter-ce95c.appspot.com",
  messagingSenderId: "114575192863"
});
var reviewsRef = firebaseApp.database().ref('reviews');

new Vue({
  el: '#app',
  data: {
    feedback: 'Hello World!',
    widgetIsExpanded: false,
    currentStep: 1,
    review: {
      rating: 0,
      name: '',
      email: '',
      feedback: ''
    }
  },
  firebase: {
    reviews: reviewsRef
  },
  methods: {
    widgetOpen: function(e) {
      this.widgetIsExpanded = true;
    },
    widgetClose: function() {
      this.widgetIsExpanded = false;
      this.currentStep = 1;
    },
    starOver: function(value) {
      this.review.rating = value;
    },
    ratingClick: function() {
      this.currentStep = 2;
    },
    submitForm: function () {
      this.feedback = 'Click';
      if (this.isValid) {
        reviewsRef.push(this.review)
        this.review.name = ''
        this.review.email = ''
      }
    },
  },
  computed: {
    validation: function () {
      return {
        name: !!this.review.name.trim(),
        email: emailRE.test(this.review.email)
      }
    },
    isValid: function () {
      var validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
})
