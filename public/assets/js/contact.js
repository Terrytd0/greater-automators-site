// Greater Automators — contact form handler.
// Saves submissions to a Google Sheet via a Google Apps Script web app.
(function () {
  var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby7yCgt9hQi7KrC40WMqNBzn8KepTv2F_CHtNx7Z8sRBpkB0dTcUKaTbAEKdSA8TbsK/exec';
  var EMAIL = 'greaterautomators@gmail.com';

  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form || form.className.indexOf('contact-form') === -1) return;

    e.preventDefault();

    var data = {
      name: (form.querySelector('[name="name"]') || {}).value || '',
      email: (form.querySelector('[name="email"]') || {}).value || '',
      message: (form.querySelector('[name="message"]') || {}).value || ''
    };

    saveToSheets(form, data);
  });

  function saveToSheets(form, data) {
    setStatus(form, 'Sending\u2026');

    fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data)
    })
      .then(function (r) { return r.text(); })
      .then(function () {
        form.reset();
        setStatus(form, 'Thanks \u2014 your message has been sent.');
      })
      .catch(function (err) {
        setStatus(form, 'Something went wrong (' + err.message + '). Please email ' + EMAIL + ' instead.');
      });
  }

  function setStatus(form, msg) {
    var el = form.querySelector('.form-status');
    if (!el) {
      el = document.createElement('p');
      el.className = 'form-status';
      form.appendChild(el);
    }
    el.textContent = msg;
  }
})();
