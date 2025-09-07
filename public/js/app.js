document.addEventListener("DOMContentLoaded", (event) => {
    const form = document.querySelector('form');
    const previewBox = document.querySelector('#preview');

    function updatePreview() {

        const nome = form.elements['nome']?.value || '';
        const email = form.elements['email']?.value || '';
        const idade = form.elements['idade']?.value || '';


        previewBox.innerHTML = `
        <strong>Prévia:</strong><br>
        Nome: ${nome}<br>
        Email: ${email}<br>
        Idade: ${idade}
      `;
    }


    ['nome', 'email', 'idade'].forEach((field) => {
        const input = form.elements[field];
        if (input) {
            input.addEventListener('input', updatePreview);
            input.addEventListener('change', updatePreview);
            input.addEventListener('keydown', updatePreview);
        }
    });


    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        // Mostra os pares chave/valor do FormData
        console.log('FormData entries:');
        for (const [key, value] of Object.entries(Object.fromEntries(formData))) {
            console.log(`${key}: ${value}`);
        }
    });
});