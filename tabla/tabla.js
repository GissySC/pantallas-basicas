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

    if (phone == "") {
        alert('Campo obligatorio!');
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

function ReadData() {
    let listPeople;

    if(localStorage.getItem('listPeople') == null) {
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
        html += '<td><button onclick="deleteData('+ index +') class="btn btn-danger">Eliminar</button></td>';
        html += '<td><button onclick="editData('+ index +') class="btn btn-warning">Editar</button></td>';
        html += "</tr>";
    });

    document.querySelector('#tableData tbody').innerHTML = html;
}

window.onload = ReadData;

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

        window.location.href = "./tabla.html";
    }
}