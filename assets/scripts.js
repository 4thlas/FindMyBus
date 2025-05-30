$(document).ready(async function(){

    async function getLinesInfo(wanted_line)
    {
        try
        {
            const response = await fetch('https://www.zditm.szczecin.pl/api/v1/lines');
            if (!response.ok) throw new Error('Response is invalid');

            let all_lines = await response.json();
            all_lines = all_lines.data;

            if(wanted_line)
            {
                const matchedLine = all_lines.find(line => line.number == wanted_line);
                return matchedLine;
            }
            else return all_lines;
        }
        catch(error)
        {
            console.error(error);
            return 1;
        }
    }

    async function getVehiclesInfo(selected_line = null)
    {
        try
        {
            const response = await fetch('https://www.zditm.szczecin.pl/api/v1/vehicles');
            if (!response.ok) throw new Error('Response is invalid');

            let all_vehicles = await response.json();
            all_vehicles = all_vehicles.data;
            let matching_vehicles = [];

            if (selected_line)
            {
                all_vehicles.forEach(vehicle => {
                    if (vehicle.line_number == selected_line)
                        matching_vehicles.push(vehicle);
                });
                return matching_vehicles.length == 1 ? matching_vehicles[0] : matching_vehicles;
            }
            else return all_vehicles;
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

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const selected_line_nr = urlParams.get('line');

    let all_lines = await getLinesInfo();
    let vehicles = await getVehiclesInfo(selected_line_nr);
    let selected_line = await getLinesInfo(selected_line_nr);

    console.log(selected_line);
    console.log(all_lines);
    console.log(vehicles);

    setup(all_lines);

    $(".line-number-grid-box").click(function(){window.location.replace(`?line=${this.id}`);})
    


    const map = L.map('map').setView([53.428, 14.552], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
    }).addTo(map);

    $(".line-select-row").click(function(){
        window.location.replace(`?id=${this.id}`);
    });
    
});