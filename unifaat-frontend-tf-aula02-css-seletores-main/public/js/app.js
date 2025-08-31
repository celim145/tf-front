const ulElement = document.querySelector(".content ul.demo");
const liElementCollection = ulElement.querySelectorAll("li");

liElementCollection.forEach((liElement) => {
    liElement.addEventListener("click", (event) => {
        const liElement = event.currentTarget;


        /** CODAR AQUI */
    });
});

document.querySelectorAll('section.content ul li').forEach(function(item) {
  item.addEventListener('click', function(e) {
    document.querySelectorAll('section.content ul li').forEach(function(li) {
      li.classList.remove('selected');
    });
    // Garante que sempre pega o <li>, mesmo se clicar em filho
    const li = e.target.closest('li');
    if (li) li.classList.add('selected');
  });
});