window.addEventListener('DOMContentLoaded', event => {

    const toastSuccessEl = document.getElementById('toastSuccess');
    const toastErrorEl = document.getElementById('toastError');

    const toastSuccess = new bootstrap.Toast(toastSuccessEl);
    const toastError = new bootstrap.Toast(toastErrorEl);

    const toastSuccessTrigger = document.getElementById('toastSuccessId');
    if (toastSuccessTrigger) {
        toastSuccessTrigger.addEventListener('click', event => {
            toastSuccess.show();
        });
    };

    const toastErrorTrigger = document.getElementById('toastErrorId');
    if (toastErrorTrigger) {
        toastErrorTrigger.addEventListener('click', event => {
            toastError.show();
        });
    };

})
