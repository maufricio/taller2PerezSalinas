//Sacar resultado de decimales
function getDecimal(val){
    var totalDecimal;
    totalDecimal = Math.round(val * 100) / 100
    return totalDecimal
}

function radioCombos(form, name){
    var radios = form.elements[name];
    var val;
    var quantityCombo = document.getElementById("containerCombo")
    for(var i = 0, len = radios.length; i<len; i++){
        if(radios[i].checked == true){
            val = radios[i].value;
            var cantidadField;
            cantidadField = document.createElement("input")
            cantidadField.setAttribute("type", "number")
            cantidadField.setAttribute("name", "cantidadNum")
            cantidadField.setAttribute("id", "cantidadNumber")
            cantidadField.setAttribute("value", "1")
            quantityCombo.appendChild(cantidadField)

            break;
        }
    }
    return val;
}


function getSizeProce(e){
    this.form.elements['comboHidden'].value = parseFloat(this.value);
    updatePolloTotal(this.form);
}

//Sobreescribe el valor total de los items seleccionados
function updatePolloTotal(form){
    var sz_tot = parseFloat(form.elements['comboHidden'].value);
    var tops_tot = parseFloat(form.elements['toppHidden'].value);
    var quantity = parseFloat(form.elements['cantidadNum'].value);
    if(quantity > 1){
        form.elements['totalPagarOrden'].value = getDecimal((sz_tot* quantity) + tops_tot);
    }else{
        form.elements['totalPagarOrden'].value = getDecimal((sz_tot * 1) + tops_tot);
    }
    
}

//Para obtener resultado de toppings

function getToppingsTotal(e){
    var form = this.form;
    var val = parseFloat(form.elements['toppHidden'].value);
    if(this.checked == true){
        val += parseFloat(this.value);
    } else {
        val -= parseFloat(this.value);
    }
    form.elements['toppHidden'].value = getDecimal(val);
    updatePolloTotal(form);
}

var buttonSuggest = document.getElementById("sugerenciaPedido");
var contadorSugerencia = 0;
buttonSuggest.addEventListener("click", function(){
    var contenedorArea = document.getElementById("cuartaSeccion")
    var textArea = document.createElement("textarea")
    textArea.setAttribute("cols", "30")
    textArea.setAttribute("rows", "10")

    contenedorArea.appendChild(textArea)
    contadorSugerencia++;
    if(contadorSugerencia > 1){
        contenedorArea.removeChild(textArea)
    }
}, false);


/*function quantifyProduct(e){
    var currentTotal = form.elements['totalPagarOrden']
    var quantity = form.elements['cantidadNum']
    var result = parseFloat(currentTotal) * parseInt(quantity)
    updatePolloTotal(this.form)
}*/
(function(){

    var form = document.getElementById('formularioRestaurante');
    var el = document.getElementById('segundaSeccion');

    //Determinar los ingredientes seleccionados en las casillas de verificacion
    var tops = el.getElementsByTagName('input');
    for(var i = 0, len = tops.length; i<len; i++){
        if(tops[i].type === 'checkbox'){
            tops[i].onclick = getToppingsTotal;
        }
    }

    var sz = form.elements['cmb'];
    var quantityCombo = document.getElementById("containerCombo")
    for(var i = 0, len = sz.length; i < len; i++){
        sz[i].onclick = getSizeProce
    }

    //set sz_tot to value of selected
    form.elements['comboHidden'].value = getDecimal(parseFloat(radioCombos(form, 'cmb')));
    updatePolloTotal(form);

})();

