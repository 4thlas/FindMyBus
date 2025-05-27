$(document).ready(function(){

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

    getLinesInfo().then(data => console.log(data));

});