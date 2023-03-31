let ProductData = JSON.parse(localStorage.getItem("card-data")) || [];
let Container = document.getElementById("Mens-Data");

async function FetchData(){
    try{
        let request = await fetch("https://snapzone-api.onrender.com/product");
        request = await request.json();
        //console.log(request);
        Display(request);
        filterData2(request);
        menData(request);
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
            add_to_card.textContent = "Add To Cart";
            buy.textContent = "Buy Now";
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
            // rating.textContent =bag;
            rating.append(bag)
            
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
function menData(data){
    let trend= document.getElementById("trend")
    trend.addEventListener("click",()=>{
        data= data.filter((e)=>{
            if(e.category== "T-Shirt"){
                return e
            }
        })
        Display(data)
    })
}


function checkOrder(product){
    for(let x=0; x<ProductData.length; x++){
        if(ProductData[x].id === product.id){
            return true
        }
    }
    return false
}


// ---------------------------------- sort by --------------------------------------------

let priceSort = document.getElementById("select-tag");

priceSort.addEventListener("change",FetchPriceSort);

async function FetchPriceSort(){
    //sortBy = priceSort.value =="LTH" ? "asc" : "desc"
    console.log(priceSort.value);
    if(priceSort.value == 'Price Low To High'){
        try{
            let res = await fetch(`https://snapzone-api.onrender.com/product?_sort=price&_order=asc`)
            let responeee = await res.json()
            //console.log(responeee)
            Display(responeee)
        }catch (error){
            console.log(error);
        }
    }else if(priceSort.value == 'Price High To Low'){
        try{
            let res = await fetch(`https://snapzone-api.onrender.com/product?_sort=price&_order=desc`)
            let responeee = await res.json()
            //console.log(responeee)
            Display(responeee)
        }catch (error){
            console.log(error);
        }
    }
}

// ----------------------------- Price filter ----------------------------------------

function filterData2(request){

    let priceData = document.querySelectorAll('input[type=radio][name="PriceValue"]');
    function Pricefunction(event){
        let lower = -Infinity, upper = Infinity

        if(this.value == "ZeroToNinetynine"){
            lower=0, upper=90
        }else if(this.value=="oneHunderedToOneNininetynine"){
            lower=100, upper=199
        }else if(this.value=="twoHunderedToTowNininetynine"){
            lower=200, upper=299
        }else if(this.value=="threeHunderedToThreeNininetynine"){
            lower=300, upper=399
        }else if(this.value=="fourHunderedToFourNininetynine"){
            lower=400, upper=499
        }else if(this.value=="fiveHunderedToFiveNininetynine"){
            lower=500, upper=599
        }else if(this.value=="sixHunderedToSixNininetynine"){
            lower=600, upper=699
        }else if(this.value=="sevenHunderedToNineNininetynine"){
            lower=700, upper=999
        }else if(this.value=="oneThousandAbove"){
            lower=1000
        }

        let filterData = request.filter(element =>{
            let disprice=(element.price*15)/100;
            let dp=element.price-disprice
            return dp >= lower && dp <= upper;
        })
        Display(filterData)
    }
    Array.prototype.forEach.call(priceData, function(radio){
        radio.addEventListener("change",Pricefunction);
    })
}

