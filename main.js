import { getTotalCasesByDate } from './utils.js'

    function totalCasesChart(data, ctx){
        const {
            confirmed,
            deaths,
            recovered,
        } = data
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: confirmed.map(item => new Intl.DateTimeFormat('es-PE', { month: 'long', day: 'numeric'}).format(new Date(item.date))),
                datasets: [
                    {
                        label: 'Muertes',
                        borderColor: 'red',
                        data:  deaths.map(item => item.cases),
                    },
                    {
                        label: 'Recuperados',
                        borderColor: 'green',
                        data:  recovered.map(item => item.cases),
                    },
                    {
                        label: 'Confirmados',
                        borderColor: 'orange',
                        data:  confirmed.map(item => item.cases),
                    }
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                        gridLines: {
                            display:false,
                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Casos de Coronavirus(COVID-19) en el mundo',
                    fontSize:20,
                    padding: 30,
                    fontColor: 'blue',
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        boxWidth: 15,
                        fontFamily: 'system-ui',
                        fontColor:'black',
                    }
                },
                tooltips: {
                    backgroundColor: '#0584f6',
                    titleFontSize: 15,
                    xPadding: 20,
                    ypadding: 20,
                    bodyFontSize: 15,
                    bodySpacing: 10,
                    mode: 'x',
                },
                layout: {
                    padding: {
                        right: 50,
                    }
                },
                elements: {
                    line: {
                        borderWidth: 1,
                        fill: false,
                    },
                    point: {
                        radius: 2,
                        borderWidth: 2,
                        backgroundColor: 'white',
                        hoverRadius: 8,
                        hoverBorderWidth: 4,
                    }
                }
            }
        })
    }

    async function renderCharts() {
        const ctx = document.querySelector('#chart').getContext('2d')
        const data = await getTotalCasesByDate()
        totalCasesChart(data, ctx)
    }
    renderCharts()