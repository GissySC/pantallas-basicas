function ValidateForm() {
    let name = document.getElementById('inputName').value;
    let lastName = document.getElementById('inputLastName').value;
    let email = document.getElementById('inputEmail').value;
    let phone = document.getElementById('inputPhone').value;
    let country = document.getElementById('inputCountry').value;
    let city = document.getElementById('inputCity').value;

    // Validación de campos obligatorios
    if (name == "" || lastName == "" || email == "" || phone == "" || country == "" || city == "") {
        alert('Todos los campos son obligatorios');
        return false;
    }

    // Validación de correo electrónico
    if (!email.includes('@')) {
        alert('El correo no es válido.');
        return false;
    }

    // Validación de número de teléfono
    if (!/^\d+$/.test(phone)) {
        alert('El número de teléfono no es válido.');
        return false;
    }

    return true;
}

function ReadData() {
    let listPeople;

    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    let html = "";

    listPeople.forEach(function(element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.lastName + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.phone + "</td>";
        html += "<td>" + element.country + "</td>";
        html += "<td>" + element.city + "</td>";
        html += '<td><button onclick="editData('+ index +')" class="btn btn-warning">Editar</button></td>';
        html += '<td><button onclick="deleteData('+ index +')" class="btn btn-danger">Eliminar</button></td>';
        html += "</tr>";
    });

    document.querySelector('#tableData tbody').innerHTML = html;
}

window.onload = ReadData;

function editData(index) {
    let row = document.getElementById('row_'+index);
    let inputs = row.querySelectorAll('td:not(:last-child)');

    inputs.forEach(td => {
        let value = td.textContent.trim();
        td.innerHTML = '<input type="text" class="form-control" value="' + value + '">';
    });

    let editButton = row.querySelector('.btn-warning');
    editButton.textContent = 'Guardar';
    editButton.classList.remove('btn-warning');
    editButton.classList.add('btn-success');
    editButton.setAttribute('onclick', 'updateData('+index+')');
}

function updateData(index) {
    let listPeople = JSON.parse(localStorage.getItem('listPeople'));

    let row = document.getElementById('row_'+index);
    let inputs = row.querySelectorAll('input');

    listPeople[index].name = inputs[0].value;
    listPeople[index].lastName = inputs[1].value;
    listPeople[index].email = inputs[2].value;
    listPeople[index].phone = inputs[3].value;
    listPeople[index].country = inputs[4].value;
    listPeople[index].city = inputs[5].value;

    localStorage.setItem('listPeople', JSON.stringify(listPeople));

    ReadData();
}

function AddData(){
    if(ValidateForm() == true) {
        let name = document.getElementById('inputName').value;
        let lastName = document.getElementById('inputLastName').value;
        let email = document.getElementById('inputEmail').value;
        let phone = document.getElementById('inputPhone').value;
        let country = document.getElementById('inputCountry').value;
        let city = document.getElementById('inputCity').value;

        let listPeople;

        if (localStorage.getItem('listPeople') == null) {
            listPeople = [];
        } else {
            listPeople = JSON.parse(localStorage.getItem('listPeople'));
        }

        listPeople.push({
            name: name,
            lastName: lastName,
            email: email,
            phone: phone,
            country: country,
            city: city
        });

        localStorage.setItem('listPeople', JSON.stringify(listPeople));

        ReadData();

        document.getElementById('inputName').value = "";
        document.getElementById('inputLastName').value = "";
        document.getElementById('inputEmail').value = "";
        document.getElementById('inputPhone').value = "";
        document.getElementById('inputCountry').value = "";
        document.getElementById('inputCity').value = "";
    }
}

