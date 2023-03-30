let ProductData = JSON.parse(localStorage.getItem("card-data")) || [];
let Container = document.getElementById("Mens-Data");

async function FetchData(){
    try{
        let request = await fetch("https://snapzone-api.onrender.com/product");
        request = await request.json();
        //console.log(request);
        Display(request);
    }catch(error){
        console.log(error);
    }
}
FetchData();

function Display(data){
    Container.innerHTML = "";
    data.forEach((product) => {
       if(product.gender=="men"){
        let card = document.createElement("div");
        let title = document.createElement("p");
        let image = document.createElement("img");
        let pdiv=document.createElement("div")
        pdiv.setAttribute("class","pridiv")
        let price = document.createElement("s");
        price.style.color="gray";
        let dprice = document.createElement("h4");
        let rating = document.createElement("p");
        rating.setAttribute("class","rat")
        let addcarddiv=document.createElement("div")
        addcarddiv.setAttribute("class","addcarddiv")
        let add_to_card = document.createElement("button")
        let buy = document.createElement("button")
        
            //console.log(data)
            add_to_card.textContent = "Add to Bag";
            buy.textContent = "Buy";
            title.textContent = product.title;
            image.src = product.image;
            let disprice=(product.price*15)/100;
            let dp=product.price-disprice
            price.textContent = `Rs. ${product.price}`;
            dprice.textContent = `Rs. ${dp}`;

            let n=Math.floor(product.rating)
            let bag=""
            for(let i=0;i<n;i++){
                bag+="⭐"
            }
            rating.textContent =bag;


            add_to_card.addEventListener("click",() =>{
            if(checkOrder(product)){
            alert("Product Already in Card");
            }else{
            ProductData.push({...product,quantity:1});
            localStorage.setItem("card-data",JSON.stringify(ProductData))
            alert("Product Added");
            }
        });
        pdiv.append(price,dprice)
        addcarddiv.append(buy,add_to_card)
        card.append(image,title,pdiv,rating,addcarddiv)
        Container.append(card);
       }
    });
}

function checkOrder(product){
    for(let x=0; x<ProductData.length; x++){
        if(ProductData[x].id === product.id){
            return true
        }
    }
    return false
}