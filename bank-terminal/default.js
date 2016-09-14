var transactions = [];

var theTerminal = document.querySelector('#terminal');

theTerminal.addEventListener('submit', transact);

function transact(e) {
  e.preventDefault();
  var theAmount = document.querySelector('#terminal [name="amount"]');
  var theType = document.querySelector(':checked');

  var theTerminal = e.target;

  if (theTerminal.checkValidity() && theAmount.value !== '' & theAmount.value > 0) {
    var transaction = {}

    transaction.amount = theAmount.value;
    transaction.type = theType.value;
    transactions.push(transaction);
    (theType.value === 'credit')
      ? alert('We have credited the your account: ' + theAmount.value + '.')
      : alert('We have debited your account:' + theAmount.value + '.')
  } else {
    alert('Please input a valid amount above 0.')
  }
}
