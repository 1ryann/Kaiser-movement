document.addEventListener('DOMContentLoaded', function() {
    const whatsappNumber = '556993489767'; // SEU NÚMERO AQUI
    const modal = document.getElementById('paymentModal');
    const formStep = document.getElementById('formStep');
    const paymentStep = document.getElementById('paymentStep');
    const paymentForm = document.getElementById('paymentForm');
    const whatsappRedirectBtn = document.getElementById('whatsappRedirectBtn');
    let currentPlanName = '';

    window.openModal = function(planName, planValue, qrCodeSrc, pixKey) {
        currentPlanName = planName;
        document.getElementById('modalPlanTitle').innerText = planName;
        document.getElementById('paymentPlanTitle').innerText = `Pagar ${planName} - R$ ${planValue}`;
        document.getElementById('formSubject').value = `Novo Pedido: ${planName}`;
        paymentForm.dataset.qrCodeSrc = qrCodeSrc;
        paymentForm.dataset.pixKey = pixKey;
        formStep.style.display = 'block';
        paymentStep.style.display = 'none';
        modal.style.display = 'flex';
    }

    window.closeModal = function() {
        modal.style.display = 'none';
    }

    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const qrCodeSrc = paymentForm.dataset.qrCodeSrc;
        const pixKey = paymentForm.dataset.pixKey;
        document.getElementById('pixQrCode').src = qrCodeSrc;
        document.getElementById('pixCopyPaste').value = pixKey;
        formStep.style.display = 'none';
        paymentStep.style.display = 'block';
        const formData = new FormData(paymentForm);
        fetch(paymentForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });
    });

    whatsappRedirectBtn.addEventListener('click', function() {
        const message = `Olá! Acabei de realizar o pagamento para o plano "${currentPlanName}". Segue o comprovante.`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    });

    window.copyPixKey = function() {
        const pixKeyTextarea = document.getElementById('pixCopyPaste');
        pixKeyTextarea.select();
        document.execCommand('copy');
        alert('Chave Pix copiada!');
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }
});