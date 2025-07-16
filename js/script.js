var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submitBtn = document.getElementById("submitBtn");
var updateBtn = document.getElementById("updateBtn");
var tableData = document.getElementById("tableData");
var searchInput = document.getElementById("searchInput");
var bookmarkList;
if (localStorage.getItem("bookmarks") == null) {
    bookmarkList = [];
} else {
    bookmarkList = JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmark(bookmarkList);
}

function addBookmark() {
    if (siteName.value == "" || siteUrl.value == "") {
        const modal = new bootstrap.Modal(document.getElementById("modal"));
        modal.show();
        return;
    }
    var bookmark = {
        siteName: siteName.value,
        siteUrl: siteUrl.value,
    };
    bookmarkList.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
    displayBookmark(bookmarkList);
    clearInputs();
}

function displayBookmark(arr) {
    var temp = "";
    for (var i = 0; i < arr.length; i++) {
        temp += `
                <tr>
                        <td class="text-center position-relative" ><span class="index">${i + 1}</span></td>
                        <td class="text-center">${arr[i].siteName}</td>
                        <td class="text-center">
                                <button class="btn btn-success mx-auto" onclick="visitSite(${i})">
                                <i class="fa-regular fa-eye me-2"></i>Visit</button>
                        </td>
                        <td class="text-center">
                                <button class="btn btn-danger  mx-auto " onclick="deleteRow(${i})"><i
                                class="fa-solid fa-trash-can me-2"></i>Delete</button>
                        </td>
                        <td class="text-center">
                                <button class=" border-0 bg-transparent icon-link-hover w-25" onclick="editBookmark(${i})"><i class="fa-regular fa-pen-to-square"></i></button>
                        </td>
                </tr>
                `;
    }
    tableData.innerHTML = temp;
}

function deleteRow(index) {
    bookmarkList.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
    displayBookmark(bookmarkList);
}

function clearInputs() {
    siteName.value = "";
    siteUrl.value = "";
}

function visitSite(index) {
    window.open("http://" + bookmarkList[index].siteUrl,"_blank");
}

function searchBookmarks(value) {
    searchArr = [];
    for (var i = 0; i < bookmarkList.length; i++) {
        if (bookmarkList[i].siteName.toLowerCase().includes(value.toLowerCase())) {
            searchArr.push(bookmarkList[i]);
        }
    }
    displayBookmark(searchArr);
}

var editIndex = -1;
function editBookmark(index) {
    editIndex = index;
    siteName.value = bookmarkList[index].siteName;
    siteUrl.value = bookmarkList[index].siteUrl;

    submitBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
}

function updateBookmark() {
    var editBookmark = {
        siteName: siteName.value,
        siteUrl: siteUrl.value,
    };
    bookmarkList[editIndex] = editBookmark;
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
    displayBookmark(bookmarkList);
    submitBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    clearInputs();
}
