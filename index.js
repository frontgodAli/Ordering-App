import { menuArray } from "./data.js";
const arrayOfOrders=[]


document.addEventListener("submit",e=>{
    e.preventDefault()
    const myForm= new FormData(document.getElementById("my-form"))
    const myFormName=myForm.get("form-name")
    document.getElementById("order-section").innerHTML=`<div class="confirmation">
    <p>Thanks, ${myFormName}! Your order is on its way!</p>
</div>`
    document.getElementById("modal").style.display="none"
})

document.addEventListener("click",e=>{
    if(e.target.dataset.add){
        pushOrder(e.target.dataset.add)
        totalPrice()
        renderOrder()
    }
    if(e.target.id==='add-btn'){
        document.getElementById("order-section").style.display="block"
    }
    if(e.target.dataset.remove){
        removeOrder(e.target.dataset.remove)
    }
    if(e.target.id==='complete-order-btn'){
        document.getElementById("modal").style.display="block"
    }
})

function pushOrder(itemId){
    const exactItem=menuArray.filter(menuItem=>{
        return menuItem.id === Number(itemId)
    })[0]
    arrayOfOrders.push({
        name:`${exactItem.name}`,
        price:exactItem.price
    })
}

function renderOrder(){
    const orderHtml=arrayOfOrders.map((order,index)=>{
        return `<div class="your-order">
        <div class="order-label">
            <p>${order.name}</p>
            <button class="remove-btn" data-remove="${index}">remove</button>
        </div>
        <p class="order-price">$${order.price}</p>
    </div>`
    }).join("")
    document.getElementById("order-container").innerHTML=orderHtml
}

function totalPrice(){
    const OrderTotalPrice=arrayOfOrders.reduce((total,currentValue)=>total+currentValue.price,0)
    document.getElementById("order-total-price").innerText=`$${OrderTotalPrice}`
}

function removeOrder(itemIndex){
    arrayOfOrders.splice(itemIndex,1)
    totalPrice()
    renderOrder()
    if(!arrayOfOrders.length){
        document.getElementById("order-section").style.display="none"
    }
}

function renderMenu(){
    const menuHtml=menuArray.map(item=>{
        return`<div class="item">
                <p class="emoji">${item.emoji}</p>
                <div class="description-container">
                    <div class="description">
                        <p class="item-name">${item.name}</p>
                        <p class="item-ingredients">${item.ingredients}</p>
                        <p class="item-price">$${item.price}</p>
                    </div>
                    <button id="add-btn" class="add-btn" data-add="${item.id}">+</button>
                </div>
        </div>`
    }).join("")
    document.getElementById("items-menu").innerHTML=menuHtml
}
renderMenu()