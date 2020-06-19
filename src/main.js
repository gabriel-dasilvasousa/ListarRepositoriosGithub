import api from './api';

class App{
    constructor() {
        this.repositories = [];

        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]');
        this.listEl = document.getElementById('repo-list');

        this.registerHandlers();
    }

    registerHandlers() {
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true) {
        if(loading === true) {
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando'));
            loadingEl.setAttribute('id', 'loading');

            this.formEl.appendChild(loadingEl);
        }
        else {
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event){
        event.preventDefault();

        const repoInput = this.inputEl.value;

        if(repoInput.length === 0){
            return;
        }

        this.setLoading();

        try{
            const response = await api.get(`/users/${repoInput}`);

            const { name, bio, html_url, avatar_url } = response.data;

            this.repositories.push({
                name,
                bio,
                avatar_url,
                html_url,
            });

            this.render();
        }
        catch(err) {
            alert("O repositório não existe");
        }
        finally{
            this.setLoading(false);
        }
    }

    render() {
        this.listEl.innerHTML = "";

        this.repositories.forEach(repository => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repository.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repository.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repository.bio));

            let linkEl = document.createElement('a')
            linkEl.setAttribute('target', 'blank');
            linkEl.setAttribute('href', repository.html_url);
            linkEl.appendChild(document.createTextNode("Acessar"));

            let listItemEl = document.createElement('li');

            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);
        });
    }
}

new App();