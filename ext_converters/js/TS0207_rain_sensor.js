const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const modernExtend = require('zigbee-herdsman-converters/lib/modernExtend');
const e = exposes.presets;
const ea = exposes.access;
const tuya = require('zigbee-herdsman-converters/lib/tuya');

const definition = {
    fingerprint: [
        {
            modelID: 'TS0207',
            manufacturerName: '_TZ3210_tgvtvdoc',
        },
    ],
    model: 'TS0207_rain_sensor',
    vendor: 'Tuya',
    description: 'TUYA TS0207 Rain Sensor RB-SRAN01',
    fromZigbee: [tuya.fz.datapoints, fz.battery],
    toZigbee: [],
    onEvent: tuya.onEventSetTime, // Add this if you are getting no converter for 'commandMcuSyncTime'
    configure: tuya.configureMagicPacket,
    exposes: [
        // Here you should put all functionality that your device exposes
        e.water_leak(), e.battery_low(), e.battery(),
        exposes.numeric('illuminance', ea.STATE).withDescription('Raw measured illuminance').withUnit('mV'),
        exposes.numeric('rainIntensity', ea.STATE).withDescription('Raw measured rain intensity').withUnit('mV')
    ],
    meta: {
        // All datapoints go in here
        tuyaDatapoints: [
            [101, 'illuminance', tuya.valueConverter.raw],
            [105, 'rainIntensity', tuya.valueConverter.raw]
        ],
    },
};

module.exports = definition;