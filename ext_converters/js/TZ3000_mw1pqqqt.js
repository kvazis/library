const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const modernExtend = require('zigbee-herdsman-converters/lib/modernExtend');
const e = exposes.presets;
const ea = exposes.access;
const tuya = require('zigbee-herdsman-converters/lib/tuya');

const definition = {
    fingerprint: [{modelID: 'TS0003', manufacturerName: '_TZ3000_mw1pqqqt'}],
    model: 'TS0003_USB_switch_3_gang',
    description: 'Tuya 3ch USB Switch',
    vendor: 'Tuya',
    extend: [tuya.modernExtend.tuyaOnOff({switchType: false, indicatorMode: false, endpoints: ['l1', 'l2', 'l3']})],
    endpoint: (device) => {
        return {l1: 1, l2: 2, l3: 3};
    },
    meta: {multiEndpoint: true},
    configure: async (device, coordinatorEndpoint) => {
        await tuya.configureMagicPacket(device, coordinatorEndpoint);
        await reporting.bind(device.getEndpoint(1), coordinatorEndpoint, ['genOnOff']);
        await reporting.bind(device.getEndpoint(2), coordinatorEndpoint, ['genOnOff']);
        await reporting.bind(device.getEndpoint(3), coordinatorEndpoint, ['genOnOff']);
    },  
};

module.exports = definition;