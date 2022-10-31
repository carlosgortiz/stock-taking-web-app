var tablaEl = document.querySelector('#tabla');
var localArray = [
    registro = {
        id: 0,
        pcTitle: "",
        pcBrand: "",
        fechaCompra: Date,
        plazo: 0,
        vencimiento: Date,
    }
];
var hoy = moment().format("YYYYMMDD");
console.log("HOY======>", hoy);

var generarNum = function (a, b) {
    return Math.floor(Math.random()*(b - a +1)) + a;
}

var registroNuevo = function () {
    fetch('https://dummyjson.com/products/category/laptops')
        .then(res => res.json())
        .then(function (data) {
            console.log(data);
            // Limpiamos elemento Tabla para iniciar a llenar con datos
            tablaEl.innerHTML = "";
            //Creamos cuerpo,encabezado y sus elementos en la tabla para luego llenar los encabezados
             var body = document.createElement('tbody');
             var encabezados = document.createElement('thead');
             var tr = document.createElement('tr');
             var th1 = document.createElement('td');
             var th2 = document.createElement('td');
             var th3 = document.createElement('td');
             var th4 = document.createElement('td');
             var th5 = document.createElement('td');
             var th6 = document.createElement('td');
             th1.textContent="ID";
             th2.textContent="PC";
             th3.textContent="Marca";
             th4.textContent="fechaCompra";
             th5.textContent="Plazo garantia(meses)";
             th6.textContent = "Vencimiento";
             tr.setAttribute('id', 'encabezado');
             tr.append(th1, th2, th3, th4, th5, th6);
             encabezados.append(tr);
             /* Recorremos el arreglo lleno de información extraido de la API DummyJSON para desplegarlo en la tabla
               junto a la información generada sobre las fechas de garantias, la cual por el momento la generamos de 
               manera aleatoria*/
            for (var i = 0; i < data.products.length; i++) {
                var mesesPlazo = generarNum(1, 24);
                var dia = generarNum(1, 31);
                var mes = generarNum(1, 9);
                var year = generarNum(2015,2022 );
                var compra = year + '-' + mes + '-' + dia;
                mes = mes + mesesPlazo;
                if (mes > 12) {
                    year = year + (Math.trunc(mes / 12));
                    mes = mes % 12;
                    if (mes === 0) {
                        mes = 1;
                    }
                } 
                console.log("año ====>", year, "mes ====>", mes);
                var venceRender= year + '-' + mes  + '-' + dia;
                var vence = year + mes + dia;
                console.log(compra);
                var tr = document.createElement('tr');
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');
                var td3 = document.createElement('td');
                var td4 = document.createElement('td');
                var td5 = document.createElement('td');
                var td6 = document.createElement('td');
                td1.textContent = data.products[i].id;
                td2.textContent = data.products[i].title;
                td3.textContent = data.products[i].brand;
                td4.textContent = compra;
                td5.textContent = mesesPlazo;
                td6.textContent = venceRender;
                tr.append(td1, td2, td3, td4, td5, td6);
                encabezados.appendChild(tr);
                body.append(encabezados);
                console.log("VENCE========>", venceRender);
                if (venceRender < hoy) {
                    console.log("CAMBIAR ===> VENCIDA");
                   // td6.addClass('vencido');
                    td6.style.backgroundColor = "#d83939";
                }
            } 
            tablaEl.append(body)
        })
}
registroNuevo();

       