const produitNetflixId = document.querySelector("[name='Compte Netflix Premium']");

produitNetflixId.addEventListener('click', event => {
    const linkDownload = document.createElement("a");
    linkDownload.href = "http://discord.tool-labs.com:3030/Public/assets/images/tool-labs/profil.png";
    linkDownload.setAttribute("download", "profil.png");

    document.body.appendChild(linkDownload);
    linkDownload.click();
    linkDownload.remove();

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
                         const buyer = arrayAccounts.buyer++

                    fetch('/api/update/accounts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            buyer
                        }),
                    })
                        .then(response => response.json())
                        .then(updatedData => {
                            console.log('Données mises à jour :', updatedData);
                        })
                        .catch(error => {
                            console.error('Erreur lors de la mise à jour :', error);
                        
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

const produitDisneyId = document.querySelector("[name='Compte Disney Plus Premium']");

produitDisneyId.addEventListener('click', event => {
    const linkDownload = document.createElement("a");
    linkDownload.href = "http://discord.tool-labs.com:3030/Public/assets/images/tool-labs/profil.png";
    linkDownload.setAttribute("download", "profil.png");

    document.body.appendChild(linkDownload);
    linkDownload.click();
    linkDownload.remove();

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
                         const buyer = arrayAccounts.buyer++

                    fetch('/api/update/accounts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            buyer
                        }),
                    })
                        .then(response => response.json())
                        .then(updatedData => {
                            console.log('Données mises à jour :', updatedData);
                        })
                        .catch(error => {
                            console.error('Erreur lors de la mise à jour :', error);
                        
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

const produitEbookId = document.querySelector("[name='Ebook Refund [FR & à jour]]");

produitEbookId.addEventListener('click', event => {
    const linkDownload = document.createElement("a");
    linkDownload.href = "http://discord.tool-labs.com:3030/Public/assets/images/tool-labs/profil.png";
    linkDownload.setAttribute("download", "profil.png");

    document.body.appendChild(linkDownload);
    linkDownload.click();
    linkDownload.remove();

    fetch('/api/get/server')
        .then(response => response.json())
        .then(dataServer => {
            fetch('/api/get/members')
                .then(response => response.json())
                .then(dataMember => {

                    const arrayEbooks = dataServer.shop.ebooks.find((e) => e.name == "Ebook Refund [FR & à jour]]");
                    const amount = dataMember.shop.amount -= arrayEbooks.amount;

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
                         const buyer = arrayEbooks.buyer++

                    fetch('/api/update/ebooks', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            buyer
                        }),
                    })
                        .then(response => response.json())
                        .then(updatedData => {
                            console.log('Données mises à jour :', updatedData);
                        })
                        .catch(error => {
                            console.error('Erreur lors de la mise à jour :', error);
                        
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