import cheerio from 'cheerio';

const fetchModule = await import('node-fetch');
const fetch = fetchModule.default;

export async function obtenerPuntajes(id) {
    const url = `https://consultaweb.ant.gob.ec/PortalWEB/paginas/clientes/clp_grid_citaciones.jsp?ps_tipo_identificacion=CED&ps_identificacion=${id}`;

    return fetch(url)
        .then(response => response.text())
        .then(html => {
            const $ = cheerio.load(html);
            const secondTable = $('table').eq(1).html();
            const nombre = $(secondTable).find('td').eq(0).text();
            const puntuacion = $(secondTable).find('td').eq(2).text();

            const result = {
                nombre: nombre,
                puntuacion: puntuacion
            };

            return (result);
        })
        .catch(error => {
            console.error(error);
        });
}
