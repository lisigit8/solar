/**
 * Created by dell on 15/3/17.
 */

var unit = {};
if (typeof exports !== "undefined") {
    exports.unit = unit
}
unit.energy = {
    ENE: function (num) {
        return {
            toMWH: function () {
                return (num / 1000).toFixed(2);
            },
            toGWH: function () {
                return (num / 1000000).toFixed(2);
            },
            toKWH: function () {
                return (num).toFixed(2);
            }
        }
    },
    KWH: function (inputNo) {
        return unit.energy.ENE(inputNo);
    }

};

unit.power = {
    POW: function (num) {
        return {
            toMW: function () {
                return (num / 1000).toFixed(2);
            },
            toGW: function () {
                return (num / 1000000).toFixed(2);
            },
            toKW: function () {
                return (num).toFixed(2);
            }
        }
    },
    KW: function (inputNo) {
        return unit.power.POW(inputNo);
    }

};

unit.revenue = {
    REV: function (num) {
        return {
            toThousand: function () {
                return (num / 1000).toFixed(2);
            },
            toLakh: function () {
                return (num / 100000).toFixed(2);
            },
            toCrore: function () {
                return (num / 10000000).toFixed(2);
            },
            toRupees: function () {
                return (num).toFixed(2);
            }
        }
    },
    Thousand: function (inputNo) {
        return unit.revenue.REV(inputNo);
    },
    Rupees: function (inputNo) {
        return unit.revenue.REV(inputNo);
    }

};

unit.current = {
    CUR: function (num) {
        return {
            toAmpere: function () {
                return (num / 1000).toFixed(2);
            },
            toMilliampere: function () {
                return (num).toFixed(2);
            }
        }
    },
    Milliampere: function (inputNo) {
        return unit.current.CUR(inputNo);
    }
};

unit.irradiance = {
    IRR: function (num) {
        return {
            toKilo: function () {
                return (num / 1000).toFixed(2);
            },
            toMega: function () {
                return (num / 1000000).toFixed(2);
            },
            toWatts: function () {
                return (num + 0.00).toFixed(2);
            }
        }
    }
};

unit.co2saved = {
    co2: function (num) {
        return {
            toKilo: function () {
                return num ? (num).toFixed(2) : 0;
            },
            toTons: function () {
                return num ? (num / 1000).toFixed(2) : 0;
            }
        }
    }
};