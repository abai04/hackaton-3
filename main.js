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
let editId = null
let editModal = document.querySelector("#editModal")

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
        <a href="#" onclick="editProduct(${product.id})" data-bs-toggle="modal" data-bs-target="#editModal" class="btn btn-warning">Edit</a>
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
    titleEdit.value = data.title
    descEdit.value = data.description
    priceEdit.value = data.price
    imgEdit.value = data.img
    categoryEdit.value = data.category
    editId = id
  } catch (error) {
    console.log(error);
  }
}
saveEditBtn.addEventListener('click', () => {
  let editedProduct = {
    title: titleEdit.value,
    description: descEdit.value,
    price: priceEdit.value,
    img: imgEdit.value,
    category: categoryEdit.value
  };
  saveChanges(editedProduct);
});
async function saveChanges(editedProduct) {
  try {
    await fetch(`${API}/${editId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedProduct),
    });
    let modal = bootstrap.Modal.getInstance(editModal);
    modal.hide();
    render();
  } catch (error) {
    console.log(error);
  }
}