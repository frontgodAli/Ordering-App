import { menuArray } from "./data.js";
const menu=document.getElementById("main")
const orderContainer=document.getElementById("order-container")
const arrayOfOrders=[]
const totalPrice=document.getElementById("total-price")
document.addEventListener("click",e=>{
    if(e.target.dataset.add){
        showOrder(e.target.dataset.add)
        orderContainer.innerHTML=renderOrders()
    }

})





function showOrder(itemId){
    const exactItem=menuArray.filter((item)=>{
        return item.id===Number(itemId)})[0]
    arrayOfOrders.push({
        name:exactItem.name,
        price:exactItem.price
    })
}

function renderOrders(){
    return arrayOfOrders.map(order=>{
        return `<div class="order-info">
            <div class="label-button">
                <p>${order.name}</p>
                <button class="remove-btn">remove</button>
            </div>
            <p>$${order.price}</p>
        </div>`
    })
}

function renderMenu(){
    return menuArray.map(item=>{
        return `<div class="item-container">
        <div class="item">
            <p class="emoji">${item.emoji}</p>
            <div class="item-description">
                <p class="item-name">${item.name}</p>
                <p class="item-ingredients">${item.ingredients.join(' ,')}</p>
                <p class="item-price">$${item.price}</p>
            </div>
        </div>
        <button class="add-order" id="adding" data-add="${item.id}">+</button>
    </div>`
    })
}


menu.innerHTML=renderMenu()

