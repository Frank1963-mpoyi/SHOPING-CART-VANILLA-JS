console.log("Lekela Ku Flatter")

let add_to_cart_btns = document.getElementsByClassName('btn-primary') // get  add to card  button

// new1 tag name of the body instead to append our dynamic data 
let main_container = document.getElementsByTagName('tbody')[0] // tagname may return multiple body we just grab the first one 

// new2 get access to quantity field 
let quantity_fields = document.getElementsByClassName('num')

// new4 removing the items
let removeBtns = document.getElementsByClassName('uk-button-danger')







// there is one button class to click for a lot of items I must iterate through to keep each one of you 
for(let i = 0; i<add_to_cart_btns.length; i++){ // it will loop until the condition is false 
    add_to_cart_btns[i].addEventListener('click', addToCart)// the addToCart is a called function we must defined it
    //this will grab all the button

}

function addToCart(event){//the function the an argument 
    let btn = event.target // the btn variable will target every button but will not differencie them 
    console.log(btn)

    // now here we want to get the item for the partiular button
    let btn_parent = btn.parentElement // the btn variable target his parent div whis is <div class="card-body">
    console.log(btn_parent)// here er get the parent 

    let btn_grandparent = btn.parentElement.parentElement //<div class="card" style="width: 18rem;"> this is grand parent
    console.log(btn_grandparent)

    // 1.
    // Now getting the particular item
    // Note : name, price and button are in the same parent card-body
    //  now we need to get item name and item price
    // let itemName = btn_parent.children[0] // the first child of the parent card-body is name that why parent.child[0]
    let itemName = btn_parent.children[0].innerText // if you do inner text you will get a context not a full div 
    
    console.log(itemName)

    // 2. 
    // we doing the same thing with the price
    let itemPrice =  btn_parent.children[1].innerText// the price is in the index 1  from is parent card-body


    // get item image is 
    //  image is inside of the grand parent 

    let itemImage =  btn_grandparent.children[0].src //image is item 1 in card parent and grand parent of name and price 


    // new1
    // here we remplace the items we extract above in the appropriate section dynamically
    let itemContainer = document.createElement('tr')
    itemContainer.innerHTML = `
    
    <td><input class="uk-checkbox" type="checkbox"></td>
    <td><img class="uk-preserve-width uk-border-circle" src="${ itemImage }" width="40"></td>
    <td class="uk-table-link" >
        <h3 class="item-name"> ${itemName}</h3>
    </td>
    <td class="uk-text-truncate item-price"><h3>${itemPrice}</h3></td>
    <td><input type="number" class="num" value="1"></td>
    <td class="uk-text-truncate total-price"><h3>${itemPrice}</h3></td>
    <td><button class="uk-button uk-button-danger" type="button">Remove</button></td>

    `
    main_container.append(itemContainer)// here we append this dynamic text to the body table raw


    // new2 
    // we must loop throught beacuse its a list of quantity with different products
    for(let i = 0; i<quantity_fields.length; i++){ 
        quantity_fields[i].addEventListener('change', updateTotal)// we must define the function below
       

    }

    // new3 
    // the function will be called after add to cart
    grandTotal()

        
    // new 4 looping through the buttons
    //  we put this loop in add to card function because the remove button is not outside is only operate if we add card
    for(let i = 0; i < removeBtns.length; i++){ 
        removeBtns[i].addEventListener('click', removeItem)
        

    }

}

// new2  here we must defined the function we call above 
// any event listerner as a default parameter called event
function updateTotal(event){
    number_of_items = event.target // fetch each of the quantity field
    // get parent element of the quantity field
    number_of_items_parent =  number_of_items.parentElement.parentElement // parentElement twice mean parent and grand parent
     // fetch the price field
    price_field = number_of_items_parent.getElementsByClassName('item-price')[0] // it the first element in the parent field which is called : number_of_items_parent that why its [0]
    total_field = number_of_items_parent.getElementsByClassName('total-price')[0] 
    // price_field_content = price_field.children[0].innerText
    // dont need dollard at front
    price_field_content = price_field.children[0].innerText.replace('$', '')// it replace dollard to empty string
    console.log(price_field_content)

    // total_field.children[0].innerText = number_of_items.value * price_field_content

    // append dollar sign again 
    total_field.children[0].innerText ='$' + number_of_items.value * price_field_content

    // 
    if (isNaN(number_of_items.value) || number_of_items.value <=0){
        number_of_items.value = 1
    }

    // new3
    // update price must also updateing grand total by calling it here 
    grandTotal()

}

// new3 grand Total function
function grandTotal(){
    let total = 0
    // let grap grand-total class to be append
    let grand_total = document.getElementsByClassName('grand-total')[0] //[0] means must be the only and unique class
    let total_price = document.getElementsByClassName('total-price')
    for(let i = 0; i< total_price.length; i++){
        total_price_content = Number(total_price[i].innerText.replace('$', ''))// convert to a number
        total += total_price_content
    }

    grand_total.children[0].innerText =  '$' + total //grand_total.children[0] is (<h3> is child of the grand-total class)
    grand_total.children[0].style.fontWeight = 'bold'
}

// new 4 let creation a function for remove to cart
function removeItem(event){
    remove_btn = event.target // is targetting each of the button when it clicked 
    remove_btn_grandparent = remove_btn.parentElement.parentElement
    remove_btn_grandparent.remove()

    // we call grand total here bcz we want grand total to be also removed
    grandTotal()
}