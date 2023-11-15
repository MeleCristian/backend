import fs from  "fs"



class CartManager {
  //Declaro constructor
  constructor(path) {
    this.carts = [];
    this.path = path;
  }

  //Declaro addCart
  async addCart() {
    //Consigo los carts ya existentes
    const carts = await getJSon(this.path);

    //seteo el id
    var autoId = 0;
    if (!carts.length) {
      autoId = 1;
    } else {
      autoId = carts[carts.length - 1].id + 1;
    }
    //Instancio el producto agregado
    const newCart = {
      id: autoId,
      products: [],
    };
    //Agrego el cart al array
    carts.push(newCart);
    //Guardo el archivo
    await saveJson(this.path, carts);
  }

  //Declarao GetProducts by id
  async getCartById(id) {
    const carts = await getJSon(this.path);
    let get = carts.find((cart) => cart.id === id);
    if (get) {
      return get;
    } else {
      console.log("Carrito no encontrado");
    }
  }

  //Declaro Update cart by id
  async updateCartById(cartId, productId) {
    console.log("estoy en el update");
    //obtengo todos los carts
    const carts = await getJSon(this.path);
    console.log("estoy consiguiendo los carts", carts);
    var valID = true; //auxiliar para el cart id
    //recorro todos los carts para ver cual coincide con el id
    carts.forEach((element) => {
      if (element.id === cartId) {
        valID = false; //si coincide cambio el aux a false
        var valProductId = true; //nuevo aux para el product id
        //recorro todos los productos dentro del cart para ver si coincide con el product id
        element.products.forEach((product) => {
          if (product.id === productId) {
            //si coincide le agrego 1 al quantity y cambio el aux
            product.quantity++;
            valProductId = false;
          }
        });
        //si ningun product coincide con el id creo uno nuevo
        if (valProductId) {
          const newProduct = {
            id: productId,
            quantity: 1,
          };
          element.products.push(newProduct);
        }
      }
    });
    //si ningun id coincide retorno error
    if (valID) {
      console.log("Id no encontrado");
    }
    //guardo los cambios
    await saveJson(this.path, carts);
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

export default CartManager
