var emptyRow = "<tr><td colspan='5'> Sin Registros</td></tr>";
$(document).ready(function () {
  loadDataFromLocal();
  $('#tblData').on('click', '.btneditar', function () {

    var nolic = $(this).parent().parent().find(".nolic").html();
    var pc = $(this).parent().parent().find(".pc").html();
    var vigencia = $(this).parent().parent().find(".vigencia").html();
    var desc = $(this).parent().parent().find(".desc").html();
    var idL = $(this).parent().parent().find(".nolic").attr("data-id");
    $("#nolic").val(nolic);
    $("#pc").val(pc);
    $("#vigencia").val(vigencia);
    $("#desc").val(desc);
    $("#IdL").val(idL);
    $("#btnguardar").text("Actualizar");
  });

  $('#tblData').on('click', '.btnborrar', function () {
    var idL = $(this).parent().parent().find(".nolic").attr("data-id");
    deleteDataFromLocal(idL);
  });

  $("#btnguardar").click(function () {
    if ($("#IdL").val() == '') {
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
  $("#nolic").val("");
  $("#pc").val("");
  $("#vigencia").val("");
  $("#desc").val("");
  $("#btnguardar").text("Agregar");
  $("#IdL").val("");
}

function addEmptyRow() {
  if ($("#tblData tbody").children().children().length == 0) {
    $("#tblData tbody").append(emptyRow);
  }
}

function loadDataFromLocal() {
  let localData = localStorage.getItem('localDataLicencias');
  if (localData) {
    $("#tblData tbody").html("");
    let localArray = JSON.parse(localData);
    let index = 1;
    localArray.forEach(element =>

       {
      let dynamicTR = "<tr>";
      dynamicTR = dynamicTR + "<td class='nolic'  data-id=" + element.idL + ">" + element.nolic + "</td>";
      dynamicTR = dynamicTR + "<td class='pc'>" + element.pc + "</td>";
      dynamicTR = dynamicTR + "<td class='vigencia'>" + element.vigencia + "</td>";
      dynamicTR = dynamicTR + "<td class='desc'>" + element.desc + "</td>";
      dynamicTR = dynamicTR + "<td class='tdAction'>" + "<button class='btneditar'>Editar</button>" + "<button class='btnborrar'>Borrar</button>" +  "</td>" ;
      dynamicTR = dynamicTR + " </tr>";
      $("#tblData tbody").append(dynamicTR);
      index++;
    });
  }
  addEmptyRow();
}

function addDataToLocal() {

  let localData = localStorage.getItem('localDataLicencias');
  if (localData) {
    let localArray = JSON.parse(localData);
    var obj = {
      idL: localArray.length + 1,
      nolic: $("#nolic").val(),
      pc: $("#pc").val(),
      vigencia: $("#vigencia").val(),
      desc: $("#desc").val(),

    };
    localArray.push(obj);
    localStorage.setItem('localDataLicencias', JSON.stringify(localArray));
    loadDataFromLocal();
  } else {
    var arryObj = [];
    var obj = {
      idL: 1,
      nolic: $("#nolic").val(),
      pc: $("#pc").val(),
      vigencia: $("#vigencia").val(),
      desc: $("#desc").val(),
      

    };
    arryObj.push(obj);
    localStorage.setItem('localDataLicencias', JSON.stringify(arryObj));
    loadDataFromLocal();
  }
  clearForm();
}

function updateDataFromLocal() {
  let localData = localStorage.getItem('localDataLicencias');
  let localArray = JSON.parse(localData);
  var oldRecord = localArray.find(m => m.idL == $("#IdL").val());
  oldRecord.nolic = $("#nolic").val();
  oldRecord.pc = $("#pc").val();
  oldRecord.vigencia = $("#vigencia").val();
  oldRecord.desc = $("#desc").val();
  localStorage.setItem('localDataLicencias', JSON.stringify(localArray));
  loadDataFromLocal();
  clearForm();
  
}

function deleteDataFromLocal(idL) {
  let localData = localStorage.getItem('localDataLicencias');
  let localArray = JSON.parse(localData);
  let i = 0;
  while (i < localArray.length) {
    if (localArray[i].idL === Number(idL)) {
      localArray.splice(i, 1);
    } else {
      ++i;
    }
  }
  localStorage.setItem('localDataLicencias', JSON.stringify(localArray));
  loadDataFromLocal();

}