class Section {
  constructor(config, containerSelector) {
    this.items = config.items
    this.renderer = config.renderer
    this.container = document.querySelector(containerSelector)
  }

  render() {
    this.items.forEach((item) => {
      const element = this.renderer(item)
      this.container.append(element)
    })
  }

  addItem(item) {
    const element = this.renderer(item)
    this.container.prepend(element)
  }
}

export default Section
