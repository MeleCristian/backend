import fs from "fs"
import productsModels from "./dao/models/products.models.js";



 class ProductManager {

  //Declaro addProduct
  static async addProduct(addedProduct) {
    //Valido los campos requeridos
    if (
      !addedProduct.stock ||
      !addedProduct.code ||
      !addedProduct.thumbnail ||
      !addedProduct.price ||
      !addedProduct.descripction ||
      !addedProduct.title||
      !addedProduct.category||
      !addedProduct.status
    ) {
      console.log(
        "Se requieren todos los datos para poder ingresar un producto nuevo!"
      );
      console.log(addedProduct)
      return;
    }
    //Valido q el producto no este repetido por el code
    let add = await productsModels.findOne({code: addedProduct.code})
    if (add) {
      console.error(
        "Se intento registrar un Producto con un codigo ya existente!"
      );
      return;
    }
    console.log("Producto agregado satisfactoriamente")
    return productsModels.create(addedProduct)
  }

  //Delcaro GetProducts
  static async getProducts(query,API) {
    const{limit:lim=10,sort,page:pag=1, search}=query
    const criteria={}
    const options={limit:lim,page:pag}
    let sortLink=''
    let criteriaLink=''
    let apiLink=''
    API? apiLink="api/":apiLink=''

    if(sort=="asc"||sort=="desc"){
      options.sort={price:sort}
      sortLink=`&sort=${sort}`
    }

    if(search){
      if(search=="true"||search=="false"){
        criteria.status=search
        criteriaLink=`&search=${search}`
      }else{
        criteria.category=search
        criteriaLink=`&search=${search}`
      }
    }

    const result= await productsModels.paginate(criteria,options );
    const paginateResponse ={
      status:'succes',
      payload:result.docs.map((e)=>e.toJSON()),
      totalPages:result.totalPages,
      prevPage:result.prevPage,
      nextPage:result.nextPage,
      page:result.page,
      hasPrevPage:result.hasPrevPage,
      hasNextPage:result.hasNextPage,
      prevLink:result.hasPrevPage? `http://localhost:8080/${apiLink}products?limit=${lim}&page=${result.page-1}${sortLink}${criteriaLink}`:null,
      nextLink:result.hasNextPage? `http://localhost:8080/${apiLink}products?limit=${lim}&page=${result.page+1}${sortLink}${criteriaLink}`:null,

    }   
    
    return paginateResponse
  }

  //Declarao GetProducts by id
  static async getProductById(id) {
    const product = await productsModels.findById(id)
    if (!product) {
      throw new Error('Producto no encontrado')
    }
    return product
  }

  //Declaro delet product by id
  static async deletProductById(id) {
    await ProductManager.getProductById(id)
    await productsModels.deleteOne({_id:id})
    //console.log(`Producto Eliminado correctamente:${id} `)
  }

  //Declaro Update product by id
  static async updateProductById(id, updatedProduct) {
    await ProductManager.getProductById(id);
    await productsModels.updateOne( {_id:id}, {$set:updatedProduct})
    //console.log(`Producto actualizado correctamente:${id} `)
  }
}
/* //Declaro getJson
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
}; */

export default ProductManager

