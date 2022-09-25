import * as readline from 'readline';
import fs from 'fs';
//interface
interface State {
    name: String;
    deaths: number;
    population: number;
}


const data = getData();

//read a csv file and convert csv to matrix
function getData(){
    return fs.readFileSync('../Ejercicio-L-gica-Smartsoft-Labs/time_series_covid19_deaths_US.csv', {
        encoding: 'utf-8'
    }).split('\n')
    .map((row: String): String[] => {
        return row.split(',');
    })
    .slice(1);
    
}

//get deaths for each state
function getNameState(data : Array<String>[]): Array<String>{
    //get the state names
    let statesname: Array<String> = [];
    data.forEach((row) => {
        //position 6 is the state name
        statesname.push(row[6]);
    })
    //delete duplicated data and reurn the array
    return statesname.filter((item, index) =>{
        return statesname.indexOf(item) == index;
    });
}

//function that groups the information by state
function getDataState(data : Array<String>[]) : Array<State> {

    let states: Array<State> = [];
    let stateNames: Array<String> = getNameState(data);
    //get the values of deaths
    stateNames.forEach((item)=>{
        let countDeath: number = 0;
        let countPopulation: number = 0;
        data.forEach((element) =>{
            if (item == element[6]){
                if(item == 'Guam' || item=='Virgin Islands' || item=='Grand Princess' || item == 'Northern Mariana Islands' || item=='American Samoa'){
                    countPopulation += Number(element[12]);
                }else {
                //the last position is the number of deaths
                countDeath += Number(element[element.length-1]);
                //the position 11 is the population
                countPopulation += Number(element[13])
                }
            }
        })
        states.push({name: item, deaths: countDeath, population: countPopulation});        
    })
    //return the array of states ordered by deaths (lower to higher)
    //console.table(states);
    return states.sort((a, b) => {
        return a.deaths - b.deaths;
    });
}

function general(){

    //states data
    let statesData: Array<State> = getDataState(data)

    //get the first questions (state with more deaths)
    let stateMoreDeaths: State = statesData[statesData.length - 1];
    //get the second questions (state with fewer deaths)
    let stateLessDeaths: State = statesData[0];
    //get the third questions (percentage of deaths vs population)
    let percentageDeaths: {state: String, percentage: number}[] = statesData.map((item) => {
        //return percentage in 0 if the math operation is not possible
        if(Number.isNaN(item.deaths * 100 / item.population)){
            return {state: item.name, percentage: 0};
        }
        //round the percentage
        return {state: item.name, percentage: Number(((item.deaths * 100) / item.population).toFixed(2))};
    });
    //get the fourth questions (most affected state)
    let stateMoreAffected: {state: String, percentage: number} = percentageDeaths.sort((a, b) => {
        //sort the array by percentage (higher to lower)
        return b.percentage - a.percentage;
    })[0];

    //show the results
    console.log(`Bienvenido, a continuación encontrara información relacionada con el COVID-19 en los Estados Unidos de América
    
    1. ¿Cuál es el estado con mayor acumulado?
    2. ¿Cuál es el estado con menor acumulado?
    3. ¿Cuál es el porcentaje de muertes vs población, por estado?
    4. ¿Cuál es el estado más afectado?   
    `);

    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

    rl.question('Ingrese el número de la pregunta que desea consultar: ', (answer) => {
        switch (answer) {
            case '1': {
                console.log(`El estado con mayor acumulado es ${stateMoreDeaths.name} con ${stateMoreDeaths.deaths} muertes por COVID-19`);
                break;
            }
            case '2': {
                console.log(`El estado con menor acumulado es ${stateLessDeaths.name} con ${stateLessDeaths.deaths} muertes por COVID-19`);
                break;
            }
            case '3': {
                console.log(`El porcentaje de muertes vs población, por estado es:
                `)
                console.table(percentageDeaths);
                break;
            }
            case '4': {
                console.log(`El estado más afectado es ${stateMoreAffected.state} debido a que presenta un porcentaje de muerte del ${stateMoreAffected.percentage}%, lo que significa que tuvo mayor reducción en su población`);
                break;
            }
            default: {
                console.log(`La opción ingresada no es válida`);
                break;
            }
        }
        rl.close();
    });
        
}

general();



