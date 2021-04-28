console.log("Lekela Ku Flatter")

let add_to_cart_btns = document.getElementsByClassName('btn-primary') // get  add to card  button

// tag name of the body instead to append our dynamic data 
let main_container = document.getElementsByTagName('tbody')[0] // tagname may return multiple body we just grab the first one 


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


}