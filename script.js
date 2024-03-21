let todolist = []
let input = document.querySelector('input')
let addbtn = document.querySelector('.btn-text')
let todolistelement = document.querySelector('.todo-list')
let carentcollor = "black"
let allcollor = document.querySelector('ul')
let allli = document.querySelectorAll('li')
function getdata () {
    let data = localStorage.getItem('Todolist')
    let converterdata = JSON.parse(data)
    if (converterdata) {
        todolist=converterdata
        render(todolist)
    }
}
function render (arry) {
    todolistelement.innerHTML = ''
    arry.forEach(element => {
        todolistelement.innerHTML += `                   <div class="todo-item" data-id='${element.id}'>
        <p class='${element.checked ? "checked" : ""}'>${element.text}</p>
        <div class="nav">
            <button class="delete">Delete</button>
            <button class="notice">Notice</button>
        </div>
    </div>`
    });
}
getdata()
addbtn.addEventListener('click', function () {
    if (input.value.length>1) {
  todolist.push({
    id: Date.now(),
    text:input.value,
    checked:false
  })

  render(todolist)
  input.value = ''
  savedata()
    }else {
        alert('Напишіть якись текст!')
    }
})
function savedata () {
    localStorage.setItem('Todolist', JSON.stringify(todolist))
}
todolistelement.addEventListener('click',function (event) {
   let clikeditem = event.target.closest('.todo-item')
   if (clikeditem) {
    let itemid = clikeditem.dataset.id
    let itemindex = todolist.findIndex(element=>element.id==itemid)
    if (event.target.closest('.delete')) {
       todolist.splice(itemindex,1)
       render(todolist)
       savedata()
    }
    if (event.target.closest('.notice')) {
     todolist[itemindex].checked=!todolist[itemindex].checked
     render(todolist)
     savedata()
    }
    if(event.target.closest('p')) {
        event.target.style.color = carentcollor
    }
   }
})
allcollor.addEventListener('click', function (event) {
    if(event.target.closest('li')) {
        allli.forEach(li=>{
            li.classList.remove("active")
        })
        carentcollor = event.target.dataset.color
        event.target.classList.add("active")
    }
})
