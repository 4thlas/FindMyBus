$(document).ready(async function(){

    async function getLinesInfo()
    {
        try
        {
            const response = await fetch('https://www.zditm.szczecin.pl/api/v1/lines');
            if (!response.ok) throw new Error('Response is invalid');

            const data = await response.json();
            return data;
        }
        catch(error)
        {
            console.error(error);
            return 1;
        }
    }

    async function getVehiclesInfo()
    {
        try
        {
            const response = await fetch('https://www.zditm.szczecin.pl/api/v1/vehicles');
            if (!response.ok) throw new Error('Response is invalid');

            const data = await response.json();
            return data;
        }
        catch(error)
        {
            console.error(error);
            return 1;
        }
    }

    function setup(lines_data)
    {
        let select = $("#line-select");
        let table = $("#table-body");

        lines_data.forEach(line => {
            select.append(`<a class="text special line-number-grid-box" id="${line.number}"> ${line.number} </a>`);
        });
    }


    let lines = await getLinesInfo();
    let vehicles = await getVehiclesInfo();
    lines = lines.data;
    vehicles = vehicles.data;

    console.log(lines);
    console.log(vehicles);

    setup(lines);

    $(".line-number-grid-box").click(function(){window.location.replace(`?id=${this.id}`);})
    
    const map = L.map('map').setView([53.428, 14.552], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
    }).addTo(map);

    $("#test").click(function(){
        $("#stats-menu").toggleClass("closed")
    });

    // $('#line-table').DataTable({
    //     searching: true,
    //     ordering: true,
    // });

    $(".line-select-row").click(function(){
        window.location.replace(`?id=${this.id}`);
    });
    
});