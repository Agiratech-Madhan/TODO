const form = document.getElementById('my_form');
let listArr = JSON.parse(localStorage.getItem("TODO")) || [];
form.addEventListener("submit", function submitform(event) {
    event.preventDefault();
    let a_input = document.forms["myForm"]["formname"].value;

    let numCheck = RegExp(/^[0-9]/);
    let num_reg = numCheck.test(a_input)
    console.log("checkreg", num_reg);
    if (a_input == "" || num_reg) {
        alert("should not empty value");
        return false;
    }
    else {
        createList(a_input);
        form.reset();
        function createList(text) {
            listArr.push({ name: text, status: false });
            // localStorage.setItem("TODO", JSON.stringify(listArr));
            display(listArr);
        }
    }
});

let Result = document.getElementById("_count");
// let listArr=[];
let myList = '';
let tab_body = document.getElementById('tabBody')

let _searchitems = document.getElementById("searchitem")
var dateObj = new Date();
var month = dateObj.getUTCMonth();
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
let newdate = day + "/" + month + "/" + year;
var xy = [];

function display(values, sortArr) {
    console.log("len of local", localStorage.length);
    if (listArr.length >= 0) {
        s = document.getElementById("select_items");
        var x = s.selectedIndex;
        console.log("before index", x);
        s.addEventListener('change', () => {
            x = s.selectedIndex;
            displayorg(x);
        });
        console.log("after change", x);

        displayorg(x);
        function displayorg(x) {
            if (x == 0 || x == 1 || x == 2) {
                let my_list = '';
                let temp = sortArr ? sortArr : listArr;
                // let tabs_active = document.getElementById("tabs");
                if (x == 0) {
                    let temp = sortArr ? sortArr : listArr;
                }
                if (x == 1) {
                    temp = sortArr ? sortArr.filter(e => { return !e.status }) : listArr.filter(e => { return !e.status });

                }
                if (x == 2) {
                    temp = sortArr ? sortArr.filter(e => { return e.status }) : listArr.filter(e => { return e.status });

                }
                temp.map((data, index) => {

                    my_list += data['status'] ?

                        `<ul class="maincontent">
                         <li class="stripe">
                             <input type="checkbox"onclick=handleclick(this) checked value=${index} id="c_check">
                             <span  >`+ data['name'] + `</span>
                             <i class="fa fa-trash" aria-hidden="true" onclick="remove_list(${index})" id="dicon"></i>
                         </li>
                         <li><hr style="margin:1px 18px 2px 18px;"id=hr_c></li>
                         <li id="bydate"><p>Created by `+ newdate + `</p></li>
         
                     </ul>`
                        :
                        `<ul class="maincontent">
                         <li>
                             <input type="checkbox" onclick=handleclick(this)  value=${index} id="c_check">
                             <span>`+ data['name'] + `</span>
                             <i class="fa fa-trash" aria-hidden="true" onclick="remove_list(${index})" id="dicon"></i>
                         </li>
                         <li><hr style="margin:1px 18px 2px 18px;"id=hr_c></li>
                         <li id="bydate"><p>Created by `+ newdate + `</p></li>
     
                     </ul>`;


                })

                tab_body.innerHTML = my_list;


            }
        }
    }
    // localStorage.setItem("TODO",JSON.stringify(listArr));
    // console.log("listArray", listArr);
    localStorage.setItem("TODO",JSON.stringify(listArr));

}


function handleclick(check) {
    if (check.checked) {
        listArr[check.value]['status'] = true;
        check.parentNode.classList.add("stripe");
        check.classList.add("c_color");
        localStorage.setItem("TODO",JSON.stringify(listArr));

        //   let hr=document.getElementsByTagName("hr");
        // document.getElementById("hr_c").style.border = " dotted";
    }
    else {
        listArr[check.value]['status'] = false;
        check.parentNode.classList.remove("stripe");
        check.classList.add("c_color");
        // document.getElementById("hr_c").style.border = "1px solid bla ";
        localStorage.setItem("TODO",JSON.stringify(listArr));

    }
}

function remove_list(index) {

    let del_task = JSON.parse(localStorage.getItem("TODO"));
    del_task.splice(index, 1);
    localStorage.setItem("TODO", JSON.stringify(del_task));




    console.log(index);

    // listArr.splice(localStorage.TODO[index],1);
    listArr.splice(index, 1);

    display(listArr);
}
function clear_all() {

    listArr = [];

    display(listArr);

}

function search_list() {
    var search_input, filter_key, i;
    // let a_input = document.forms["myForm"]["formname"].value;

    // search_input = document.getElementById("searchitem");
    filter_key = document.forms["myForm"]["formname"].value.toLowerCase();
    let filtered_items = listArr.filter((key) => {
        key = key['name'].toLowerCase();
        return key.indexOf(filter_key) > -1;
    });
    display(null, filtered_items);
    // form.reset();
}
// if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
//     console.log("This page is  reloaded");
//     display(listArr);
//     //   console.log("reload",listArr_reload);
// } else {
//     console.log("This page is not reloaded");
// }
function reload(){
    display(listArr);
}   