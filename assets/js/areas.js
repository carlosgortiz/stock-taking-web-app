var emptyRow = "<tr><td colspan='4'> Sin registros</td></tr>";
$(document).ready(function () {
  loadDataFromLocal();
  $('#tblData').on('click', '.btneditar', function () {

    var compnum = $(this).parent().parent().find(".compnum").html();
    var area = $(this).parent().parent().find(".area").html();
    var ubicacion = $(this).parent().parent().find(".ubicacion").html();
    var idA = $(this).parent().parent().find(".compnum").attr("data-id");
    $("#compnum").val(compnum);
    $("#area").val(area);
    $("#ubicacion").val(ubicacion);
    $("#IdA").val(idA);
    $("#btnguardar").text("Update");
  });

  $('#tblData').on('click', '.btnborrar', function () {
    var idA = $(this).parent().parent().find(".compnum").attr("data-id");
    deleteDataFromLocal(idA);
  });

  $("#btnguardar").click(function () {
    if ($("#IdA").val() == '') {
      addDataToLocal();
    } else {
      updateDataFromLocal();
    }
  });

  $("#btnlimpiar").click(function () {
    clearForm();
  });
});

function clearForm() {
  $("#compnum").val("");
  $("#area").val("");
  $("#ubicacion").val("");
  $("#btnguardar").text("Agregar");
  $("#IdA").val("");
}

function addEmptyRow() {
  if ($("#tblData tbody").children().children().length == 0) {
    $("#tblData tbody").append(emptyRow);
  }
}

function loadDataFromLocal() {
  let localData = localStorage.getItem('localDataAreas');
  if (localData) {
    $("#tblData tbody").html("");
    let localArray = JSON.parse(localData);
    let index = 1;
    localArray.forEach(element => {
      let dynamicTR = "<tr>";
      dynamicTR = dynamicTR + "<td class='compnum'  data-id=" + element.idA + ">" + element.compnum + "</td>";
      dynamicTR = dynamicTR + "<td class='area'>" + element.area + "</td>";
      dynamicTR = dynamicTR + "<td class='ubicacion'>" + element.ubicacion + "</td>";
      dynamicTR = dynamicTR + "    <td class='tdAction'>";
      dynamicTR = dynamicTR + "        <button class='btneditar'> Editar</button>";
      dynamicTR = dynamicTR + "        <button class='btnborrar'> Borrar</button>";
      dynamicTR = dynamicTR + "    </td>";
      dynamicTR = dynamicTR + " </tr>";
      $("#tblData tbody").append(dynamicTR);
      index++;
    });
  }
  addEmptyRow();
}

function addDataToLocal() {

  let localData = localStorage.getItem('localDataAreas');
  if (localData) {
    let localArray = JSON.parse(localData);
    var obj = {
      idA: localArray.length + 1,
      compnum: $("#compnum").val(),
      area: $("#area").val(),
      ubicacion: $("#ubicacion").val(),

    };
    localArray.push(obj);
    localStorage.setItem('localDataAreas', JSON.stringify(localArray));
    loadDataFromLocal();
  } else {
    var arryObj = [];
    var obj = {
      idA: 1,
      compnum: $("#compnum").val(),
      area: $("#area").val(),
      ubicacion: $("#ubicacion").val(),

    };
    arryObj.push(obj);
    localStorage.setItem('localDataAreas', JSON.stringify(arryObj));
    loadDataFromLocal();
  }
  clearForm();
}

function updateDataFromLocal() {
  let localData = localStorage.getItem('localDataAreas');
  let localArray = JSON.parse(localData);
  var oldRecord = localArray.find(m => m.idA == $("#IdA").val());
  oldRecord.compnum = $("#compnum").val();
  oldRecord.area = $("#area").val();
  oldRecord.ubicacion = $("#ubicacion").val();
  localStorage.setItem('localDataAreas', JSON.stringify(localArray));
  loadDataFromLocal();
  clearForm();
  
}

function deleteDataFromLocal(idA) {
  let localData = localStorage.getItem('localDataAreas');
  let localArray = JSON.parse(localData);
  let i = 0;
  while (i < localArray.length) {
    if (localArray[i].idA === Number(idA)) {
      localArray.splice(i, 1);
    } else {
      ++i;
    }
  }
  localStorage.setItem('localDataAreas', JSON.stringify(localArray));
  loadDataFromLocal();
}
let autocomplete;

function initAutocomplete(){
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('ubicacion'),
    {
      types: ['establishment'],
      componentRestrictions: {'country': ['MX']},
      fields: ['place_id', 'geometry', 'name']
    });
}