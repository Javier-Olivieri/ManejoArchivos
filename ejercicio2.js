const fs = require('fs')




class Contenedor {
    constructor() {
        this.id = undefined,
            this.title = undefined,
            this.price = undefined,
            this.thumbnail = undefined
    }

    save = (title, price, thumbnail, obj) => {
        try {
            if (fs.existsSync('./desafio.txt')) {
                const data = JSON.parse(fs.readFileSync('./desafio.txt', 'utf-8'))
                const lastProd = data[data.length - 1].id
                this.title = title
                this.price = price
                this.thumbnail = thumbnail
                this.id = lastProd + 1
                data.push(obj)
                fs.writeFileSync('./desafio.txt', `${JSON.stringify(data)}`)
            } else {
                const array = []
                this.title = title
                this.price = price
                this.thumbnail = thumbnail
                this.id = 1
                array.push(obj)
                fs.writeFileSync('./desafio.txt', `${JSON.stringify(array)}`)
            }

        } catch (error) {
            console.log(error)
        }

        console.log('Archivo guardado!')
    }


    getByID = (id) => {
        const data = fs.readFileSync('./desafio.txt', 'utf-8')
        console.log('getById', JSON.parse(data).find(x => x.id === id))
    }

    getAll = () => {
        const data = fs.readFileSync('./desafio.txt', 'utf-8')
        console.log(data)
    }

    deleteById =  (id) => {
        try {
            const data = fs.readFileSync('./desafio.txt', 'utf-8')
            const newArray = JSON.parse(data)
             const filteredArray = newArray.filter(x => x.id !== id)
            
            fs.writeFileSync('./desafio.txt', `${JSON.stringify(filteredArray)}`)
            console.log('Producto eliminado', filteredArray)
        } catch (error) {
            console.log(error)
        }
    }

    deleteAll = async () => {
        await fs.promises.writeFile('./desafio.txt', ``)
        console.log('Productos eliminados')
    }



}

// Instancio y guardo los productos nuevos
const contenedor = new Contenedor()
contenedor.save('Escuadra', 123.5, 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png', contenedor)
contenedor.save('Calculadora', 234.56, 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"', contenedor)
contenedor.save('Globo Terraqueo', 345.67, 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"',contenedor)
//Obtengo todos los productos
// contenedor.getAll()
//Obtengo el producto con ID 2
// contenedor.getByID(2)
//Elimino el producto con ID 2
contenedor.deleteById(2)
//Metodo para borrar todo
// contenedor.deleteAll()

