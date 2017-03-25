;
(function($) {
  'use strict';
  
  function clickedDataVal(target){
    var value = $(target).data('value');
    if (value === undefined){
      return '';
    } else {
      return value;
    }
  }

  function validValue(value){
    
    var opCheck = new RegExp(/[\+\-\/\^x]/);
    var numCheck = new RegExp(/^\-{0,1}\d*\.{0,1}\d*$/);
    var digitCheck = new RegExp(/\d/);
    var firstCheck = new RegExp(/[\d\-\.]/);
    
    var output = $output.html();
    var last = output[output.length-1];


    if (!output && !firstCheck.test(value)){
      return false;
    }

    if ((last === '.' || last === '%') && (value === '.' || value === '%')) {
      return false;
    }

    if (opCheck.test(last) && (opCheck.test(value) || value === '%' )) {
      return false;
    }

    var matches = output.match(numCheck);
    if (value === '.' && matches){
      
      if (matches[matches.length-1].indexOf('.') !== -1) {
        return false;
      }

    }

    return true;
  }

  var $output = $('#output');
  var $buttons = $('#buttons td');
  $output.html('');

  $buttons.on('click', function(event){
    var value = clickedDataVal(event.target);

    if (value === '='){
      $output.html(Calculator.calculate($output.html()));
      return;
    }

    if (value === 'C'){
      var output = ($output.html()).split('');
      output.pop();
      $output.html((output.join('')));
      return;
    }

    if (value === 'R'){
      $output.html('');
      return;
    }

    if (validValue(value)) {
      $output.html($output.html() + String(value));
    }

  });
})(jQuery);