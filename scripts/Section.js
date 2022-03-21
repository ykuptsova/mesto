class Section {
  constructor(config, containerSelector) {
    this.items = config.items
    this.renderer = config.renderer
    this.containerSelector = containerSelector
  }

  render() {
    const container = document.querySelector(this.containerSelector)
    this.items.forEach((item) => {
      const element = this.renderer(item)
      container.append(element)
    })
  }

  addItem(item) {
    const element = this.renderer(item)
    document.querySelector(this.containerSelector).prepend(element)
  }
}

export default Section
