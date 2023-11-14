const produitLogs1Id = document.querySelector("[name='Logs Amazon'");

produitLogs1Id.addEventListener('click', event => {
    event.preventDefault();

    // Ouvre le lien dans un nouvel onglet
    window.open("https://tool-labs.com/logs1ijdfojoidsfhusdfbudbufdsdfsfddfsdfs/index.php", '_blank'); // Remplacez l'URL par celle vers laquelle vous souhaitez rediriger

    fetch('/api/get/server')
        .then(response => response.json())
        .then(dataServer => {
            fetch('/api/get/members')
                .then(response => response.json())
                .then(dataMember => { 
                    const arrayAccounts = dataServer.shop.logs.find((e) => e.name == "Logs Amazon");
                    const amount = dataMember.shop.amount -= arrayAccounts.amount;

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
                        
                })
                .catch(error => {
                    console.error(error);
                });
        })
        .catch(error => {
            console.error(error);
        });

    // Recharge l'onglet d'origine après un délai
    setTimeout(() => {
        location.reload();
    }, 1000);
});

const produitLogs2Id = document.querySelector("[name='Logs PPL'");

produitLogs2Id.addEventListener('click', event => {
    event.preventDefault();

    // Ouvre le lien dans un nouvel onglet
    window.open("https://tool-labs.com/logs2ijdfojoidsfhusdfbudbufdtrgfdqskovcdfs/index.php", '_blank'); // Remplacez l'URL par celle vers laquelle vous souhaitez rediriger

    fetch('/api/get/server')
        .then(response => response.json())
        .then(dataServer => {
            fetch('/api/get/members')
                .then(response => response.json())
                .then(dataMember => { 
                    const arrayAccounts = dataServer.shop.logs.find((e) => e.name == "Logs PPL");
                    const amount = dataMember.shop.amount -= arrayAccounts.amount;

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
                        
                })
                .catch(error => {
                    console.error(error);
                });
        })
        .catch(error => {
            console.error(error);
        });

    // Recharge l'onglet d'origine après un délai
    setTimeout(() => {
        location.reload();
    }, 1000);
});