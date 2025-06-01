const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tuya = require('zigbee-herdsman-converters/lib/tuya');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const e = exposes.presets;
const ea = exposes.access;

const definition = {
    fingerprint: [{modelID: 'TS0601', manufacturerName: '_TZE200_uli8wasj'}],
    model: 'TS0601_uli8wasj',
    vendor: 'Tuya',
    description: 'Tuya motion sensor with illuminance, temperature, humidity',
    fromZigbee: [tuya.fz.datapoints, fz.ias_occupancy_alarm_1],
    toZigbee: [tuya.tz.datapoints],
    configure: tuya.configureMagicPacket,
    exposes: [
        e.occupancy(),
        e.battery(),
        e.temperature(),
        e.humidity(),
        e.illuminance(),
        exposes.numeric('sensitivity', ea.STATE_SET).withValueMin(0).withValueMax(19).withDescription('Motion detection sensitivity'),
        exposes.numeric('presence_time', ea.STATE_SET).withValueMin(5).withValueMax(28800).withUnit('s').withDescription('Presence clear timeout'),
        exposes.numeric('illuminance_interval', ea.STATE_SET).withValueMin(1).withValueMax(480).withUnit('min').withDescription('Illuminance reporting interval'),
        exposes.binary('led_enable', ea.STATE_SET, 'ON', 'OFF').withDescription('Enable or disable LED indication'),
        exposes.numeric('temperature_correction', ea.STATE_SET).withValueMin(-3).withValueMax(3).withUnit('°C').withDescription('Temperature correction x10'),
        exposes.numeric('humidity_correction', ea.STATE_SET).withValueMin(-10).withValueMax(10).withUnit('%').withDescription('Humidity correction'),
    ],
    meta: {
        tuyaDatapoints: [
            [1, 'occupancy', tuya.valueConverter.trueFalse1],
            [101, 'humidity', tuya.valueConverter.raw],
            [106, 'illuminance', tuya.valueConverter.raw],
            [110, 'battery', tuya.valueConverter.raw],
            [111, 'temperature', tuya.valueConverter.divideBy10],
            [2, 'sensitivity', tuya.valueConverter.raw],
            [102, 'presence_time', tuya.valueConverter.raw],
            [107, 'illuminance_interval', tuya.valueConverter.raw],
            [108, 'led_enable', tuya.valueConverter.onOff],
            [104, 'humidity_correction', tuya.valueConverter.raw],
            [105, 'temperature_correction', tuya.valueConverter.raw],
        ],
    },
};

module.exports = definition;
