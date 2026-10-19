const express = require('express');
const app = express();

app.use(express.json());

// Catálogo en memoria
let autos = [
  { id: 1, marca: 'Toyota',     modelo: 'Corolla', anio: 2022, precio: 385000, color: 'Blanco' },
  { id: 2, marca: 'Nissan',     modelo: 'Versa',   anio: 2021, precio: 295000, color: 'Gris' },
  { id: 3, marca: 'Volkswagen', modelo: 'Jetta',   anio: 2023, precio: 420000, color: 'Negro' },
  { id: 4, marca: 'Mazda',      modelo: 'Mazda 3', anio: 2022, precio: 410000, color: 'Rojo' },
  { id: 5, marca: 'Chevrolet',  modelo: 'Aveo',    anio: 2020, precio: 210000, color: 'Azul' }
];

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    mensaje: 'Microservicio de catálogo de autos',
    rutas: ['GET /autos', 'GET /autos/:id', 'POST /autos', 'PUT /autos/:id', 'DELETE /autos/:id']
  });
});

// Obtener todos los autos
app.get('/autos', (req, res) => {
  res.json(autos);
});

// Obtener un auto por id
app.get('/autos/:id', (req, res) => {
  const auto = autos.find(a => a.id === parseInt(req.params.id));
  if (!auto) return res.status(404).json({ error: 'Auto no encontrado' });
  res.json(auto);
});

// Agregar un auto
app.post('/autos', (req, res) => {
  const { marca, modelo, anio, precio, color } = req.body;
  if (!marca || !modelo || !anio || !precio || !color) {
    return res.status(400).json({ error: 'Faltan datos: marca, modelo, anio, precio y color' });
  }
  const nuevo = {
    id: autos.length ? Math.max(...autos.map(a => a.id)) + 1 : 1,
    marca, modelo, anio, precio, color
  };
  autos.push(nuevo);
  res.status(201).json(nuevo);
});

// Modificar un auto
app.put('/autos/:id', (req, res) => {
  const auto = autos.find(a => a.id === parseInt(req.params.id));
  if (!auto) return res.status(404).json({ error: 'Auto no encontrado' });
  const { marca, modelo, anio, precio, color } = req.body;
  if (marca) auto.marca = marca;
  if (modelo) auto.modelo = modelo;
  if (anio) auto.anio = anio;
  if (precio) auto.precio = precio;
  if (color) auto.color = color;
  res.json(auto);
});

// Eliminar un auto
app.delete('/autos/:id', (req, res) => {
  const indice = autos.findIndex(a => a.id === parseInt(req.params.id));
  if (indice === -1) return res.status(404).json({ error: 'Auto no encontrado' });
  const eliminado = autos.splice(indice, 1);
  res.json(eliminado[0]);
});

// Render asigna el puerto en la variable PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servicio activo en el puerto ${PORT}`);
});
