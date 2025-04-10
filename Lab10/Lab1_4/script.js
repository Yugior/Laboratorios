// 📌 Obtener el div donde se mostrarán los resultados
const output = document.getElementById("output");

// 🟢 Ejercicio 1: Tabla de cuadrados y cubos
function tablaCuadradosCubos() {
    output.innerHTML = ""; // 🔹 Limpiar el contenido anterior

    let numero = parseInt(prompt("Ingrese un número:")); // 🔹 Pedir un número al usuario

    if (isNaN(numero) || numero <= 0) { // 🔹 Verificar que el número sea válido
        output.innerHTML = "<p>❌ Por favor, ingrese un número válido mayor que 0.</p>";
        return;
    }

    // 🔹 Construir la tabla con los cuadrados y cubos
    let resultado = "<h2>Tabla de cuadrados y cubos</h2>";
    resultado += "<table border='1'><tr><th>Número</th><th>Cuadrado</th><th>Cubo</th></tr>";

    for (let i = 1; i <= numero; i++) { // 🔹 Generar los valores para la tabla
        resultado += `<tr><td>${i}</td><td>${i ** 2}</td><td>${i ** 3}</td></tr>`;
    }

    resultado += "</table>";

    output.innerHTML = resultado; // 🔹 Mostrar la tabla en el HTML
}

// 🟢 Ejercicio 2: Suma de números aleatorios con tiempo de respuesta
function sumaAleatoria() {
    output.innerHTML = ""; // 🔹 Limpiar el contenido anterior

    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);

    let inicio = Date.now();
    let respuesta = parseInt(prompt(`¿Cuánto es ${num1} + ${num2}?`));
    let tiempo = (Date.now() - inicio) / 1000;

    let mensaje = (respuesta === num1 + num2) ? "✅ Correcto" : `❌ Incorrecto, era ${num1 + num2}`;

    output.innerHTML = `<p>${mensaje}. Tiempo: ${tiempo.toFixed(2)} segundos.</p>`;
}

// 🟢 Ejercicio 3: Contador de valores en un arreglo
function contador() {
    output.innerHTML = ""; // 🔹 Limpiar el contenido anterior

    let entrada = prompt("Ingrese números separados por comas (ejemplo: -1,0,5,-3,0,7):");
    
    if (!entrada) {
        output.innerHTML = "<p>❌ Entrada inválida.</p>";
        return;
    }

    let arr = entrada.split(',').map(Number); // 🔹 Convertir la entrada a un array de números

    let negativos = arr.filter(n => n < 0).length;
    let ceros = arr.filter(n => n === 0).length;
    let positivos = arr.filter(n => n > 0).length;

    output.innerHTML = `<p>🔹 Negativos: ${negativos}, Ceros: ${ceros}, Positivos: ${positivos}</p>`;
}

// 🟢 Ejercicio 4: Promedios de una matriz
function promedios() {
    output.innerHTML = ""; // 🔹 Limpiar el contenido anterior

    let filas = parseInt(prompt("Ingrese la cantidad de filas de la matriz:"));
    let matriz = [];

    if (isNaN(filas) || filas <= 0) {
        output.innerHTML = "<p>❌ Entrada inválida.</p>";
        return;
    }

    for (let i = 0; i < filas; i++) {
        let fila = prompt(`Ingrese los números de la fila ${i + 1}, separados por comas:`);

        if (!fila) {
            output.innerHTML = "<p>❌ Entrada inválida.</p>";
            return;
        }

        matriz.push(fila.split(',').map(Number)); // 🔹 Convertir la entrada a un array de números
    }

    let promediosArray = matriz.map(fila => fila.reduce((a, b) => a + b, 0) / fila.length);
    
    output.innerHTML = `<p>📊 Promedios: ${JSON.stringify(promediosArray)}</p>`;
}

// 🟢 Ejercicio 5: Inverso de un número
function inverso() {
    output.innerHTML = ""; // 🔹 Limpiar el contenido anterior

    let num = prompt("Ingrese un número para invertir:");

    if (!num || isNaN(num)) {
        output.innerHTML = "<p>❌ Entrada inválida.</p>";
        return;
    }

    let resultado = parseInt(num.toString().split('').reverse().join(''));

    output.innerHTML = `<p>🔄 Inverso de ${num} es ${resultado}</p>`;
}

// 🟢 Ejercicio 6: Creación de un objeto (Clase Persona)
class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    saludar() {
        return `Hola, mi nombre es ${this.nombre} y tengo ${this.edad} años.`;
    }

    esMayor() {
        return this.edad >= 18 ? "Soy mayor de edad." : "Soy menor de edad.";
    }
}

// 🟢 Función para crear una persona con input del usuario
function mostrarPersona() {
    output.innerHTML = ""; // 🔹 Limpiar el contenido anterior

    let nombre = prompt("Ingrese su nombre:");
    let edad = parseInt(prompt("Ingrese su edad:"));

    if (!nombre || isNaN(edad)) {
        output.innerHTML = "<p>❌ Entrada inválida.</p>";
        return;
    }

    let persona = new Persona(nombre, edad);

    output.innerHTML = `<p>${persona.saludar()}</p><p>${persona.esMayor()}</p>`;
}
