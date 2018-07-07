const buttonStyle = {
};

class Books extends React.Component {

  constructor(props) {
    super(props);
    this.state= {};
    this.state.books = [];
    this.state.title = "";
    this.state.author = "";
    this.state.genre = "";
    this.state.idCounter = 1;
    this.state.currentId = 0;
    this.saveBook = this.saveBook.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
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

  render() {

    const head = React.createElement('thead', null,
      React.createElement('tr', null,
        [React.createElement('th', {class: 'book-title'}, 'book title'),
        React.createElement('th', {class: 'author'}, 'author'),
        React.createElement('th', {class: 'genre'}, 'genre'),
        React.createElement('th', {class: 'actions'}, 'actions')]
      )
    );


    let rows = [];
    const arrowIcon = '\u2B9D';
    const saveIcon = '&#x1F4BE;';

    for (let book of this.state.books) {
      let actionButtons = [
        React.createElement('button', {class: 'button-close', title: 'Close', onClick: this.deleteBook(book).bind(this)}, 'X'),
        React.createElement('button', {class: 'button-close', title: 'Update', onClick: this.editBook(book).bind(this)}, arrowIcon)
      ]
      let row = [React.createElement('td', null, book.title),
      React.createElement('td', null, book.author),
      React.createElement('td', null, book.genre),
      React.createElement('td', null, actionButtons)
    ]



      rows.push(React.createElement('tr', null, row));
    }

    const body = React.createElement('tbody', null, rows)


    return [
      React.createElement('div', {class:'col-xs-4 flex'}, [
        React.createElement('input', {type: 'text', class:'input-lg', placeholder:'Write the title here', value: this.state.title, onChange: this.handleTitleChange}),
      ]),
      React.createElement('div', {class:'col-xs-4 flex'}, [
        React.createElement('input', {type: 'text', class:'input-lg', placeholder:'Write the author here', value: this.state.author, onChange: this.handleAuthorChange}),
      ]),
      React.createElement('div', {class:'col-xs-4 flex'}, [
        React.createElement('input', {type: 'text', class:'input-lg', placeholder:'Write the genre here', value: this.state.genre, onChange: this.handleGenreChange}),
        React.createElement('button', {style: buttonStyle, onClick: this.saveBook}, '💾')
      ]),
      React.createElement('table', {class: 'striped-table col-xs-12'}, [head, body])
    ];
  }
}

const books = new Books();
