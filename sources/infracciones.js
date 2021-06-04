
let infraccion_id = document.querySelector('#infraccion_id');
let infraccion_monto = document.querySelector('#monto');
let infraccion_direccion = document.querySelector('#direccion');
let infraccion_fecha_hora = document.querySelector('#fecha_y_hora');
let api = 'https://infraccionesweb.herokuapp.com/api/'


/*
    Devolver:
    direccionRegistrada
    fechaHoraActualizacion
    fechaHoraRegistro
    id
    montoAPagar
    tipoInfraccion

    existeAcarreo -> Nos va a servir para cuando el chabon pregunte por una infraccion con o sin acarreo y
    handlear los errores
*/

function consultarInfraciones(){
    let patente = document.getElementById('patente').value;
    let url = api + patente + '/infracciones';
    if(patente != ""){
        axios.get(url).then(
             function(response){
                let listaInfracciones = response.data.infracciones;
                if(listaInfracciones.length > 0){
                    for(let i = 0; i < listaInfracciones.length; i++){
                        let infraccion = listaInfracciones[i];
                        //dibujarDatos(infraccion);
                        alert(infraccion.existeAcarreo);
                    }                      
                }else{
                    alert("No hay infracciones asosiadas a esa patente");
                }
            }
        );
    }else{
        alert("Debe ingresar una patente");
        document.getElementById("patente").focus();
    }
}


function dibujarDatos(infraccion){
    infraccion_id.innerText += " " + infraccion.id + " | | "
    infraccion_monto.innerText += " " + infraccion.montoAPagar + " | | "
    infraccion_direccion.innerText += " " + infraccion.direccionRegistrada + " | | "
    infraccion_fecha_hora.innerText += " " + infraccion.fechaHoraRegistro + " | | "
}


/*
function funcion() {
    axios.get(url+patente+'/acarreos/42')
}
*/

