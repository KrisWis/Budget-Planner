async function send_note(note_text) {
    // Отправляет заметку на сервер.

    let responseRequest = await fetch('api/create-note', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: note_text }) // Преобразует значение в строку JSON.
    });
    if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299

    } else {
        console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
    }
}

async function get_notes() {
    // Получает список заметок с сервера, а так же отрисовывает их.

    let responseRequest = await fetch('api/get-notes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299
        notes = await responseRequest.json();
        notes_container = document.getElementById('notes-container');
        notes_container.innerHTML = '';

        notes.forEach(note => {
            note_text = note["Text"];
            note_id = note["ID"];

            // note with delete button
            note_div = document.createElement('div');
            note_div.innerHTML = note_text;
            note_div.style = 'border: 1px solid black; padding: 5px; margin: 5px;';
            note_div.id = note_id;

            delete_button = document.createElement('button');
            delete_button.innerHTML = 'Удалить';

            delete_button.addEventListener('click', async function () {

                let responseRequest = await fetch('api/delete-note', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: note_id }) // Преобразует значение в строку JSON.
                });
                if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299
                    // Обновляем список заметок после удаления.
                    get_notes();
                } else {
                    console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
                }
            });

            note_div.appendChild(delete_button);

            notes_container.appendChild(note_div);
        });
    } else {
        console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    get_notes();

    note_button = document.getElementById('note-button');
    note_textbox = document.getElementById('note-textbox');

    note_button.addEventListener('click', function () {
        send_note(note_textbox.value);

        // Перезагружаем список заметок после отправки новой.
        // Этого можно не делать, но в ином случае юзер не увидит изменения.
        get_notes();
    });
});