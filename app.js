// listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // hide results
  document.getElementById('results').style.display = 'none';
  // show loader
  document.getElementById('loading').style.display = 'block';

  // making loader load and after two seconds show results
  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

// Calculate Results
function calculateResults() {
  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  // parsefloat turns a number into a decimal
  // creating a principal {principal represents  the amount in the ui, also we run it as a parsefloat and make it into a decimal}
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  // checking to see if the monthly value is a finite number
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    // this function now shows results after loader
    document.getElementById('results').style.display = 'block';
    // now loader will be hidden
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
}

// showError
function showError(error) {
  // if there are no results everything loader and results must be hidden
  // this function now shows results after loader
  document.getElementById('results').style.display = 'none';
  // now loader will be hidden
  document.getElementById('loading').style.display = 'none';

  // create a div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // add class
  errorDiv.className = 'alert alert-danger';

  // create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// function for clear error
function clearError() {
  document.querySelector('.alert').remove();
}
