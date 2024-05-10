function loadUserDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const lastName = urlParams.get('lastName');
    const email = urlParams.get('email');
    const phone = urlParams.get('phone');
    const country = urlParams.get('country');
    const city = urlParams.get('city');

    let userDetailsHtml = `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Apellidos:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>País:</strong> ${country}</p>
        <p><strong>Ciudad:</strong> ${city}</p>
    `;

    document.getElementById('userDetails').innerHTML = userDetailsHtml;
}

loadUserDetails();