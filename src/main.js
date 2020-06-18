class App{
    constructor() {
        this.repositories = [];

        this.formEl = document.getElementById('repo-form');
        this.listEl = document.getElementById('repo-list');

        this.registerHandlers();
    }

    registerHandlers() {
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    addRepository(event){
        event.preventDefault();
        this.repositories.push({
            name: 'Gabriel da Silva Sousa',
            description: 'Irineu vc nao sabe nem eu',
            avatar_url: 'https://avatars3.githubusercontent.com/u/54194379?s=460&u=3a7c3b0f100ec50ab019e88af47f0e71b02efe24&v=4',
            html_url: 'https://github.com/gabriel-dasilvasousa',
        });

        this.render();
    }

    render() {
        this.listEl.innerHTML = "";

        this.repositories.forEach(repository => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repository.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repository.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repository.description));

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