const videojuegos = [];

module.exports = class Videojuego {
  constructor(nombre, plataforma, genero) {
    this.nombre = nombre;
    this.plataforma = plataforma;
    this.genero = genero;
  }

  save() {
    videojuegos.push(this);
  }

  static fetchAll() {
    return videojuegos;
  }
}
