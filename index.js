const handleSearch = async (event) => {
  event.preventDefault();

  const MessageUser = document.getElementById('message');
  const ListaShows = document.getElementById('shows');
  const nomeDigitado = document.getElementById('query').value;
  const URL = `https://api.tvmaze.com/search/shows?q=${nomeDigitado}`;
  const Resultado = await fetch(URL);
  const ListaBuscada = await Resultado.json();

  MessageUser.innerHTML = '';
  ListaShows.innerHTML = '';

  if (!Resultado.ok) {
    MessageUser.innerHTML = 'A aplicação falhou!';
    return;
  }

  if (ListaBuscada.length === 0) {
    MessageUser.innerHTML = 'Não encontrado!';
    return;
  }

  ListaBuscada.forEach((element) => {
    const MostraNome = element?.show?.name;
    const MostraImagem = element?.show?.image?.medium || '';

    ListaShows.insertAdjacentHTML(
      'beforeend',
      `
      <li>
          <img class="poster" src="${MostraImagem}" />
          <span class="show-name">${MostraNome}</span>
      </li>
`
    );
  });
};

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#search-form')
    .addEventListener('submit', handleSearch);
});
