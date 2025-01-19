let yes = document.getElementById('yes');
let no = document.getElementById('no');

let image = document.getElementById('gassy');

no.onclick = function() {
  gassy.src = "images/sadjack.png";
}

yes.onclick = function() {
  gassy.src = "images/happygassy.png";
}