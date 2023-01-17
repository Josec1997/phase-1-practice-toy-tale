let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
})});


fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then (toy => toy.forEach(toy => {
    createToyCard(toy)
  }))


  function createToyCard(toy) {
    let div =document.createElement('div')
    div.className= 'card'

  let h2 = document.createElement('h2')
  h2.innerText= toy.name 

  let img = document.createElement('img')
    img.src= toy.image
    img.className = 'toy-avatar'

  let p = document.createElement('p')
  p.innerText=`${toy.likes} like(s)`

  let btn = document.createElement('button')
    btn.className= 'like-btn'
    btn.id= toy.id
    btn.innerText= 'like'
    btn.addEventListener('click', () =>{
      toy.likes +=1
      p.innerText=`${toy.likes} like(s)`
      patchToy(toy)
    })
    div.appendChild(btn)
    

  let toyCollection = document.querySelector('#toy-collection')
    div.append(h2,img,p,btn)
    toyCollection.append(div)

  }

  let submitToy = document.querySelector('form')
    submitToy.addEventListener('submit',createNewToy )
    function createNewToy(e) {
      e.preventDefault()

      let newToy = {
      'name': e.target.name.value,
      'image': e.target.image.value,
      'likes': 0 ,
    }
    submitNewToy(newToy)
  }

    function submitNewToy(newToy) {
      fetch('http://localhost:3000/toys', {
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
          Accept: 'application/json'
        },
        body:JSON.stringify(newToy)
      })
      .then(r => r.json())
      .then((data) => createToyCard(data))
}

    function patchToy(toy){
      fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json',
        Accept:'application/json',
      },
      body: JSON.stringify(toy),
      })
     
}