let main=document.getElementById("main")
let updateid=document.getElementById("pid")
let updatetitle=document.getElementById("title")
let updateimg=document.getElementById("imgurl")
let updateidbrand=document.getElementById("brand")
let updatcategory=document.getElementById("category")
let updateprice=document.getElementById("price")
let updatecolor=document.getElementById("color")
let updaterating=document.getElementById("rating")
let updategender=document.getElementById("gender")
let updatebtn=document.getElementById("update")
let edit=document.getElementById("addproduct")
let editid=document.getElementById("eid")
let edittitle=document.getElementById("etitle")
let editimg=document.getElementById("eimgurl")
let editbrand=document.getElementById("ebrand")
let editcategory=document.getElementById("ecategory")
let editprice=document.getElementById("eprice")
let editcolor=document.getElementById("ecolor")
let editrating=document.getElementById("erating")
let editgender=document.getElementById("egender")
let paggination=document.getElementById("paggination")



let box=document.getElementById("editform")



fetchdata()
async function fetchdata(pagenumber){
    try {
      let res1=await fetch(`https://snapzone-api.onrender.com/product`)
      let data1 =await res1.json()
      console.log(data1.length) 
        let res=await fetch(`https://snapzone-api.onrender.com/product?_limit=12&_page=${pagenumber}`)
        let totalbutton=Math.ceil(data1.length/12)
        paggination.innerHTML=""
       for(let i=1;i<=totalbutton;i++){
         paggination.append(pagginationbtn(i))
       }
       
        let data =await res.json()
        console.log(data.length) 
        display(data)
    } catch (error) {
        console.log(error)
    }
}



let mdiv=document.getElementById("card")
function display(data){
    mdiv.innerHTML=""
    data.forEach(element => {
        let div=document.createElement("div")
        div.setAttribute("class","incard")
        let img=document.createElement("img")
        img.setAttribute("src",element.image)
        let p=document.createElement("p")
        p.innerText=element.title
        let h=document.createElement("h3")
        h.innerText="Rs."+element.price
        let bdiv=document.createElement("div")
        bdiv.setAttribute("class","butdiv")
        let button1=document.createElement("a")
        button1.setAttribute("class","card-link")
        button1.setAttribute("href","#")
        button1.setAttribute("data-id",element.id)
        button1.innerText="Edit"
        button1.setAttribute("id", "showModal")
        let button2=document.createElement("button")
        button2.setAttribute("class","del")
        button2.innerText="Delete"
        button1.addEventListener("click",()=>{
            let editLinks = document.querySelectorAll(".card-link");
            for (let editLink of editLinks) {
              editLink.addEventListener("click", (e) => {
                e.preventDefault();
                let currentId = e.target.dataset.id;
            //    console.log(currentId)
               populateEditForms(currentId);
              });
            }
          modal.style.display = "block";

        })

        // ====================
      //   button1.onclick = function () {
      //     modal.style.display = "block";
      // }

        // ===================================
        button2.addEventListener("click",async(e)=>{
            e.preventDefault()
                try {
                    let res=await fetch(`https://snapzone-api.onrender.com/product/${element.id}`,{
                        method:"DELETE",
                        headers:{
                            "Content-Type": "application/json" 
                        }
                    })
                    let data=await res.json()
                    alert(`${element.title} Product is Delete`)
                  fetchdata()
                   
                } catch (error) {
                    console.log(error)
                }
        })
        bdiv.append(button1,button2)
        div.append(img,p,h,bdiv)
        mdiv.append(div)
    });
}
function populateEditForms(currentId) {
   
    fetch(`https://snapzone-api.onrender.com/product/${currentId}`)
      .then((res) => res.json())
      .then((data) => {
        updateid.value = data.id;
        updatetitle.value = data.title;
        updateidbrand.value = data.brand;
        updatcategory.value = data.category;
        updateimg.value = data.image;
        updaterating.value = data.rating;
        updateprice.value = data.price;
        updategender.value = data.gender;
        updatecolor.value = data.color;
  
       
      });
  }

  updatebtn.addEventListener("click",async(e)=>{

    e.preventDefault()

    try {
        let obj={
          id: updateid.value ,
          title:updatetitle.value,
          image: updateimg.value,
          category: updatcategory.value,
          price:updateprice.value,
          color:updatecolor.value ,
          brand: updateidbrand.value,
          gender: updategender.value,
          rating:updaterating.value,
          flag:"false"
        }
        console.log(obj)
       let res=await  fetch(`https://snapzone-api.onrender.com/product/${obj.id}`,{

          method:"PUT",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(obj)
        })
        let data=await res.json()
        alert(`${obj.title} is Update`)
        fetchdata()
      
  } catch (error) {
    console.log(error)
  }
  setTimeout(() => {
    modal.style.display="none"
  },);
 
  })
edit.addEventListener("click",async()=>{
    try {
      let id=editid.value
    let title=edittitle.value
    let image=editimg.value
  let brand=editbrand.value
  let category=editcategory.value
  let price=editprice.value
  let color=editcolor.value
  let rating=editrating.value
  let gender=editgender.value

  let obj={
    id:id,
    title:title,
    image:image,
    brand:brand,
    category:category,
    price:price,
    color:color,
    rating:rating,
    gender:gender,
    flag:"false"
  }
  console.log(obj)
  let res=await fetch("https://snapzone-api.onrender.com/product",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(obj)
  })
  let  data=await res.json()
  fetchdata()
  alert("New Product added")

    } catch (error) {
      console.log(error)
    }
  
})

function pagginationbtn(n){
 
  
  let btn=document.createElement("button")
  btn.setAttribute("class","pagination-button")
  btn.setAttribute("data-page-number",n)
   btn.setAttribute("data-id",n)
    btn.innerText=n

  btn.addEventListener("click",(e)=>{
     let page=e.target.dataset.id
    // console.log(page)
    fetchdata(page)
  })
  return btn

}




// ===================================
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

