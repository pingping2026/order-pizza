import {menuArray} from '/data.js'

const foodList = document.getElementById("food-list")
const orderedFood = document.getElementById("ordered-food")

function getFoodArray(menu){
    return menu.map(food=>`<div class="container">
    <div class="food-img">${food.emoji}</div>
    <div class="food-des">
    <p class ="food-name">${food.name}</p>
    <p class="ingredients">${food.ingredients.join()}</p>
    <p class="food-price">$${food.price}</p></div>
    <button class="add"  data-add="${food.id}">+</button></div>`).join('')
}

foodList.innerHTML = getFoodArray(menuArray)

document.addEventListener("click",function(e){
 e.target.dataset.add&&getOrderList(e.target.dataset.add)
 e.target.dataset.remove&&disorder(e.target.dataset.remove)
  if(e.target.id === "complete-btn"){
    modal.style.display = "flex" 
  }
})
const ordered = []

function getOrderList(foodId){
    ordered.push(menuArray.filter(food=> food.id == foodId)[0])
    render()
}
function render(){
    const total = ordered.reduce((sum,food) => sum+food.price,0)
    orderedFood.innerHTML = `<p class="bill-title">Your order</p>
        <div class="ordered-food-list">
        ${ordered.map(item => `
        <div class="ordered-food">
        <p class="name">${item.name}</p>
        <button class="remove-btn" id="re-btn" data-remove="${item.id}">remove</button>
        <p class="price">$${item.price}</p>
        </div>`).join('')}
        </div>
        <div class="total-list">
            <p class="name">Total price:</p>
            <p class="price">$${total}</p>
        </div>
        <button class="btn" id="complete-btn">Complete order</button>`
}

function disorder(foodId){
    const index = ordered.findIndex(item => item.id == foodId)
    if(index != -1){
        ordered.splice(index,1)
    }
    render()
}

document.getElementById("paymentForm").addEventListener("submit", function(e){
    e.preventDefault()
    modal.style.display = "none"
    orderedFood.innerHTML = `<p class="finishLine">Thanks, ${document.getElementById("userName").value}! Your order is on its way!</p>`
})