const roundHour = (timestamp) => {

}

const computeAllHours = async (start, end) => {
    
    //start and end should look like this '2019-10-27T06:00:00.000Z' and will be stored like this '2019-10-27T060000.000Z'

    var startEpoch = Date.parse(start);
    var endEpoch = Date.parse(end);
    
    let diff = Math.abs(endEpoch - startEpoch) / 36e5;

    let hours = []
    for (let i = 0; i <= diff; i++){
        hours.push(new Date(startEpoch + (36e5*i)).toISOString().replace(/:/g, ''));
    }
    hours.push(new Date(endEpoch).toISOString());

    return hours;

}


module.exports = {
    computeAllHours
}