async function updatePrefix() {
    const prefix = document.getElementById('prefix').value;
    if (!prefix) {
        alert('Please enter a prefix!');
        return;
    }
    alert('✅ Prefix updated to: ' + prefix);
}

async function updateMusicChannel() {
    const channel = document.getElementById('musicChannel').value;
    if (!channel) {
        alert('Please select a channel!');
        return;
    }
    alert('✅ Music channel updated!');
}

async function updateTicketCategory() {
    const category = document.getElementById('ticketCategory').value;
    if (!category) {
        alert('Please select a category!');
        return;
    }
    alert('✅ Ticket category updated!');
}

async function updateWelcomeChannel() {
    const channel = document.getElementById('welcomeChannel').value;
    if (!channel) {
        alert('Please select a channel!');
        return;
    }
    alert('✅ Welcome channel updated!');
}

async function upgradePremium(tier) {
    alert('🎉 Redirecting to premium upgrade page for ' + tier + ' plan...');
}

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/user');
        if (response.ok) {
            const user = await response.json();
            console.log('User loaded:', user);
        }
    } catch (error) {
        console.error('Error loading user:', error);
    }
});