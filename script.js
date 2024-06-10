document.addEventListener('DOMContentLoaded', function () {
    const monsterList = document.getElementById('monsters');
    const detailsDiv = document.getElementById('details');
    const searchBar = document.getElementById('search-bar');
    let monsters = [];

    // Função para buscar a lista de monstros
    function fetchMonsters() {
        fetch('https://www.dnd5eapi.co/api/monsters')
            .then(response => response.json())
            .then(data => {
                monsters = data.results;
                displayMonsters(monsters);
            })
            .catch(error => console.error('Erro ao buscar monstros:', error));
    }

    // Função para exibir a lista de monstros
    function displayMonsters(monsters) {
        monsterList.innerHTML = '';
        monsters.forEach(monster => {
            const listItem = document.createElement('li');
            listItem.textContent = monster.name;
            listItem.addEventListener('click', () => fetchMonsterDetails(monster.index));
            monsterList.appendChild(listItem);
        });
    }

    // Função para buscar detalhes do monstro
    function fetchMonsterDetails(index) {
        fetch(`https://www.dnd5eapi.co/api/monsters/${index}`)
            .then(response => response.json())
            .then(data => {
                // Obtendo o valor de armor_class
                const armorClass = data.armor_class.map(ac => `${ac.value} (${ac.type})`).join(', ');

                detailsDiv.innerHTML = `
                    <h3>${data.name}</h3>
                    <p><strong>Tamanho:</strong> ${data.size}</p>
                    <p><strong>Tipo:</strong> ${data.type}</p>
                    <p><strong>Alinhamento:</strong> ${data.alignment}</p>
                    <p><strong>Classe de Armadura:</strong> ${armorClass}</p>
                    <p><strong>Pontos de Vida:</strong> ${data.hit_points}</p>
                    <p><strong>Velocidade:</strong> ${data.speed.walk}</p>
                    <h4>Estatísticas</h4>
                    <ul>
                        <li><strong>Força:</strong> ${data.strength}</li>
                        <li><strong>Destreza:</strong> ${data.dexterity}</li>
                        <li><strong>Constituição:</strong> ${data.constitution}</li>
                        <li><strong>Inteligência:</strong> ${data.intelligence}</li>
                        <li><strong>Sabedoria:</strong> ${data.wisdom}</li>
                        <li><strong>Carisma:</strong> ${data.charisma}</li>
                    </ul>
                `;
            })
            .catch(error => console.error('Erro ao buscar detalhes do monstro:', error));
    }

    // Função para filtrar a lista de monstros
    function filterMonsters(event) {
        const searchTerm = event.target.value.toLowerCase();
        const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchTerm));
        displayMonsters(filteredMonsters);
    }

    // Adicionar evento ao search bar
    searchBar.addEventListener('input', filterMonsters);

    // Inicializar a lista de monstros
    fetchMonsters();
});
