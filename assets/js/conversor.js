(function(exports) {
  "use strict";

  function validar(expresion) {
  
  }

  function Medida(valor,tipo)
  {
    /* tipo es opcional. Debería admitir  new Medida("45.2 Km") */
    /* ademas de new Medida(45.2, "Km") */
    this.valor = valor || 0;
    this.tipo = tipo || "vacio";
    console.log("medida");
  }

  function Temperatura(valor,tipo)
  {
    /* tipo es opcional. Debería admitir new Medida("45.2 F") */
    Medida.call(this,valor,tipo);

  }
  Temperatura.prototype = new Medida();
  Temperatura.prototype.constructor = Temperatura;


  function Celsius(valor)
  {
    Temperatura.call(this, valor);
  }
  Celsius.prototype = new Temperatura();
  Celsius.prototype.constructor = Celsius;
  Celsius.prototype.toFarenheit = function() {
    return ((this.value * 9/5) + 32);
  };

  Celsius.prototype.toKelvin = function() {
    return (this.value + 273.15);
  };

  function Farenheit(valor)
  {
    Temperatura.call(this, valor);
  }
  Farenheit.prototype = new Temperatura();
  Farenheit.prototype.constructor = Farenheit;
  Farenheit.prototype.toCelsius = function(){
    return ((this.value - 32)* 5/9);
  };
  Farenheit.prototype.toKelvin = function(){
    return (((this.value - 32)*5/9) + 273);
  };

  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;

  exports.convertir = function() {
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i;
    valor     = valor.match(regexp);

    if (valor) {
      var numero = valor[1],
          tipo   = valor[2].toLowerCase();

      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", Tipo: " + tipo);

      switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);
          elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
          break;
        case 'f':
          var farenheit = new Farenheit(numero);
          elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
          break;

        default:
          elemento.innerHTML = "Error! Parace haber un error en la entrada. Inténtelo de nuevo"
      }
    }
    else
      elemento.innerHTML = "";
  };
})(this);
