// Interfaces
interface User {
    id: number;
    nome: string;
    email: string;
    foto: string | null;
}

// State
let currentPage = 1;
const LIMIT = 10;

// DOM Elements
const loginContainer = document.getElementById('login-container')!;
const appContainer = document.getElementById('app-container')!;
const loginForm = document.getElementById('login-form') as HTMLFormElement;
const loginError = document.getElementById('login-error')!;
const logoutBtn = document.getElementById('logout-btn')!;
const userTableBody = document.querySelector('#user-table tbody')!;
const prevPageBtn = document.getElementById('prev-page')!;
const nextPageBtn = document.getElementById('next-page')!;
const pageInfo = document.getElementById('page-info')!;
const uploadContainer = document.getElementById('upload-container')!;
const uploadForm = document.getElementById('upload-form') as HTMLFormElement;
const uploadUserIdInput = document.getElementById('upload-user-id') as HTMLInputElement;
const uploadUserNameSpan = document.getElementById('upload-user-name')!;
const imageFileInput = document.getElementById('image-file') as HTMLInputElement;
const uploadMessage = document.getElementById('upload-message')!;

// Functions
const getToken = (): string | null => localStorage.getItem('jwt_token');

const showView = (view: 'login' | 'app') => {
    loginContainer.classList.toggle('hidden', view !== 'login');
    appContainer.classList.toggle('hidden', view !== 'app');
};

const fetchUsers = async (offset: number, limit: number) => {
    const token = getToken();
    if (!token) {
        checkAuth();
        return;
    }

    try {
        const response = await fetch(`/api/users?offset=${offset}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 401) { // Unauthorized
            localStorage.removeItem('jwt_token');
            checkAuth();
            return;
        }

        if (!response.ok) {
            throw new Error('Falha ao buscar usuários.');
        }

        const users: User[] = await response.json();
        renderUsers(users);
        updatePagination(users.length);

    } catch (error) {
        console.error(error);
        userTableBody.innerHTML = `<tr><td colspan="5">Erro ao carregar usuários.</td></tr>`;
    }
};

const renderUsers = (users: User[]) => {
    userTableBody.innerHTML = '';
    if (users.length === 0) {
        userTableBody.innerHTML = `<tr><td colspan="5">Nenhum usuário encontrado.</td></tr>`;
        return;
    }

    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.nome}</td>
            <td>${user.email}</td>
            <td>${user.foto ? `<img src="/storage/images/${user.foto}" alt="Foto de ${user.nome}" width="50">` : 'N/A'}</td>
            <td><button class="upload-btn" data-id="${user.id}" data-name="${user.nome}">Upload Foto</button></td>
        `;
        userTableBody.appendChild(tr);
    });

    document.querySelectorAll('.upload-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const target = e.target as HTMLButtonElement;
            const userId = target.dataset.id!;
            const userName = target.dataset.name!;
            
            uploadUserIdInput.value = userId;
            uploadUserNameSpan.textContent = userName;
            uploadContainer.classList.remove('hidden');
            uploadMessage.textContent = '';
            uploadMessage.style.color = 'green';
        });
    });
};

const updatePagination = (userCount: number) => {
    pageInfo.textContent = `Página ${currentPage}`;
    (prevPageBtn as HTMLButtonElement).disabled = currentPage === 1;
    (nextPageBtn as HTMLButtonElement).disabled = userCount < LIMIT;
};

const checkAuth = () => {
    const token = getToken();
    if (token) {
        showView('app');
        currentPage = 1;
        fetchUsers(0, LIMIT);
    } else {
        showView('login');
        uploadContainer.classList.add('hidden');
    }
};

// Event Listeners
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.textContent = '';

    const email = (document.getElementById('email') as HTMLInputElement).value;
    const senha = (document.getElementById('senha') as HTMLInputElement).value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ email, senha })
        });

        if (!response.ok) {
            throw new Error('Email ou senha inválidos.');
        }

        const data = await response.json();
        localStorage.setItem('jwt_token', data.token);
        checkAuth();

    } catch (error: any) {
        loginError.textContent = error.message;
    }
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('jwt_token');
    checkAuth();
});

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        const offset = (currentPage - 1) * LIMIT;
        fetchUsers(offset, LIMIT);
    }
});

nextPageBtn.addEventListener('click', () => {
    currentPage++;
    const offset = (currentPage - 1) * LIMIT;
    fetchUsers(offset, LIMIT);
});

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    uploadMessage.textContent = '';
    const token = getToken();
    const userId = uploadUserIdInput.value;
    const file = imageFileInput.files?.[0];

    if (!token || !userId || !file) {
        uploadMessage.textContent = 'Erro: Informações faltando.';
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch(`/api/users/${userId}/photo`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Falha no upload da imagem.');
        }

        uploadMessage.textContent = 'Upload realizado com sucesso!';
        uploadForm.reset();
        
        // Refresh user list to show new photo
        const offset = (currentPage - 1) * LIMIT;
        fetchUsers(offset, LIMIT);

    } catch (error: any) {
        uploadMessage.style.color = 'red';
        uploadMessage.textContent = `Erro: ${error.message}`;
    }
});


// Initial Load
document.addEventListener('DOMContentLoaded', checkAuth);