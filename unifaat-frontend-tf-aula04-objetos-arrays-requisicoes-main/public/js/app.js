
document.addEventListener("DOMContentLoaded", async (event) => {
    const USERS_CONTAINER = document.getElementById('users');
    const PAGINATION_CONTAINER = document.getElementById('pagination');
    const PAGE_SIZE = 10;
    let currentPage = 1;
    let totalPages = 1;

    async function fetchUsers(page = 1) {
        const offset = (page - 1) * PAGE_SIZE;
        const response = await fetch(`/api/users?offset=${offset}&limit=${PAGE_SIZE}`);
        if (!response.ok) {
            return { users: [], total: 0 };
        }
        const data = await response.json();
        // Supondo que a resposta tenha { users: [...], total: 100 }
        return {
            users: data.users,
            total: data.total
        };
    }

    function renderUsers(users) {
        USERS_CONTAINER.innerHTML = '';
        if (!users.length) {
            USERS_CONTAINER.innerHTML = '<li>Nenhum usuário encontrado.</li>';
            return;
        }
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.name; // Ajuste conforme o campo do usuário
            USERS_CONTAINER.appendChild(li);
        });
    }

    function renderPagination(current, total) {
        PAGINATION_CONTAINER.innerHTML = '';
        for (let i = 1; i <= total; i++) {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = i;
            link.className = (i === current) ? 'active' : '';
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if (currentPage !== i) {
                    currentPage = i;
                    update();
                }
            });
            PAGINATION_CONTAINER.appendChild(link);
        }
    }

    async function update() {
        const { users, total } = await fetchUsers(currentPage);
        totalPages = Math.ceil(total / PAGE_SIZE);
        renderUsers(users);
        renderPagination(currentPage, totalPages);
    }

    update();
});
