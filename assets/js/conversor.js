(function(exports) {
  "use strict";

  function Medida(valor,tipo)
  {
    /* tipo es opcional. Debería admitir  new Medida("45.2 Km") */
    /* ademas de new Medida(45.2, "Km") */
    this.valor = valor || 0;
    this.tipo = tipo || "vacio";
    console.log("medida");
  }

  var regexp = XRegExp('(\\s)*'+
                      '(?<cantidad> [+-]? [0-9]+ (.? [0-9]+)? (?:e [+-]? [0-9]+)?)' +
                      '(\\s)*' +
                      '(?<unidad> ([a-z,A-Z]+))' +
                      '(\\s)*' +
                      '(to)?' +
                      '(\\s)*' +
                      '(?<to> [fck])', 'x');


  function Temperatura(valor,tipo)
  {
    /* tipo es opcional. Debería admitir new Medida("45.2 F") */
    Medida.call(this,valor,tipo);

  }
  Temperatura.prototype = new Medida();
  Temperatura.prototype.constructor = Temperatura;


  function Celsius(valor)
  {
    Temperatura.call(this, valor, "c");
  }
  Celsius.prototype = new Temperatura();
  Celsius.prototype.constructor = Celsius;
  Celsius.prototype.toFarenheit = function() {
    return ((this.valor * 9/5) + 32);
  };

  Celsius.prototype.toKelvin = function() {
    return (this.valor + 273.15);
  };
  Celsius.prototype.toCelsius = function() {
    return (this.valor);
  };

  function Farenheit(valor)
  {
    Temperatura.call(this, valor, "f");
  }
  Farenheit.prototype = new Temperatura();
  Farenheit.prototype.constructor = Farenheit;
  Farenheit.prototype.toCelsius = function(){
    return ((this.valor - 32)* 5/9);
  };
  Farenheit.prototype.toKelvin = function(){
    return (((this.valor - 32)*5/9) + 273);
  };
  Farenheit.prototype.toFarenheit = function() {
    return (this.valor);
  };
  function Kelvin(valor) {
    Temperatura.call(this, valor, "k");
  }
  Kelvin.prototype = new Temperatura();
  Kelvin.prototype.constructor = Kelvin;
  Kelvin.prototype.toCelsius = function() {
    return (this.valor-273.15);
  };
  Kelvin.prototype.toFarenheit = function() {
    return (((9*this.valor - 273.15)/5)+32);
  };
  Kelvin.prototype.toKelvin = function() {
    return (this.valor);
  };

  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;

  exports.convertir = function() {
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted');
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        //regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i;
    valor = valor.toLowerCase();
    valor = XRegExp.exec(valor, regexp);

    if (valor) {
      var numero = valor.cantidad,
          tipo   = valor.unidad,
          destino = valor.to;

      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", Tipo: " + tipo + ", Destino: " + destino);

      switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);
          if (destino == 'f')
            elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
          if (destino == 'c')
            elemento.innerHTML = celsius.toCelsius().toFixed(2) + " Celsius";
          if (destino == 'k')
            elemento.innerHTML = celsius.toKelvin().toFixed(2) + " Kelvin";
          break;
        case 'f':
          var farenheit = new Farenheit(numero);
          if (destino == 'f')
            elemento.innerHTML = farenheit.toFarenheit().toFixed(2) + " Farenheit";
          if (destino == 'c')
            elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
          if (destino == 'k')
            elemento.innerHTML = farenheit.toKelvin().toFixed(2) + " Kelvin";
          break;
        case 'k':
          var kelvin = new Kelvin(numero);
          if (destino == 'f')
            elemento.innerHTML = kelvin.toFarenheit().toFixed(2) + " Farenheit";
          if (destino == 'c')
            elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
          if (destino == 'k')
            elemento.innerHTML = kelvin.toKelvin().toFixed(2) + " Kelvin";
          break;

        default:
          elemento.innerHTML = "Ese tipo de dato no está definido. Inténtelo de nuevo.";
      }
    }
    else
      elemento.innerHTML = "Error! Parace haber un error en la entrada. Inténtelo de nuevo";
  };
})(this);
