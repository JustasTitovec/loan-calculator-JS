document.querySelector('.loan-form').addEventListener('submit', function(e) {
  e.preventDefault();

  document.getElementById('results').style.display = 'none';

  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);
});

function calculateResults() {
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principle = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principle * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = (monthly * calculatedPayment - principle).toFixed(2);

    document.getElementById('results').style.display = 'block';

    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Check your numbers');
  }
}

function showError(e) {
  document.getElementById('results').style.display = 'none';

  document.getElementById('loading').style.display = 'none';

  const errorDiv = document.createElement('div');

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  errorDiv.classList = 'alert alert-danger';

  errorDiv.appendChild(document.createTextNode(e));

  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}
