class Embed {
  constructor() {
    Object.assign(this, {
      "embed": {
        "fields": []
      },
      "content": ""
    })
    return this;
  }

  message(content = "") {
    this.content = content
    return this;
  }

  title(title, url = "") {
    this.embed.title = title.toString().substring(0, 256)
    this.embed.url = url
    return this;
  }

  author(name, icon = "", url = "") {
    this.embed.author = {
      "name": name.toString().substring(0, 256),
      "url": url,
      "icon_url": icon
    }
    return this;
  }

  color(color) {
    this.embed.color = (color[0]==="#") ? parseInt(color.replace("#", ""), 16) : color
    return this;
  }

  timestamp(time = new Date()) {
    this.embed.timestamp = time
    return this;
  }

  thumbnail(image) {
    this.embed.thumnail = {
      "url": image
    }
    return this;
  }

  image(image) {
    this.embed.image = {
      "url": image
    }
    return this;
  }

  footer(text, url = "") {
    this.embed.footer = {
      "icon_url": url,
      "text": footer.toString().substring(0, 2048)
    }
    return this;
  }

  description(value) {
    this.embed.description = value.toString().substring(0, 2048)
    return this;
  }

  addField(title, value, inline = false) {
    this.embed.fields.push({
      "name": title.toString().substring(0, 256),
      "value": value.toString().substring(0, 1024),
      "inline": inline
    })
    return this;
  }
}
module.exports = Embed;
