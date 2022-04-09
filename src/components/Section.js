class Section {
  constructor(config, containerSelector) {
    this._items = config.items
    this._renderer = config.renderer
    this._container = document.querySelector(containerSelector)
  }

  render() {
    this._items.forEach((item) => {
      const element = this._renderer(item)
      this._container.append(element)
    })
  }

  addItem(item) {
    const element = this._renderer(item)
    this._container.prepend(element)
  }
}

export default Section
