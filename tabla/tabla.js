function ValidateForm() {
    let name = document.getElementById('inputName').value;
    let lastName = document.getElementById('inputLastName').value;
    let email = document.getElementById('inputEmail').value;
    let phone = document.getElementById('inputPhone').value;
    let country = document.getElementById('inputCountry').value;
    let city = document.getElementById('inputCity').value;

    if (name == "") {
        alert('Campo obligatorio!');
        return false;
    }

    if (lastName == "") {
        alert('Campo obligatorio!');
        return false;
    }

    if (email == "") {
        alert('Campo obligatorio!');
        return false;
    } else if (!email.includes('@')) {
        alert('El correo no es válido.')
        return false;
    }

    if (phone === "") {
        alert('Campo obligatorio: Teléfono');
        return false;
    } else if (!/^\d+$/.test(phone)) {
        alert('El número de teléfono no es válido.');
        return false;
    }

    if (country == "") {
        alert('Campo obligatorio!');
        return false;
    }

    if (city == "") {
        alert('Campo obligatorio!');
        return false;
    } 

    return true;
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

function ReadData() {
    let listPeople;

    if(localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    let html = "";

    listPeople.forEach(function(element, index) {
        html += "<tr id='row_"+index+"'>";
        html += "<td><input type='text' class='form-control' value='" + element.name + "' id='editName_"+index+"' disabled></td>";
        html += "<td><input type='text' class='form-control' value='" + element.lastName + "' id='editLastName_"+index+"' disabled></td>";
        html += "<td><input type='email' class='form-control' value='" + element.email + "' id='editEmail_"+index+"' disabled></td>";
        html += "<td><input type='tel' class='form-control' value='" + element.phone + "' id='editPhone_"+index+"' disabled></td>";
        html += "<td><input type='text' class='form-control' value='" + element.country + "' id='editCountry_"+index+"' disabled></td>";
        html += "<td><input type='text' class='form-control' value='" + element.city + "' id='editCity_"+index+"' disabled></td>";
        html += "<td><button onclick='editData("+ index +")' class='btn btn-warning'>Editar</button></td>";
        html += "<td><button onclick='deleteData("+ index +")' class='btn btn-danger'>Eliminar</button></td>";
        html += "<td><button onclick='viewUser("+ index +")' class='btn btn-primary'>Ver</button></td>";
        html += "</tr>";
    });

    document.querySelector('#tableData tbody').innerHTML = html;
}

window.onload = ReadData;

function editData(index) {
    let row = document.getElementById('row_'+index);
    let inputs = row.querySelectorAll('input');

    inputs.forEach(input => {
        input.disabled = false;
    });

    let editButton = row.querySelector('button');
    editButton.textContent = 'Guardar';
    editButton.classList.remove('btn-warning');
    editButton.classList.add('btn-success');
    editButton.setAttribute('onclick', 'updateData('+index+')');
}

function updateData(index) {
    let listPeople;

    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    let row = document.getElementById('row_'+index);
    let inputs = row.querySelectorAll('input');

    listPeople[index].name = inputs[0].value;
    listPeople[index].lastName = inputs[1].value;
    listPeople[index].email = inputs[2].value;
    listPeople[index].phone = inputs[3].value;
    listPeople[index].country = inputs[4].value;
    listPeople[index].city = inputs[5].value;

    localStorage.setItem('listPeople', JSON.stringify(listPeople));

    inputs.forEach(input => {
        input.disabled = true;
    });

    let editButton = row.querySelector('button');
    editButton.textContent = 'Editar';
    editButton.classList.remove('btn-success');
    editButton.classList.add('btn-warning');
    editButton.setAttribute('onclick', 'editData('+index+')');
}

function deleteData(index) {
    let listPeople;

    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    listPeople.splice(index, 1);
    localStorage.setItem('listPeople', JSON.stringify(listPeople));

    ReadData();
}

function viewUser(index) {
    let listPeople = JSON.parse(localStorage.getItem('listPeople'));
    let selectedUser = listPeople[index];

    let queryString = "?";
    for (let key in selectedUser) {
        queryString += key + "=" + encodeURIComponent(selectedUser[key]) + "&";
    }
    queryString = queryString.slice(0, -1); 

    window.location.href = "detalles-usuario.html" + queryString;
}
