const produitTestId = document.querySelector("[name='produit test']");

produitTestId.addEventListener('click', event => {
    const linkDownload = document.createElement("a");
    linkDownload.href = "../assets/shop/nom_dossier";
    linkDownload.setAttribute("download", "nom_dossier.pdf");
    linkDownload.click();

    fetch('/api/get/server')
        .then(response => response.json())
        .then(dataServer => {
            fetch('/api/get/members')
                .then(response => response.json())
                .then(dataMember => {

                    const amount = dataServer.shop.amount -= dataMember.shop.amount;

                    fetch('/api/update/members/amount', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            amount
                        }),
                    })
                        .then(response => response.json())
                        .then(updatedData => {
                            console.log('Données mises à jour :', updatedData);
                        })
                        .catch(error => {
                            console.error('Erreur lors de la mise à jour :', error);
                        });

                }).catch(error => {
                    console.error(error);
                });

        })
        .catch(error => {
            console.error(error);
        });

});