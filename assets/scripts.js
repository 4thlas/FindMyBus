$(document).ready(async function(){

    // Fetch all lines info
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

    // Fetch all vehicles info
    async function getVehiclesInfo(wanted_line = null)
    {
        try
        {
            const response = await fetch('https://www.zditm.szczecin.pl/api/v1/vehicles');
            if (!response.ok) throw new Error('Response is invalid');

            let all_vehicles = await response.json();
            all_vehicles = all_vehicles.data;
            let matching_vehicles = [];
            let vehicles_models = [];

            if (wanted_line)
            {
                all_vehicles.forEach(vehicle => {
                    if (vehicle.line_number == wanted_line)
                    {
                        matching_vehicles.push(vehicle);
                        vehicles_models["models"].push(vehicle.model);
                    }
                });

                return matching_vehicles;
            }
            else return all_vehicles;
        }
        catch(error)
        {
            console.error(error);
            return 1;
        }
    }

    function countOccurs(array){
        let result = [];

        for(let i = 0; i < array.length; i++)
        {
            // TODO
        }
    }

    // Print line select menu
    function printLineSelectGrid(lines_data)
    {
        let select = $("#line-select");

        lines_data.forEach(line => {
            select.append(`<a class="text special line-number-grid-box" id="${line.number}"> ${line.number} </a>`);
        });
    }
    
    // Print info about lines and its vehicles
    function printGenInfo(line)
    {
        let type_display = $("#line-type-display");
        let subtype_display = $("#line-subtype-display");
        let veh_type_display = $("#line-veh-type-display");

        type_display.html(line.type);
        subtype_display.html(line.subtype);
        veh_type_display.html(line.vehicle_type);
    }

    function printVehiclesTable(vehicles)
    {
        vehicles_table.clear().draw(); // Clear table

        if (vehicles.length > 0)
        {
            vehicles.forEach(vehicle => {
                vehicles_table.row.add([
                    vehicle.vehicle_id,
                    vehicle.vehicle_model,
                    vehicle.next_stop,
                    vehicle.punctuality
                ]).draw();
            });
        }
    }

    function printVehiclesChart(vehicles)
    {

    }

    // Update displayed line and vehicle info
    function updateDisplay(vehicles)
    {
        printVehiclesTable(vehicles);
        // printVehiclesChart(vehicles);
    }

    const map = L.map('map').setView([53.428, 14.552], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
    }).addTo(map);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const selected_line_nr = urlParams.get('line');

    var all_lines = await getLinesInfo();
    var line_vehicles = await getVehiclesInfo(selected_line_nr);
    var selected_line = await getLinesInfo(selected_line_nr);

    console.log(selected_line);
    console.log(all_lines);
    console.log(line_vehicles);

    var vehicles_table = $("#vehicle-table").DataTable({
        paging: false,
        info: false,
        searching: false,
        ordering: true
    });

    const ctx = document.getElementById('vehicle-chart').getContext('2d');

    const canvas = document.getElementById('vehicle-chart');
    
    const chart_column_gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    chart_column_gradient.addColorStop(0, '#08071a');
    chart_column_gradient.addColorStop(1, '#111136');

    const chart_border_gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    chart_border_gradient.addColorStop(0, '#ff3300');
    chart_border_gradient.addColorStop(1, '#ffd000');

    const vehicle_chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: chart_column_gradient,
                borderColor: chart_border_gradient,
                borderWidth: 3
                
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#ffffff' // red text for X axis labels
                    },
                    grid: {
                        color: '#8b8b8b' // 🔴 vertical grid lines (x-axis)
                    }
                },
                x: {
                    ticks: {
                        color: '#ffffff'
                    },
                }
            }
        }
    });

    printLineSelectGrid(all_lines);
    printGenInfo(selected_line);

    updateDisplay(line_vehicles);
    setInterval(async function(){
        line_vehicles = await getVehiclesInfo(selected_line_nr);
        selected_line = await getLinesInfo(selected_line_nr);
        updateDisplay(line_vehicles);
    }, 5000);

    $(".line-select-row").click(function(){
        window.location.replace(`?id=${this.id}`);
    });

    $(".line-number-grid-box").click(function(){window.location.replace(`?line=${this.id}`);})
});