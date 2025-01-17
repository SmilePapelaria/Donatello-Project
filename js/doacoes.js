document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('donation-form');
    const successMessage = document.getElementById('success-message');
    const donationsList = document.getElementById('donations-list');

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
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerHTML = `
                <strong>${donation.name}</strong> (${donation.email}) - ${donation.amount}
                <button class="btn btn-warning btn-sm float-right ml-2" onclick="editDonation(${index})">Editar</button>
                <button class="btn btn-danger btn-sm float-right" onclick="deleteDonation(${index})">Excluir</button>
            `;
            donationsList.appendChild(li);
        });
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const donorName = document.getElementById('donor-name').value;
        const donorEmail = document.getElementById('donor-email').value;
        const donateAmount = document.getElementById('donate-amount').value;
        const selectedAmount = document.querySelector('input[name="radio-amount"]:checked').nextElementSibling.textContent.trim();

        const donationData = {
            name: donorName,
            email: donorEmail,
            amount: donateAmount,
            selectedAmount: selectedAmount
        };

        const donations = getDonations();
        donations.push(donationData);
        saveDonations(donations);

        successMessage.style.display = 'block';

        form.reset();

        displayDonations();

        setTimeout(() => successMessage.style.display = 'none', 5000);
    });

    window.editDonation = function(index) {
        const donations = getDonations();
        const donation = donations[index];

        document.getElementById('donor-name').value = donation.name;
        document.getElementById('donor-email').value = donation.email;
        document.getElementById('donate-amount').value = donation.amount;

        donations.splice(index, 1);
        saveDonations(donations);

        displayDonations();
    };

    window.deleteDonation = function(index) {
        const donations = getDonations();
        donations.splice(index, 1);
        saveDonations(donations);

        displayDonations();
    };

    displayDonations();
});
