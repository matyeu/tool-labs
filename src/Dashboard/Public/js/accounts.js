const produitNetflixId = document.querySelector("[name='Compte Netflix Premium'");

produitNetflixId.addEventListener('click', event => {
    event.preventDefault();

    // Ouvre le lien dans un nouvel onglet
    window.open("https://tool-labs.com/accountnetflixiiueucsgyqcindfqsc/index.php", '_blank'); // Remplacez l'URL par celle vers laquelle vous souhaitez rediriger

    fetch('/api/get/server')
        .then(response => response.json())
        .then(dataServer => {
            fetch('/api/get/members')
                .then(response => response.json())
                .then(dataMember => { 
                    const arrayAccounts = dataServer.shop.accounts.find((e) => e.name == "Compte Netflix Premium");
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

const produitDisneyId = document.querySelector("[name='Compte Disney Plus Premium'");

produitDisneyId.addEventListener('click', event => {
    event.preventDefault();

    // Ouvre le lien dans un nouvel onglet
    window.open("https://tool-labs.com/accountdisneyisddsqdcsgyqcindfqsc/index.php", '_blank'); // Remplacez l'URL par celle vers laquelle vous souhaitez rediriger

    fetch('/api/get/server')
        .then(response => response.json())
        .then(dataServer => {
            fetch('/api/get/members')
                .then(response => response.json())
                .then(dataMember => { 
                    const arrayAccounts = dataServer.shop.accounts.find((e) => e.name == "Compte Disney Plus Premium");
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

const produitSpotifyId = document.querySelector("[name='Compte Spotify Premium'");

produitSpotifyId.addEventListener('click', event => {
    event.preventDefault();

    // Ouvre le lien dans un nouvel onglet
    window.open("https://tool-labs.com/accountspotifyisddsqdcsgysqdqdqsc/index.php", '_blank'); // Remplacez l'URL par celle vers laquelle vous souhaitez rediriger

    fetch('/api/get/server')
        .then(response => response.json())
        .then(dataServer => {
            fetch('/api/get/members')
                .then(response => response.json())
                .then(dataMember => { 
                    const arrayAccounts = dataServer.shop.accounts.find((e) => e.name == "Compte Spotify Premium");
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

const produitSteamId = document.querySelector("[name='Compte Steam'");

produitSteamId.addEventListener('click', event => {
    event.preventDefault();

    // Ouvre le lien dans un nouvel onglet
    window.open("https://tool-labs.com/accountsteamisddsreuujhsqdqdqsc/index.php", '_blank'); // Remplacez l'URL par celle vers laquelle vous souhaitez rediriger

    fetch('/api/get/server')
        .then(response => response.json())
        .then(dataServer => {
            fetch('/api/get/members')
                .then(response => response.json())
                .then(dataMember => { 
                    const arrayAccounts = dataServer.shop.accounts.find((e) => e.name == "Compte Steam");
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

const produitFortniteId = document.querySelector("[name='Compte Fortnite'");

produitFortniteId.addEventListener('click', event => {
    event.preventDefault();

    // Ouvre le lien dans un nouvel onglet
    window.open("https://tool-labs.com/accountfortniteisddsreuujhsqmlqsfbqsc/index.php", '_blank'); // Remplacez l'URL par celle vers laquelle vous souhaitez rediriger

    fetch('/api/get/server')
        .then(response => response.json())
        .then(dataServer => {
            fetch('/api/get/members')
                .then(response => response.json())
                .then(dataMember => { 
                    const arrayAccounts = dataServer.shop.accounts.find((e) => e.name == "Compte Fortnite");
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