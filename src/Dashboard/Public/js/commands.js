const produitTestId = document.querySelector("[name='botRaid']");

produitTestId.addEventListener('click', event => {
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

                    const arrayEbooks = dataServer.shop.ebooks.find((e) => e.name == "botRaid");
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