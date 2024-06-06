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

document.addEventListener("DOMContentLoaded", () => {
    const imageInput = document.getElementById("imageInput");
    const gallery = document.getElementById("gallery");
    const emptyGalleryString = document.getElementById("emptyGalleryString");

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    let listPeople = JSON.parse(localStorage.getItem('listPeople')) || [];
    let user = listPeople.find(user => user.id === userId);

    if (user && user.images && user.images.length > 0) {
        emptyGalleryString.style.display = "none";
        user.images.forEach(imageSrc => {
            const img = document.createElement("img");
            img.src = imageSrc;
            img.classList.add("col-3");
            gallery.appendChild(img);
        });
    }

    imageInput.addEventListener("change", () => {
        const files = imageInput.files;

        if (files.length > 0) {
            emptyGalleryString.style.display = "none";
        }

        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = document.createElement("img");
                img.src = event.target.result;
                img.classList.add("col-3");
                gallery.appendChild(img);

                user.images.push(event.target.result);
                localStorage.setItem('listPeople', JSON.stringify(listPeople));
            };
            reader.readAsDataURL(file);
        });
    });
});