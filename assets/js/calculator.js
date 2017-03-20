;
'use strict';

var calculator = {};

(function(calculator) {

  var negRegExp = new RegExp(/\-\-/g);
  var percentRegExp = new RegExp(/\-{0,1}\d*\.{0,1}\d*%/g)
  var powRegExp = new RegExp(/\-{0,1}\d*\.{0,1}\d*\^\d*/);
  var mdRegExp = new RegExp(/\-{0,1}\d*\.{0,1}\d*[\/x]\-{0,1}\d*\.{0,1}\d*/);
  var asRegExp = new RegExp(/\-{0,1}\d*\.{0,1}\d*[\+\-]\-{0,1}\d*\.{0,1}\d*/);
  var numRegExp = new RegExp(/^\-{0,1}\d*\.{0,1}\d*$/);

  function add(n, n1) { 
    return n + n1;
  }

  function subtract(n, n1) { 
    return n - n1;
  }

  function multiply(n, n1) { 
    return n * n1;
  }

  function divide(n, n1) { 
    return n / n1;
  }

  function percent(n) { 
    return n / 100;
  }

  function percentages(str){
    return str.replace(percentRegExp, function(match){
      var n = Number(match.substring(0, match.length-1));
      return String(percent(n));
    });  
  }

  function exponents(str){
    return calculate(str.replace(powRegExp, function(match){
      var arr = match.split('^');
      var n = Number(arr[0]), p = Number(arr[1]);
      return String(Math.pow(n, p));
    }));
  }

  function multiplyOrDivide(str){
    return calculate(str.replace(mdRegExp, function(match){
      var arr, n, n1, fn;

      if (/x/.test(match)){
        arr = match.split('x');
        fn = multiply;
      } else {
        arr = match.split('/');
        fn = divide;
      }
      n = Number(arr[0]), n1 = Number(arr[1]);
      return String(fn(n, n1));
    }));
  }

  function addOrSubtract(str){
    return calculate(str.replace(asRegExp, function(match){
      var arr, n, n1, fn;

      if (/\+/.test(match)){
        arr = match.split('+');
        fn = add;
      } else {
        arr = match.split('-');
        fn = subtract;
      }
      n = Number(arr[0]), n1 = Number(arr[1]);
      return String(fn(n, n1));
    }));
  }

  function formatNum(str) {
    
    if (/\./.test(str)){
      var strArr = str.split('.');

      var integer = strArr[0];
      var fraction = Number(strArr[1]).toPrecision(5);

      str = integer + fraction;
    } 

    if (str.length > 12){
      str = Number(str).toExponential();
    }

    return str;

  }

  function calculate(str){
    
    if(numRegExp.exec(str)){

      
      return formatNum(str);
    }

    str = percentages(str);

    if(powRegExp.test(str)){
      return exponents(str);
    }

    if (mdRegExp.test(str)){
      return multiplyOrDivide(str);
    }

    if (asRegExp.test(str)){
      return addOrSubtract(str);
    }
  }

  calculator.calculate = function(str){
    return calculate(str);
  }

  calculator.operators = function(){
    return ['%','^','x','/','+','-','='];
  }


})(calculator);

