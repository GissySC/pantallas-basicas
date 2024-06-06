const selectCountry = document.querySelector('#selectCountry');
const opcionesCountry = document.querySelector('#opcionesCountry');
const contenidoSelectCountry = document.querySelector('#selectCountry .contenido-select');
const hiddenInputCountry = document.querySelector('#inputCountry');

const selectCity = document.querySelector('#selectCity');
const opcionesCity = document.querySelector('#opcionesCity');
const contenidoSelectCity = document.querySelector('#selectCity .contenido-select');
const hiddenInputCity = document.querySelector('#inputCity');

const cities = {
    "España": ["Madrid", "Sevilla", "Barcelona", "Zaragoza"],
    "Alemania": ["Berlín", "Múnich", "Hamburgo", "Frankfurt"],
    "Francia": ["París", "Marsella", "Lyon", "Toulouse"],
    "Reino Unido": ["Londres", "Manchester", "Birmingham", "Liverpool"]
};

document.querySelectorAll('#opcionesCountry > .opcion').forEach((opcion) => {
    opcion.addEventListener('click', (e) => {
        e.preventDefault();
        const country = e.currentTarget.getAttribute('data-value');
        contenidoSelectCountry.innerHTML = e.currentTarget.innerHTML;
        selectCountry.classList.toggle('active');
        opcionesCountry.classList.toggle('active');
        hiddenInputCountry.value = country;

        // Update city options based on selected country
        updateCityOptions(country);
    });
});

selectCountry.addEventListener('click', () => {
    selectCountry.classList.toggle('active');
    opcionesCountry.classList.toggle('active');
});

selectCity.addEventListener('click', () => {
    selectCity.classList.toggle('active');
    opcionesCity.classList.toggle('active');
});

function updateCityOptions(country) {
    opcionesCity.innerHTML = ""; // Clear current city options
    const cityList = cities[country];
    cityList.forEach(city => {
        const cityOption = document.createElement('a');
        cityOption.href = "#";
        cityOption.classList.add('opcion');
        cityOption.innerHTML = `
            <div class="contenido-opcion">
                <h2 class="título">${city}</h2>
            </div>
        `;
        cityOption.addEventListener('click', (e) => {
            e.preventDefault();
            contenidoSelectCity.innerHTML = e.currentTarget.innerHTML;
            selectCity.classList.toggle('active');
            opcionesCity.classList.toggle('active');
            hiddenInputCity.value = city;
        });
        opcionesCity.appendChild(cityOption);
    });
}



