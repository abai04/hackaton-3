const API = "http://localhost:8000/products"

// переменные для create
let titleInp = document.querySelector(".title-inp")
let descInp = document.querySelector(".desc-inp")
let priceInp = document.querySelector(".price-inp")
let imgInp = document.querySelector(".img-inp")
let categoryInp = document.querySelector(".category-inp")
let addBtn = document.querySelector(".add-btn")

//переменные для read
let catalogueBlock = document.querySelector(".catalogue-block")
async function createProduct(newProduct){
    try {
    await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
  } catch (error) {
    console.log(error);
  }
}
//переменные для edit
let titleEdit = document.querySelector(".title-edit")
let descEdit = document.querySelector(".desc-edit")
let priceEdit = document.querySelector(".price-edit")
let imgEdit = document.querySelector(".img-edit")
let categoryEdit = document.querySelector(".category-edit")
let saveEditBtn = document.querySelector(".save-edit-btn")

addBtn.addEventListener("click", ()=>{
    if (!titleInp.value.trim() || !descInp.value.trim() || !priceInp.value.trim() || !imgInp.value.trim()) {
        alert("Заполните все поля")
        return
    }
    let newProduct = {
        title: titleInp.value,
        description: descInp.value,
        price: priceInp.value,
        img: imgInp.value,
        category: categoryInp.value
    }
    createProduct(newProduct)
    render()
    document.querySelectorAll("input").forEach(el => el.value = "")
})

//read
async function render() {
    try{
        let res = await fetch(API)
        let data = await res.json()
        catalogueBlock.innerHTML = ""
        data.forEach(product =>{
            catalogueBlock.innerHTML += `<div class="card">
            <img src=${product.img} class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <p>${product.price}сом</p>
        <a href="#" onclick="deleteProduct(${product.id})" class="btn btn-secondary">Delete</a>
        <a href="#" onclick="editProduct()" data-bs-toggle="modal" data-bs-target="#editModal" class="btn btn-warning">Edit</a>
      </div>
    </div>`;
        })
    }catch(error){
        console.log(error);
    }
}
render()

//delete
async function deleteProduct(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  render();
}

//edit
async function editProduct(id) {
  try {
    let res = await fetch(`${API}/${id}`);
    let data = await res.json();
    titleEdit
    // inpEditCategory.value = data.category;
    // inpEditColor.value = data.color;
    // inpEditDescription.value = data.description;
    // inpEditImage.value = data.imageUrl;
    // inpEditPrice.value = data.price;
    // inpEditSize.value = data.size;
    // inpEditTitle.value = data.title;
    // editId = id;
  } catch (error) {
    console.log(error);
  }
}