var allElems = document.querySelectorAll(".elem");
var allFullElems = document.querySelectorAll('.fullElem');
var allFullElemsBackBtn = document.querySelectorAll('.fullElem .back');
// on clicking the elems each page should appear
allElems.forEach((elem) => {
    elem.addEventListener("click", () => {
        var id =elem.id
        allFullElems[id].style.display = 'block'
    })
})

allFullElemsBackBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        allFullElems[btn.id].style.display = 'none'
    })
})