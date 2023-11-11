window.addEventListener('DOMContentLoaded', event => {
    const toastTriggers = document.querySelectorAll('.toastTrigger');

    toastTriggers.forEach(trigger => {
        trigger.addEventListener('click', event => {
            const toastId = trigger.getAttribute('data-toast-id');
            const toastEl = document.getElementById(toastId);
            const toast = new bootstrap.Toast(toastEl);
            toast.show();
        });
    });
});
