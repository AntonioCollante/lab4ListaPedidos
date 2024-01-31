function agregar() {

    //valores de campos
    var precioCel = document.getElementById('precio').value;;
    var cantidadCel = document.getElementById('cantidad').value;
    var subTotalCel = precioCel * cantidadCel;

    datosImagen = document.getElementById("img").files[0];
    console.log(datosImagen);

    //se valida si se selecciono una imagen
    if (datosImagen == undefined || precioCel == "" || cantidadCel == "" || subTotalCel == "") {
        alert("Ingrese todos los datos para continuar...");
        return false;
    }

    //obtengo el numero de filas
    var Tbl = document.getElementById("tblProductos");
    var numFila = Tbl.getElementsByTagName('tr').length - 1;

    //inserto una fila al final de mi tbody
    var row = Tbl.insertRow(numFila);

    //creo las celdas de la tabla
    var id = row.insertCell(0);
    var nombre = row.insertCell(1);
    var precio = row.insertCell(2);
    var cantidad = row.insertCell(3);
    var subTotal = row.insertCell(4);
    var imagen = row.insertCell(5);

    //agrego el valor a las celdas
    id.innerHTML = numFila;
    nombre.innerHTML = document.getElementById('nombres').value;
    precio.innerHTML = "S/." + precioCel;
    cantidad.innerHTML = cantidadCel;
    subTotal.innerHTML = subTotalCel;

    /**inicio base64*/
    var reader = new FileReader();
    reader.addEventListener("load", function () {
        // convierte la imagen a una cadena en base64 y lo muestro en la celda
        imagen.innerHTML = "<img width='150' height='150' src='" + reader.result + "' />";
    },
        false,
    );

    reader.readAsDataURL(datosImagen);
    /**fin base 64*/

    /** cuanto nuevamente las filas para iterar y sumar todos los montos */
    numFila = document.getElementById('tblProductos').getElementsByTagName('tr').length - 1;
    var sumaTotal = new Number(0);
    for (var i = 1; i < numFila; i++) {
        console.log(Tbl.rows[i].cells[4].childNodes[0]);
        console.log(Tbl.rows[i].cells[4].childNodes[0].data);
        var monto = new Number(Tbl.rows[i].cells[4].childNodes[0].data);
        sumaTotal = sumaTotal + monto;
    }

    document.getElementById("totalTbl").textContent = sumaTotal;

    /** limpio cuadros de texto */

    document.getElementById('precio').value = "";
    document.getElementById('cantidad').value = "";
    document.getElementById('nombres').value = "";
    document.getElementById("img").value = "";

}

function enviarPedido(form) {
    var numFila = document.getElementById('tblProductos').getElementsByTagName('tr').length - 1;
    console.log(numFila);
    if (numFila <= 1) {
        alert("No tiene pedidos para eviar");
        return false;
    }

    var statusConfirm = confirm("¿Desea Confirmar su Pedido?");
    if (statusConfirm == true) {
        return true;
    }
    return false;
} 