import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /** Documentation
   * Render the recieved object to the dom
   * @param {Object | Object[]} data The data to be rendered
   * @param {boolean} [rendered = true] If false, create a markup tring   instead of rendering to the DOM
   * @returns {undefined | string} A markup is returned when render is false
   * @this {Object} View instance~
   * @todo finish implementation~
   */
  render(data, rendered = true) {
    // To check if theres data, or if the data is an array and is empty
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!rendered) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // we will update only the parts we want to by gnerating a new markup with the new data and then comparing the markups for differences

    // converts the string to real dom objects
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = [...newDOM.querySelectorAll('*')];
    const curElements = [...this._parentElement.querySelectorAll('*')];

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // check if the elements are different, or if the text content of the element is not empty so that we dont set elements to nothing
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // update changed attributes
      if (!newEl.isEqualNode(curEl)) {
        [...newEl.attributes].forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}.svg#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> -->`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
    <div>
      <svg>
        <use href="${icons}.svg#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> -->`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
