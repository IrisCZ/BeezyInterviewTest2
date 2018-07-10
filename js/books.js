class Books extends React.Component {

  constructor(props) {
    super(props);
    this.state= {};
    this.state.books = [];
    this.state.title = "";
    this.state.author = "";
    this.state.genre = "";
    this.state.newGenre = "";
    this.state.genres = ["Drama", "Comedy", "Horror", "Science fiction"];
    this.state.idCounter = 1;
    this.state.currentId = 0;
    this.saveBook = this.saveBook.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleNewGenreChange = this.handleNewGenreChange.bind(this);
    this.handleGenresListChange = this.handleGenresListChange.bind(this);
    this.addGenre = this.addGenre.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.state.showModal = false;
  }



  saveBook() {
    if(this.state.currentId > 0) {
      this.state.books.forEach(book => {
        if(book.id === this.state.currentId) {
          book.title = this.state.title;
          book.author = this.state.author;
          book.genre = this.state.genre;
        }
      });
      this.setState({books: this.state.books, title: '', author: '', genre: '', currentId: 0});
      return
    }

    this.state.books.push({title: this.state.title, author: this.state.author, genre: this.state.genre, id: this.state.idCounter});
    this.setState({books: this.state.books, title: '', author: '', genre: '', idCounter: this.state.idCounter+1});
  }

  handleTitleChange(event){
    this.setState({title: event.target.value});
  }

  handleAuthorChange(event){
    this.setState({author: event.target.value});
  }

  handleGenreChange(event){
    this.setState({genre: event.target.value});
  }

  handleNewGenreChange(event){
    this.setState({newGenre: event.target.value});
  }

  handleGenresListChange(event){
    let index = event.target.dataset.index
    this.state.genres[index] = event.target.innerHTML;
    this.setState({genres: this.state.genres});
  }

  deleteBook(bookToDelete){
    return function(){
      this.setState({books: this.state.books.filter(book => book.id != bookToDelete.id)})
    }
  }

  editBook(bookToUpdate){
    return function(){
      this.setState({title: bookToUpdate.title, author: bookToUpdate.author, genre: bookToUpdate.genre, currentId: bookToUpdate.id});
    }
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }
  addGenre(){
      this.state.genres.push(this.state.newGenre);
      this.setState({genres: this.state.genres})
  }

  deleteGenre(genreToDelete){
    return function(){
      this.state.genres.splice(genreToDelete, 1)
      this.setState({genres: this.state.genres})
    }
  }

  editGenre(genreToUpdate){
    return function(){
      this.setState({genre: bookToUpdate.genre});
    }
  }

  editGenreField(event){
    event.target.setAttribute("contenteditable", true);
  }

  render() {

    const head = React.createElement('thead', null,
      React.createElement('tr', null,
        [React.createElement('th', {class: 'book-title'}, 'book title'),
        React.createElement('th', {class: 'author'}, 'author'),
        React.createElement('th', {class: 'genre'}, 'genre'),
        React.createElement('th', {class: 'actions'}, 'actions')]
        )
      );


    const arrowIcon = '\u2B9D';
    const saveIcon = '&#x1F4BE;';

    let rows = this.state.books.map(book => {
      let actionButtons = [
        React.createElement('button', {class: 'button-close', title: 'Close', onClick: this.deleteBook(book).bind(this)}, 'X'),
        React.createElement('button', {class: 'button-close', title: 'Update', onClick: this.editBook(book).bind(this)}, arrowIcon)
      ]
      let row = [React.createElement('td', null, book.title),
      React.createElement('td', null, book.author),
      React.createElement('td', null, book.genre),
      React.createElement('td', null, actionButtons)
      ]

        return React.createElement('tr', null, row);
      }
    )
    const body = React.createElement('tbody', null, rows)

    let genreOptions = this.state.genres.map(item =>  React.createElement('option', {value: item}))
    let searchGenres =  [
      React.createElement('label', null, 'Select a genre'),
      React.createElement('div',{class:'search__genres__input'}, [
        React.createElement('input', {type: 'text',
                                      class:'input-lg',
                                      list: 'genres',
                                      placeholder:'e.g. Science Fiction',
                                      name: 'genres',
                                      value: this.state.genre,
                                      onChange: this.handleGenreChange}),
        React.createElement('datalist', { id: 'genres',
                                          class:'input-lg'},
                                          genreOptions),
        React.createElement('button', {onClick: this.toggleModal.bind(this)},'Edit')
      ]),
      React.createElement('span', {class: 'search__genres__info'}, 'To manage the genres list click the edit button'),
    ];

    /*modal GENRES*/

    const genresTableHead = React.createElement('thead', null,
                            React.createElement('tr', null,[
                              React.createElement('th', {class: 'genre'}, 'genre'),
                              React.createElement('th', {class: 'actions'}, 'actions')]
                            )
                          );

    let genresTableRows = this.state.genres.map((genre, i) => {

      let genreTableRow = [
        React.createElement('td', { "data-index": i,
                                    class: "editable",
                                    onClick: this.editGenreField,
                                    onBlur: this.handleGenresListChange}, genre),
        React.createElement('td', null, React.createElement('button', {class: 'button-close', title: 'Close', onClick: this.deleteGenre(genre).bind(this)}, 'X'))
      ]
        return React.createElement('tr', null, genreTableRow);
      }
    )

    const genresTableBody = React.createElement('tbody', null, genresTableRows)
    const genresTable = [genresTableHead, genresTableBody];

    let modalGenres = [
      React.createElement('div', {class:'modal__inner'}, [
        React.createElement('h2', {class:'title'}, 'Genres'),
        React.createElement('div', {class: 'flex modal__inputField'}, [
          React.createElement('label', null, 'Add a new genre'),
          React.createElement('input', {type: 'text',
                                        class:'input-lg modal__input',
                                        placeholder:'e.g. Comedy',
                                        value: this.state.newGenre,
                                        onChange: this.handleNewGenreChange}),
          React.createElement('button', {class: 'modal__add-button', onClick: this.addGenre}, '+')
        ]),
        React.createElement('table', {class:'striped-table'}, genresTable),
        React.createElement('p', null, 'To edit a genre click twice on its cell'),
        React.createElement('button', {class:'modal__close-button', onClick: this.toggleModal}, 'X')
      ])
    ]

    return [
      React.createElement('div', {class:'col-xs-4 flex'}, [
        React.createElement('label', null, 'Write the title here'),
        React.createElement('input', {type: 'text',
                                      class:'input-lg',
                                      placeholder:'e.g. 1Q84',
                                      value: this.state.title,
                                      onChange: this.handleTitleChange}),
      ]),
      React.createElement('div', {class:'col-xs-4 flex'}, [
        React.createElement('label', null, 'Write the author here'),
        React.createElement('input', {type: 'text',
                                      class:'input-lg',
                                      placeholder:'e.g. Haruki Murakami',
                                      value: this.state.author,
                                      onChange: this.handleAuthorChange}),
      ]),
      React.createElement('div', {class:'col-xs-3 flex search__genres__container'}, searchGenres),
      React.createElement('div', {class:'col-xs-1 flex save__container'}, [
        React.createElement('button', {class: 'saveButton', onClick: this.saveBook}, '💾')
      ]),
      React.createElement('table', {class: 'striped-table col-xs-12'}, [head, body]),

      React.createElement('div', {class: this.state.showModal ? 'modal':'hidden'}, modalGenres)
    ]
  }
}

const books = new Books();
