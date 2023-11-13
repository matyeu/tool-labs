const produitNetflixId = document.querySelector("[name='Compte Netflix Premium']");

produitNetflixId.addEventListener('click', event => {
    event.preventDefault();

    fetch("https://cdn.discordapp.com/attachments/1171505930593116200/1173347494781005935/logo_yourhub.jpeg?ex=6563a002&is=65512b02&hm=dd49e8c89b7fbf1d8f666e1723fc0841002626953bd3627e0fd1941c165a8b6f&")
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const linkDownload = document.createElement("a");
            linkDownload.href = url;
            linkDownload.setAttribute("download", "profil.png");
            document.body.appendChild(linkDownload);
            linkDownload.click();
            linkDownload.remove();
        });

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
                        
                }).catch(error => {
                    console.error(error);
                });
        }).catch(error => {
            console.error(error);
        });

        setTimeout(() => {
        location.reload();
    }, 1000);

});

const produitDisneyId = document.querySelector("[name='Compte Disney Plus Premium']");

produitDisneyId.addEventListener('click', event => {
    event.preventDefault();

    fetch("https://cdn.discordapp.com/attachments/1171505930593116200/1173347494781005935/logo_yourhub.jpeg?ex=6563a002&is=65512b02&hm=dd49e8c89b7fbf1d8f666e1723fc0841002626953bd3627e0fd1941c165a8b6f&")
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const linkDownload = document.createElement("a");
            linkDownload.href = url;
            linkDownload.setAttribute("download", "profil.png");
            document.body.appendChild(linkDownload);
            linkDownload.click();
            linkDownload.remove();
        });

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
                        
                }).catch(error => {
                    console.error(error);
                });
        }).catch(error => {
            console.error(error);
        });

        setTimeout(() => {
        location.reload();
        }, 1000);

});

const produitFortniteId = document.querySelector("[name='Compte Fortnite']");

produitFortniteId.addEventListener('click', event => {
    event.preventDefault();

    fetch("https://cdn.discordapp.com/attachments/1171505930593116200/1173347494781005935/logo_yourhub.jpeg?ex=6563a002&is=65512b02&hm=dd49e8c89b7fbf1d8f666e1723fc0841002626953bd3627e0fd1941c165a8b6f&")
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const linkDownload = document.createElement("a");
            linkDownload.href = url;
            linkDownload.setAttribute("download", "profil.png");
            document.body.appendChild(linkDownload);
            linkDownload.click();
            linkDownload.remove();
        });

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
                        
                }).catch(error => {
                    console.error(error);
                });
        }).catch(error => {
            console.error(error);
        });
        setTimeout(() => {
        location.reload();
     }, 1000);


});

const produitSteamId = document.querySelector("[name='Compte Steam']");

produitSteamId.addEventListener('click', event => {
    event.preventDefault();

    fetch("https://cdn.discordapp.com/attachments/1171505930593116200/1173347494781005935/logo_yourhub.jpeg?ex=6563a002&is=65512b02&hm=dd49e8c89b7fbf1d8f666e1723fc0841002626953bd3627e0fd1941c165a8b6f&")
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const linkDownload = document.createElement("a");
            linkDownload.href = url;
            linkDownload.setAttribute("download", "profil.png");
            document.body.appendChild(linkDownload);
            linkDownload.click();
            linkDownload.remove();
        });

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
                        
                }).catch(error => {
                    console.error(error);
                });
        }).catch(error => {
            console.error(error);
        });

        setTimeout(() => {
        location.reload();
    }, 1000);
});

const produitSpotifyId = document.querySelector("[name='Compte Spotify Premium']");

produitSpotifyId.addEventListener('click', event => {
    event.preventDefault();

    fetch("https://cdn.discordapp.com/attachments/1171505930593116200/1173347494781005935/logo_yourhub.jpeg?ex=6563a002&is=65512b02&hm=dd49e8c89b7fbf1d8f666e1723fc0841002626953bd3627e0fd1941c165a8b6f&")
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const linkDownload = document.createElement("a");
            linkDownload.href = url;
            linkDownload.setAttribute("download", "profil.png");
            document.body.appendChild(linkDownload);
            linkDownload.click();
            linkDownload.remove();
        });

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
                        
                }).catch(error => {
                    console.error(error);
                });
        }).catch(error => {
            console.error(error);
        });

        setTimeout(() => {
        location.reload();
        }, 1000);

});

const produitEbooksId = document.querySelector("[name='Ebook Refund (FR & à jour)']");

produitEbooksId.addEventListener('click', event => {
    event.preventDefault();

    fetch("https://cdn.discordapp.com/attachments/1171505930593116200/1173347494781005935/logo_yourhub.jpeg?ex=6563a002&is=65512b02&hm=dd49e8c89b7fbf1d8f666e1723fc0841002626953bd3627e0fd1941c165a8b6f&")
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const linkDownload = document.createElement("a");
            linkDownload.href = url;
            linkDownload.setAttribute("download", "profil.png");
            document.body.appendChild(linkDownload);
            linkDownload.click();
            linkDownload.remove();
        });

    fetch('/api/get/server')
        .then(response => response.json())
        .then(dataServer => {
            fetch('/api/get/members')
                .then(response => response.json())
                .then(dataMember => { 
                    const arrayEbooks = dataServer.shop.ebooks.find((e) => e.name == "Ebook Refund (FR & à jour)");
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
                        
                }).catch(error => {
                    console.error(error);
                });
        }).catch(error => {
            console.error(error);
        });

        setTimeout(() => {
        location.reload();
        }, 1000);

});