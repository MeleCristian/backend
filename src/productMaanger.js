const fs = require("fs");
const { json } = require("stream/consumers");

class ProductManager {
  //Declaro constructor
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  //Declaro addProduct
  async addProduct(addedProduct) {
    //Valido los campos requeridos
    if (
      !addedProduct.stock ||
      !addedProduct.code ||
      !addedProduct.thumbnail ||
      !addedProduct.price ||
      !addedProduct.descripction ||
      !addedProduct.title
    ) {
      console.log(
        "Se requieren todos los datos para poder ingresar un producto nuevo!"
      );
      return;
    }
    //Consigo los productos ya existentes
    const products = await getJSon(this.path);
    //Valido q el producto no este repetido por el code
    let add = products.find((product) => product.code === addedProduct.code);
    if (add) {
      console.error(
        "Se intento registrar un Producto con un codigo ya existente!"
      );
      return;
    }
    //seteo el id
    var autoId = 0;
    if (!products.length) {
      autoId = 1;
    } else {
      autoId = products[products.length - 1].id + 1;
    }
    //Instancio el producto agregado
    const newProduct = {
      id: autoId,
      ...addedProduct,
    };
    //Agrego el producto al array
    products.push(newProduct);
    //Guardo el archivo
    await saveJson(this.path, products);
  }
  //Delcaro GetProducts
  getProducts() {
    return getJSon(this.path);
  }
  //Declarao GetProducts by id
  async getProductById(id) {
    const products = await getJSon(this.path);
    let get = products.find((product) => product.id === id);
    if (get) {
      return get;
    } else {
      console.log("Producto no encontrado");
    }
  }
  //Declaro delet product by id
  async deletProductById(id) {
    const products = await getJSon(this.path);
    var productIndex = -10;
    products.forEach((element, index) => {
      if (element.id === id) {
        productIndex = index;
      }
    });
    if (productIndex === -10) {
      return console.log("Id no encontrado, no se pudo eliminar proucto");
    }
    products.splice(productIndex, 1);
    await saveJson(this.path, products);
  }
  //Declaro Update product by id
  async updateProductById(id, updatedProduct) {
    const products = await getJSon(this.path);
    const { title, description, price, thumbnail, code, stock } =
      updatedProduct;
    var productIndex = -10;
    products.forEach((element, index) => {
      if (element.id === id) {
        productIndex = index;
      }
    });
    if (productIndex === -10) {
      return console.log("Id no encontrado, no se pudo actualizar");
    }

    if (title) {
      products[productIndex].title = title;
    }
    if (description) {
      products[productIndex].description = description;
    }
    if (price) {
      products[productIndex].price = price;
    }
    if (thumbnail) {
      products[productIndex].thumbnail = thumbnail;
    }
    if (code) {
      products[productIndex].code = code;
    }
    if (stock) {
      products[productIndex].stock = stock;
    }
    await saveJson(this.path, products);
  }
}

//Declaro getJson
const getJSon = async (path) => {
  if (!fs.existsSync(path)) {
    return [];
  }
  const jsonContent = await fs.promises.readFile(path);
  return JSON.parse(jsonContent);
};
//Declaro SaveJson
const saveJson = async (path, file) => {
  const fileContent = JSON.stringify(file, null, "\t");
  await fs.promises.writeFile(path, fileContent);
};

//Funcion de testeo
/* async function testing(){
    const productsList = new ProductManager("./products.json");
    console.log("sin productos:", await productsList.getProducts());
    await productsList.addProduct(
    "remera",
    "remera para hombre",
    1500,
    "www.hola.com",
    "1",
    25
    );
    console.log("Primer Producto Agregado:",await productsList.getProducts());
    await productsList.addProduct(
    "remera",
    "remera para hombre",
    1500,
    "www.hola.com",
    "1",
    25
    );
    await productsList.addProduct(
      "remera",
      "remera para hombre",
      1500,
      "www.hola.com",
      "2",
      25
      );
    console.log("Producto 2 agregado")
    console.log("Producto traido por id erroneo (12):");
    await productsList.getProductById(12);
    console.log("Producto traido por id existente (1):");
    await productsList.getProductById(1);
    console.log("Producto con id inexistente (12) actualizado")
    await productsList.updateProductById(12,{title:"campera"})
    console.log("Producto con id 1 actualizado")
    await productsList.updateProductById(1,{title:"campera"})
    await productsList.getProductById(1)
    console.log("Producto eliminado por id erroneo:")
    productsList.deletProductById(12)
    await productsList.deletProductById(1)
    console.log("Producto con id 1 eliminado")
    console.log("Todos los productos",await productsList.getProducts())
  
}

testing()
 */
exports.productManager = ProductManager;
