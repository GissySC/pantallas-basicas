// Agregamos una función para cargar los detalles del usuario
function loadUserDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const lastName = urlParams.get('lastName');
    const email = urlParams.get('email');
    const phone = urlParams.get('phone');
    const country = urlParams.get('country');
    const city = urlParams.get('city');

    // Rellenamos los campos con los datos del usuario
    document.getElementById('inputName').value = name;
    document.getElementById('inputLastName').value = lastName;
    document.getElementById('inputEmail').value = email;
    document.getElementById('inputPhone').value = phone;
    document.getElementById('inputCountry').value = country;
    document.getElementById('inputCity').value = city;
}

// Llamamos a la función para cargar los detalles del usuario al cargar la página
loadUserDetails();