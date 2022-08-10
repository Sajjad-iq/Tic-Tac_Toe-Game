var turn = "o"




function clickk(id) {
    let div = document.getElementById(id)
    var winArray = ["celling0", "celling1", "celling2", "celling3", "celling4", "celling5", "celling6", "celling7", "celling8", "celling9", "celling10"];

    if (turn === "x" && div.innerHTML == '') {
        div.innerHTML = "X"
        turn = "o"
    }
    else if (turn === "o" && div.innerHTML == '') {
        div.innerHTML = "O"
        turn = "x"
    }

}





