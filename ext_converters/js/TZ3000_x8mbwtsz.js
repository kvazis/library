const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const modernExtend = require('zigbee-herdsman-converters/lib/modernExtend');
const e = exposes.presets;
const ea = exposes.access;
const tuya = require('zigbee-herdsman-converters/lib/tuya');
const {onOff, electricityMeter} = require('zigbee-herdsman-converters/lib/modernExtend');

const definition = {
    fingerprint: [{modelID: 'TS0001', manufacturerName: '_TZ3000_x8mbwtsz'}],
    model: 'TS0001_power',
    description: 'Moes ZM-104-M-16AM',
    vendor: 'Tuya',
    extend: [onOff({"powerOnBehavior":false}), electricityMeter()],
    meta: {},  

    options: [exposes.options.measurement_poll_interval()],
    onEvent: (type, data, device, options) => tuya.onEventMeasurementPoll(type, data, device, options, true, false),


    exposes: [
        tuya.exposes.switchType(),
        e.enum('power_outage_memory', ea.ALL, ['on', 'off', 'restore']).withDescription('Recover state after power outage'),
    ],

};

module.exports = definition;