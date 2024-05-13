const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const legacy = require('zigbee-herdsman-converters/lib/legacy');
const ota = require('zigbee-herdsman-converters/lib/ota');
const tuya = require('zigbee-herdsman-converters/lib/tuya');
const lumi = require('zigbee-herdsman-converters/lib/lumi');
const utils = require('zigbee-herdsman-converters/lib/utils');
const globalStore = require('zigbee-herdsman-converters/lib/store');
const e = exposes.presets;
const ea = exposes.access;

const definition = {
    zigbeeModel: ['lumi.remote.acn008'],
    model: 'WXKG21LM',
    vendor: 'Aqara',
    description: 'Wireless remote switch H1M (single rocker)',
    fromZigbee: [fz.battery, lumi.fromZigbee.lumi_action_multistate, lumi.fromZigbee.lumi_specific, fz.command_toggle],
    toZigbee: [lumi.toZigbee.lumi_switch_click_mode, lumi.toZigbee.lumi_operation_mode_opple],
    meta: {battery: {voltageToPercentage: '3V_2850_3000'}, multiEndpoint: true},
    exposes: [
        e.battery(), e.battery_voltage(), e.action(['single', 'double', 'triple', 'hold']),
        e.enum('click_mode', ea.ALL, ['fast', 'multi'])
            .withDescription('Click mode, fast: only supports single click which will be send immediately after clicking.' +
                'multi: supports more events like double and hold'),
        e.enum('operation_mode', ea.ALL, ['command', 'event'])
            .withDescription('Operation mode, select "command" to enable bindings (wake up the device before changing modes!)'),
    ],
    configure: async (device, coordinatorEndpoint, logger) => {
        const endpoint1 = device.getEndpoint(1);
        // set "event" mode
        await endpoint1.write('manuSpecificLumi', {'mode': 1}, {manufacturerCode: manufacturerCode});
        // turn on the "multiple clicks" mode, otherwise the only "single click" events.
        // if value is 1 - there will be single clicks, 2 - multiple.
        await endpoint1.write('manuSpecificLumi', {0x0125: {value: 0x02, type: 0x20}}, {manufacturerCode: manufacturerCode});
        await reporting.bind(endpoint1, coordinatorEndpoint, ['genOnOff', 'genPowerCfg']);
        // TODO/BUG:
        // Did not understand how to separate the left and right keys in command mode -
        // the "toggleCommand" always arrives from the first endpoint
    },
};

module.exports = definition;