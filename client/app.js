$(document).ready(() => {
    fetchChirps();

    $("#form-container").submit((e) => {
        e.preventDefault();
        $.ajaxSetup({
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });

        const dataObj = {
            user: $("#usernameInput").val(),
            message: $("#messageInput").val()
        };

        $.post('/api/chirps/', JSON.stringify(dataObj));
        fetchChirps();
        $("#usernameInput").empty();
        $("#messageInput").empty();
    });
});

const fetchChirps = () => {
    $('#chirps-container').empty();
    $.get('/api/chirps/', (chirps) => {
        delete chirps.nextid;
        let writeArr = Object.entries(chirps);
        writeArr.reverse();
        writeArr.forEach(chirp => {
            $('#chirps-container').append(
                `<div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${chirp[1].user}</h5>
                        <p class="card-text">${chirp[1].message}</p>
                        <button type="button" class="btn btn-sm btn-secondary icon" id="delete-icon" onclick=deleteChirp(${chirp[0]})>Delete</button>
                        <button type="button" class="btn btn-sm btn-secondary icon" id="edit-icon" data-toggle="modal" data-target="#modal${chirp[0]}">Edit</button>
                    </div>
                </div>
                <div class="modal fade" id="modal${chirp[0]}" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Edit chirp</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <h3 id="chirp-user${chirp[0]}">${chirp[1].user}</h3>
                                <textarea id="edit-message${chirp[0]}" class="form-control" rows="3">${chirp[1].message}</textarea>
                            </div>
                            <div class="modal-footer">
                                <button onclick="editChirp(${chirp[0]}, '${chirp[1].user}', $('#edit-message${chirp[0]}').val())" type="button" class="btn btn-primary">Save changes</button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>`
            );
        })
    });
}

const deleteChirp = id => {
    $.ajax({
        url: `/api/chirps/${id}`,
        method: 'delete',
        success: function (result) {
            console.log(result);
        }
    });
    fetchChirps();
}

const editChirp = (id, user, chirp) => {
    $.ajaxSetup({
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    const data = {
        user: user,
        message: chirp
    }

    $.ajax({
        url: `/api/chirps/${id}`,
        method: 'put',
        data: JSON.stringify(data),
        success: function (result) {
            console.log(result);
        }
    });
    $(`.modal-backdrop`).remove();
    fetchChirps();
}
