/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/
// Create the Park class
class Park{
    // Create a constructor class with the name, build year, number of trees and park area
    constructor(name, buildYear, numberOfTrees, parkArea){
        this.name = name;
        this.buildYear = buildYear;
        this.numberOfTrees = numberOfTrees;
        this.parkArea = parkArea;
    }

    // Create a park method to calculate and return the tree density of the park based on number of trees / park area
    calcTreeDensity(){
        return (this.numberOfTrees / this.parkArea);
    }

    // Create a park method to calculate and return the age of the park based on the current date
    getParkAge(){
        let year = new Date();
        year = year.getFullYear();
        return year - this.buildYear;
    }

    // Create a park method to return either true or false if a park has more than 1000 trees
    ParkWithMoreThan1000Trees(){
        return this.numberOfTrees > 1000 ? true : false;
    }
}

//Create the Street Class
class Street{
    // Create the constructor class with the name, build year, street length and a default size set to 'normal'
    constructor(name, buildYear, streetLength, size='normal'){
        this.name = name;
        this.buildYear = buildYear;
        this.streetLength = streetLength;
        this.size = size
    }
}

// Create an IIFE for data privacy
(() => {
    // Instantiate the parks and store them in the park array
    const greenPark = new Park('Green Park', 1934, 2875, 723);
    const nationalPark = new Park('National Park', 1987, 607, 354);
    const oakPark = new Park('Oak Park', 2010, 10092, 567);

    let parkArray = [greenPark, nationalPark, oakPark];

    // Instantiate the streets and store them in the street array
    const oceanAvenue = new Street('Ocean Avenue', 1999, 2.2, 'big');
    const evergreenStreet = new Street('Evergreen Street', 2008, 3.1, 'small');
    const fourthStreet = new Street('4th Street', 2015, 1.8);
    const sunsetBoulevard = new Street('Sunset Boulevard', 1982, 1.3, 'huge');

    let streetArray = [oceanAvenue, evergreenStreet, fourthStreet, sunsetBoulevard];

    // Create a function to generate the Parks report
    function getParkReports(parkArray){
        console.log('----PARKS REPORT----');
        // Create a sum of age variable to track the sum age within the for loop and a string array to store string of park with more than 1000 trees while checking from the for loop
        let sumOfAge = 0;
        let stringArray = [];

        for (let cur of parkArray){
            console.log(`${cur.name} has a tree density of ${cur.calcTreeDensity()} trees per square km`);
            sumOfAge += cur.getParkAge();
            if (cur.ParkWithMoreThan1000Trees()){
                stringArray.push(`${cur.name} has more than 1000 trees`);
            }
        }
        if (stringArray){
            for (let cur of stringArray){
                console.log(cur);
            }
        }
        console.log(`Our ${parkArray.length} parks have an average age of ${sumOfAge / parkArray.length} years`);
    }

    // Create a function to generate the streets report
    function getStreetReport(streetArray){
        console.log('----STREETS REPORT----');
        let totalLength = 0;
        for (let cur of streetArray){
            console.log(`${cur.name}, built in ${cur.buildYear}, is a ${cur.size} street`);
            totalLength += cur.streetLength
        }
        console.log(`Our ${streetArray.length} have a total length of  ${totalLength} km, with an average length of ${totalLength / streetArray.length} km.`);
    }
    // console.log(parkArray);
    // console.log(streetArray);

    return{
        getParkReport : getParkReports(parkArray),
        getStreetReport : getStreetReport(streetArray)
    }
})();


/*

-------------------------------------------------------------------------
THE SOLUTION FROM THE TUTORIAL I AM FOLLOWING
-------------------------------------------------------------------------

class Element {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}


class Park extends Element {
    constructor(name, buildYear, area, numTrees) {
        super(name, buildYear);
        this.area = area; //km2
        this.numTrees = numTrees;
    }
    
    treeDensity() {
        const density = this.numTrees / this.area;
        console.log(`${this.name} has a tree density of ${density} trees per square km.`);
    }
}


class Street extends Element {
    constructor(name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
    
    classifyStreet () {
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        console.log(`${this.name}, build in ${this.buildYear}, is a ${classification.get(this.size)} street.`);
    }
}


const allParks = [new Park('Green Park', 1987, 0.2, 215),
                 new Park('National Park', 1894, 2.9, 3541),
                 new Park('Oak Park', 1953, 0.4, 949)];

const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
                   new Street('Evergreen Street', 2008, 2.7, 2),
                   new Street('4th Street', 2015, 0.8),
                   new Street('Sunset Boulevard', 1982, 2.5, 5)];


function calc(arr) {
    
    const sum = arr.reduce((prev, cur, index) => prev + cur, 0);
    
    return [sum, sum / arr.length];
    
}


function reportParks(p) {
    
    console.log('-----PARKS REPORT-----');
    
    // Density
    p.forEach(el => el.treeDensity());
    
    // Average age
    const ages = p.map(el => new Date().getFullYear() - el.buildYear);
    const [totalAge, avgAge] = calc(ages);
    console.log(`Our ${p.length} parks have an average of ${avgAge} years.`);
    
    // Which park has more than 1000 trees
    const i = p.map(el => el.numTrees).findIndex(el => el >= 1000);
    console.log(`${p[i].name} has more than 1000 trees.`);
    
}


function reportStreets(s) {
    
    console.log('-----STREETS REPORT-----');
    
    //Total and average length of the town's streets
    const [totalLength, avgLength] = calc(s.map(el => el.length));
    console.log(`Our ${s.length} streets have a total length of ${totalLength} km, with an average of ${avgLength} km.`);
    
    // CLassify sizes
    s.forEach(el => el.classifyStreet());
}

reportParks(allParks);
reportStreets(allStreets);

*/


