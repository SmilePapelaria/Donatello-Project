document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('isAdminLogged')) {
        window.location.href = 'admin.html'; // Redireciona para o login se não estiver login
    }

    const donationsList = document.getElementById('donations-list');
    const logoutBtn = document.getElementById('logout-btn');

    function getDonations() {
        return JSON.parse(localStorage.getItem('donations')) || [];
    }

    function saveDonations(donations) {
        localStorage.setItem('donations', JSON.stringify(donations));
    }

    function displayDonations() {
        const donations = getDonations();
        donationsList.innerHTML = '';

        donations.forEach((donation, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${donation.name}</td>
                <td>${donation.email}</td>
                <td>${donation.amount} €</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editDonation(${index})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteDonation(${index})">
                        <i class="fas fa-trash-alt"></i> Remover
                    </button>
                </td>
            `;
            donationsList.appendChild(row);
        });
    }

    window.editDonation = function(index) {
        const donations = getDonations();
        const donation = donations[index];
    
        let newAmount = prompt(`Editar valor da doação de ${donation.name}`, donation.amount);
    
        while (newAmount !== null && isNaN(newAmount) || newAmount.trim() === '') {
            newAmount = prompt("Por favor, insira um valor numérico válido para a doação:", donation.amount);
        }
    
        if (newAmount !== null && newAmount.trim() !== '') {
            donation.amount = newAmount;
            saveDonations(donations);
            displayDonations();
        }
    };

    window.deleteDonation = function(index) {
        const donations = getDonations();
        donations.splice(index, 1);
        saveDonations(donations);
        displayDonations();
    };

    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isAdminLogged');
        window.location.href = 'admin.html';
    });

    displayDonations();
});
