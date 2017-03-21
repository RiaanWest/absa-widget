(function(window, document) {
  var embedder = document.getElementById('feedback-widget');

  function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    embedder.parentNode.insertBefore(script, embedder);

    if (typeof callback !== "undefined") {
      if (script.readyState) {
        script.onreadystatechange = function () {
          if (this.readyState === 'complete' || this.readyState === 'loaded') {
            callback();
          }
        };
      } else {
        script.onload = callback;
      }
    }
  }

  loadScript('https://code.jquery.com/jquery-2.2.4.min.js', function() {
    $ = jQuery = window.jQuery.noConflict(true);

    loadScript("dist/js/vendor/vue.js", function() {
      loadScript("https://gstatic.com/firebasejs/3.5.2/firebase.js", function() {
        loadScript("https://unpkg.com/vuefire/dist/vuefire.js", function() {
          loadHtmlCSS();
        });
      });
    });
  });

  function loadHtmlCSS() {
    $('#feedback-widget').load('app.html', startApp);
    $('head').append($('<link rel="stylesheet" type="text/css" href="dist/styles/main.css">'));
    $('head').append($('<link href="https://fonts.googleapis.com/css?family=Nunito|Nunito+Sans" rel="stylesheet">'));
  }

  function startApp() {
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
        widgetIsExpanded: false,
        currentStep: 0,
        formSubmitAttempted: false,
        openBtnBouncing: true,
        review: {
          rating: 0,
          name: '',
          email: '',
          feedback: '',
          url: ''
        }
      },
      firebase: {
        reviews: reviewsRef
      },
      methods: {
        widgetOpen: function(e) {
          var vi = this;
          this.widgetIsExpanded = true;
          setTimeout(function() {
            vi.currentStep = 1;
          }, 400);
          this.openBtnBouncing = false;
        },
        widgetClose: function() {
          this.widgetIsExpanded = false;
          this.currentStep = 0;
          this.openBtnBouncing = true;
        },
        starOver: function(value) {
          this.review.rating = value;
        },
        ratingClick: function() {
          this.currentStep = 2;
        },
        submitForm: function () {
          var vi = this;
          this.formSubmitAttempted = true;
          this.setURL();

          if (this.isValid) {
            reviewsRef.push(this.review);
            this.review.name = '';
            this.review.email = '';
            this.currentStep = 3;

            setTimeout(function() {
              vi.widgetClose();
            }, 4000);
          }
        },
        setURL: function() {
          this.review.url = (window.location != window.parent.location)
            ? document.referrer
            : document.location.href;
        }
      },
      computed: {
        validation: function () {
          return {
            name: !!this.review.name.trim(),
            email: emailRE.test(this.review.email)
          }
        },
        isValid: function () {
          var validation = this.validation;
          console.log(validation);
          this.feedback = validation.name;
          return Object.keys(validation).every(function (key) {
            return validation[key]
          })
        }
      },
    });
  }
}(window, document));
