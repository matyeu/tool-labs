const produitDiversId = document.querySelector("[name='ComboList Mail:Pass [10k] [Europe & à jour]'");

produitDiversId.addEventListener('click', event => {
    event.preventDefault();

    // Ouvre le lien dans un nouvel onglet
    window.open("https://tool-labs.com/divers1isddsreuujhsqevbkhjkc/index.php", '_blank'); // Remplacez l'URL par celle vers laquelle vous souhaitez rediriger

    fetch('/api/get/server')
        .then(response => response.json())
        .then(dataServer => {
            fetch('/api/get/members')
                .then(response => response.json())
                .then(dataMember => { 
                    const arrayAccounts = dataServer.shop.divers.find((e) => e.name == "ComboList Mail:Pass [10k] [Europe & à jour]");
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

const produitDivers1Id = document.querySelector("[name='Technique Refund McDonalds'");

produitDivers1Id.addEventListener('click', event => {
    event.preventDefault();

    // Ouvre le lien dans un nouvel onglet
    window.open("https://tool-labs.com/divers2isddsrpoijbgvtdjkc/index.php", '_blank'); // Remplacez l'URL par celle vers laquelle vous souhaitez rediriger

    fetch('/api/get/server')
        .then(response => response.json())
        .then(dataServer => {
            fetch('/api/get/members')
                .then(response => response.json())
                .then(dataMember => { 
                    const arrayAccounts = dataServer.shop.divers.find((e) => e.name == "Technique Refund McDonalds");
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

const produitDivers2Id = document.querySelector("[name='Technique Cashout McDonalds'");

produitDivers2Id.addEventListener('click', event => {
    event.preventDefault();

    // Ouvre le lien dans un nouvel onglet
    window.open("https://tool-labs.com/divers3isddsrpozvcghkkkdjkc/index.php", '_blank'); // Remplacez l'URL par celle vers laquelle vous souhaitez rediriger

    fetch('/api/get/server')
        .then(response => response.json())
        .then(dataServer => {
            fetch('/api/get/members')
                .then(response => response.json())
                .then(dataMember => { 
                    const arrayAccounts = dataServer.shop.divers.find((e) => e.name == "Technique Cashout McDonalds");
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


