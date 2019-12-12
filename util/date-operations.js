const luxon = require('luxon')

const computeAllInstants = async (start, end, stepSize) => {
    // Start and end should look like this '2019-10-27T06:00:00.000Z' and
    // will be stored like this '2019-10-27T060000.000Z'
    var startEpoch = luxon.DateTime.fromISO(start, { zone: "utc" });
    var endEpoch = luxon.DateTime.fromISO(end, { zone: "utc" });

    // Based on the step size that we allow, we may set some parts of the
    // dates to zero so that things align nicely and we don't end up with
    // spurious values.
    var zeroConfig;
    if (stepSize.years != 0) {
        zeroConfig = { month: 1, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 };
    } else if (stepSize.months != 0) {
        zeroConfig = { day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 };
    } else if (stepSize.days != 0) {
        zeroConfig = { hour: 0, minute: 0, second: 0, millisecond: 0 };
    } else if (stepSize.hours != 0) {
        zeroConfig = { minute: 0, second: 0, millisecond: 0 };
    }

    startEpoch = startEpoch.set(zeroConfig)
    endEpoch = endEpoch.set(zeroConfig)

    let instants = []
    while (startEpoch <= endEpoch) {
        instants.push(startEpoch.toISO().replace(/:/g, ''));
        startEpoch = startEpoch.plus(stepSize)
    }

    return instants;

}

module.exports = {
    computeAllInstants
}
