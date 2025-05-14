const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const tuya = require('zigbee-herdsman-converters/lib/tuya');
const e = exposes.presets;
const ea = exposes.access;

const definition = {
    fingerprint: [{modelID: 'TS0601', manufacturerName: '_TZE204_no6qtgtl'}],
    model: 'TS0601_no6qtgtl',
    vendor: 'Tuya',
    description: 'Tuya 24GHz human presence sensor (custom external converter)',
    fromZigbee: [tuya.fz.datapoints],
    toZigbee: [tuya.tz.datapoints],
    onEvent: tuya.onEventSetTime,
    configure: tuya.configureMagicPacket,
    exposes: [
        e.enum('presence_state', ea.STATE, ['none', 'motion', 'stationary'])
            .withDescription('Presence state: none, motion, or stationary'),
        e.numeric('target_distance_closest', ea.STATE)
            .withUnit('m')
            .withValueMin(0)
            .withValueMax(10)
            .withDescription('Closest detected target distance'),
        e.numeric('near_detection', ea.STATE_SET)
            .withUnit('m')
            .withValueMin(0.1)
            .withValueMax(6)
            .withValueStep(0.01)
            .withDescription('Minimum detection range'),
        e.numeric('far_detection', ea.STATE_SET)
            .withUnit('m')
            .withValueMin(0.1)
            .withValueMax(6)
            .withValueStep(0.01)
            .withDescription('Maximum detection range'),
        e.numeric('static_sensitivity', ea.STATE_SET)
            .withValueMin(0)
            .withValueMax(10)
            .withDescription('Static presence sensitivity'),
        e.numeric('motion_sensitivity', ea.STATE_SET)
            .withValueMin(0)
            .withValueMax(10)
            .withDescription('Motion sensitivity'),
    ],
    meta: {
        tuyaDatapoints: [
            [1, 'presence_state', tuya.valueConverterBasic.lookup({
                none: 0,
                motion: 1,
                stationary: 2,
            })],
            [3, 'near_detection', tuya.valueConverter.divideBy100],
            [4, 'far_detection', tuya.valueConverter.divideBy100],
            [9, 'target_distance_closest', tuya.valueConverter.divideBy100],
            [101, 'static_sensitivity', tuya.valueConverter.raw],
            [102, 'motion_sensitivity', tuya.valueConverter.raw],
        ],
    },
};

module.exports = definition;
