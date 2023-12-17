function openModal (id, table, color) {
    
    // document elements  
    const modal = document.getElementById('modal');
    const modalHeader = document.getElementsByClassName('modal__header')[0];
    const modalForm = document.getElementsByClassName('modal__wrapper')[0];
    const modalParent = modal.parentElement;

    // modal window data
   
    const userID = id.slice(0, id.length - 2);
    const user = document.getElementById(`${userID}_user`).textContent;
    const role = document.getElementById(`${userID}_role`).textContent;
    let department = "";


    if (document.getElementById(`${userID}_department`)) {
        department = document.getElementById(`${userID}_department`).textContent;
    } 
    

    function createModal (user, role, department, departmentDisplay, btnName, btnColor, action, deleteDisplay) {

        if (role === 'admin') {

            modalForm.innerHTML = `
            <form action="${action}" method="POST" class="modal__wrapper_form">

                <label class="modal__wrapper_label">
                    Użytkownik
                    <input class="modal__wrapper_input modal__wrapper_input-text" name="user" type="text" value="${user}" readonly>
                </label>

                <label class="modal__wrapper_label ${departmentDisplay}">
                    Dział
                    <input class="modal__wrapper_input modal__wrapper_input-text" name="department" type="text" value="${department}" readonly>
                </label>

                <label class="modal__wrapper_label displayNone">
                    <input class="modal__wrapper_input modal__wrapper_input-text" name="route" type="text" value="${table}" readonly>
                </label>

                <div class="modal__wrapper_form-radio">
                    <div class="modal__wrapper_form-radioItem ${deleteDisplay}">
                        <input class="modal__wrapper_input" type="radio" name="role" value="user">
                        <label>user</label>
                    </div>

                    <div class="modal__wrapper_form-radioItem ${deleteDisplay}">
                        <input class="modal__wrapper_input" type="radio" name="role" value="admin" checked>
                        <label>admin</label>
                    </div>
                </div>

                <button type="submit" class="modal__wrapper_btn w3-button ${btnColor}">
                    ${btnName}
                </button>

            </form>
            `;
        } else {

            modalForm.innerHTML = `
            <form action="${action}" method="POST" class="modal__wrapper_form">
    
                <label class="modal__wrapper_label">
                    Użytkownik
                    <input class="modal__wrapper_input modal__wrapper_input-text" name="user" type="text" value="${user}" readonly>
                </label>
    
                <label class="modal__wrapper_label ${departmentDisplay}">
                    Dział
                    <input class="modal__wrapper_input modal__wrapper_input-text" name="department" type="text" value="${department}" readonly>
                </label>

                <label class="modal__wrapper_label displayNone">
                    <input class="modal__wrapper_input modal__wrapper_input-text" name="route" type="text" value="${table}" readonly>
                </label>
    
                <div class="modal__wrapper_form-radio">
                    <div class="modal__wrapper_form-radioItem ${deleteDisplay}">
                        <input class="modal__wrapper_input" type="radio" name="role" value="user" checked>
                        <label>user</label>
                    </div>
    
                    <div class="modal__wrapper_form-radioItem ${deleteDisplay}">
                        <input class="modal__wrapper_input" type="radio" name="role" value="admin">
                        <label>admin</label>
                    </div>
                </div>


    
                <button type="submit" class="modal__wrapper_btn w3-button ${btnColor}">
                    ${btnName}
                </button>
    
            </form>
            `;
        }
    }

    modalParent.classList.remove("displayNone");
    modalParent.classList.add("displayBlock");

    // create modal window and user form
    if (table === 'unconfirmedUsers') {
        if (color == 1) {
            modalHeader.textContent = "Potwierdzenie konta";
            createModal(user, role, department, 'displayNone', 'Potwierdź konto', 'w3-teal', '/admin/adminConfirm', 'displayBlock');
        } else if (color == 0) {
            modalHeader.textContent = "Usunięcie konta";
            createModal(user, role, department, 'displayNone', 'Usuń konto', 'w3-deep-orange', '/admin/adminDelete', 'displayNone');
        }

    } else if (table === 'confirmedUsers') {
        if (color == 2) {
            modalHeader.textContent = "Zmiana konta";
            createModal(user, role, department, 'displayNone', 'Zmień konto', 'w3-amber', '/admin/adminUpdate', 'displayBlock');
        } else if (color == 0) {
            modalHeader.textContent = "Usunięcie konta";
            createModal(user, role, department, 'displayNone', 'Usuń konto', 'w3-deep-orange', '/admin/adminDelete', 'displayNone');
        }

    } else if (table === 'unconfirmedAccesses') {
        if (color == 1) {
            modalHeader.textContent = "Przyznanie uprawnień";
            createModal(user, role, department, 'displayBlock', 'Potwierdź dostęp', 'w3-teal', '/admin/adminConfirm', 'displayBlock');
        } else if (color == 0) {
            modalHeader.textContent = "Usunięcie uprawnień";
            createModal(user, role, department, 'displayBlock', 'Usuń dostęp', 'w3-deep-orange', '/admin/adminDelete', 'displayNone');
        }

    } else if (table === 'confirmedAccesses') {
        if (color == 2) {
            modalHeader.textContent = "Zmiana uprawnień";
            createModal(user, role, department, 'displayBlock', 'Zmień dostęp', 'w3-amber', '/admin/adminUpdate', 'displayBlock');
        } else if (color == 0) {
            modalHeader.textContent = "Usunięcie uprawnień";
            createModal(user, role, department, 'displayBlock', 'Usuń dostęp', 'w3-deep-orange', '/admin/adminDelete', 'displayNone');
        }
    };

}
